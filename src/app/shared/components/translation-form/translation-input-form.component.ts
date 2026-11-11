import {
  Component,
  computed, ElementRef,
  inject,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl, FormGroup,
  NgControl,
  ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';

import { TranslationInput } from '../../models/translation-input.model';

import { LanguageService } from '@shared/servicies/language/language.service';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IconsComponent } from '@shared/components/icons/icons.component';
import { ModalComponent } from '@shared/components/modal/modal.component';

import { FIELD, FIELD_KEYS } from '@shared/types/translation-field.type';

import {
  TranslationFieldInputForm,
  TranslationInputForm,
} from '@shared/components/translation-form/model/translation-input-form.model';

import {
  requiredNameFieldValidator,
  uniqueTranslationFieldsValidator,
} from '@shared/validators/translation-fields.validators';

import { FORM_MODE, FormMode } from '@shared/types/form.typ';
import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import { LabelFormComponent } from '@shared/components/label-form/label-form.component';

@Component({
  selector: 'shared-translation-form',
  imports: [
    TranslatePipe,
    SpinnerComponent,
    ButtonComponent,
    IconsComponent,
    ModalComponent,
    ReactiveFormsModule,
    NgTemplateOutlet,
    LabelFormComponent,
    //JsonPipe,
  ],
  templateUrl: './translation-input-form.component.html',
  styleUrl: './translation-input-form.component.css',
})
export class TranslationInputFormComponent implements ControlValueAccessor {
  // Dependencies
  private readonly fb = inject(FormBuilder);

  protected readonly languageService = inject(LanguageService);

  private readonly elementRef = inject(ElementRef);

  protected readonly controlDir = inject(NgControl, {
    self: true,
    optional: true,
  });

  // State
  protected readonly formMode = signal<FormMode>(FORM_MODE.CREATE);

  protected readonly editingLocaleId = signal<number | null>(null);

  protected readonly translations: WritableSignal<TranslationInput[]> = signal<TranslationInput[]>(
    [],
  );

  protected readonly disabled = signal(false);

  protected readonly modalTitle = computed(() =>
    this.formMode() === FORM_MODE.CREATE
      ? 'form.title.translation.new'
      : 'form.title.translation.update',
  );

  protected readonly fieldOptions: [FIELD, string][] = Object.entries(FIELD_KEYS) as [FIELD, string][];

  // Validators
  private readonly uniqueLocaleValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const localeId = control.value as number | null;

    if (localeId === null) {
      return null;
    }

    const isDuplicate = this.translations().some(
      (translation) =>
        translation.localeId === localeId && translation.localeId !== this.editingLocaleId(),
    );

    return isDuplicate ? { duplicate: true } : null;
  };

  // Form
  protected readonly translationForm: TranslationInputForm = this.fb.group(
    {
      localeId: [null as number | null, [Validators.required, this.uniqueLocaleValidator]],
      fields: this.fb.array([this.createFieldGroup('NAME')]),
    },
    {
      validators: [requiredNameFieldValidator(), uniqueTranslationFieldsValidator()],
    },
  ) as TranslationInputForm;

  @ViewChild('translationModal')
  private translationModal!: ModalComponent;

  private _onChange: (value: TranslationInput[]) => void = () => {};

  private _onTouched: () => void = () => {};

  constructor() {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  // CVA
  registerOnChange(fn: (value: TranslationInput[]) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  writeValue(value: TranslationInput[] | null): void {
    this.translations.set(value ?? []);
    this.localeIdControl.updateValueAndValidity();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);

    if (isDisabled) {
      this.translationForm.disable();
    } else {
      this.translationForm.enable();
    }
  }

  // Form getters
  protected get fields(): FormArray<TranslationFieldInputForm> {
    return this.translationForm.controls.fields;
  }

  protected get localeIdControl(): FormControl<number | null> {
    return this.translationForm.controls.localeId;
  }

  protected getFieldValueControl(index: number): FormControl<string> {
    return this.fields.at(index).controls.value;
  }

  // Create
  protected addTranslation(): void {
    if (this.disabled()) {
      return;
    }

    this.formMode.set(FORM_MODE.CREATE);
    this.editingLocaleId.set(null);

    this.resetTranslationForm();

    this.translationModal.open();
  }

  // Save
  protected saveTranslation(): void {
    if (this.disabled()) {
      return;
    }

    if (this.translationForm.invalid) {
      this.translationForm.markAllAsTouched();
      return;
    }

    const translation = this.translationForm.getRawValue();

    const newTranslation: TranslationInput = {
      localeId: translation.localeId!,
      fields: translation.fields.map((field) => ({
        field: field.field!,
        value: field.value,
      })),
    };

    this.translations.update((current) => {
      if (this.formMode() === FORM_MODE.CREATE) {
        return [...current, newTranslation];
      }

      return current.map((item) =>
        item.localeId === this.editingLocaleId() ? newTranslation : item,
      );
    });

    this.notifyChanges();

    this.translationModal.close();
    this.resetTranslationForm();
  }

  // Remove
  protected removeTranslation(localeId: number): void {
    if (this.disabled()) {
      return;
    }

    this.translations.update((current) =>
      current.filter((translation) => translation.localeId !== localeId),
    );

    this.notifyChanges();
  }

  // Edit
  protected editTranslation(translation: TranslationInput): void {
    if (this.disabled()) {
      return;
    }

    this.formMode.set(FORM_MODE.EDIT);
    this.editingLocaleId.set(translation.localeId);

    this.resetTranslationForm();

    this.localeIdControl.setValue(translation.localeId);
    this.localeIdControl.updateValueAndValidity();

    this.fields.clear();

    translation.fields.forEach((field) => {
      const fieldGroup = this.createFieldGroup(field.field);

      fieldGroup.patchValue({
        value: field.value,
      });

      this.fields.push(fieldGroup);
    });

    this.translationForm.updateValueAndValidity();

    this.translationModal.open();
  }

  // Field management
  protected addField(): void {
    if (this.disabled()) {
      return;
    }

    const existingFields = this.fields.controls.map((control) => control.controls.field.value);

    const availableField = this.fieldOptions.find(([field]) => !existingFields.includes(field));

    if (!availableField) {
      return;
    }

    this.fields.push(this.createFieldGroup(availableField[0]));

    this.fields.updateValueAndValidity();
  }

  protected removeField(index: number): void {
    if (this.disabled() || index < 0 || index >= this.fields.length) {
      return;
    }

    // The NAME field is mandatory and cannot be removed.
    if (this.fields.at(index).controls.field.value === 'NAME') {
      return;
    }

    this.fields.removeAt(index);
    this.fields.updateValueAndValidity();
  }

  // Form helpers
  private createFieldGroup(field: FIELD): TranslationFieldInputForm {
    const group = this.fb.group({
      field: [field, Validators.required],
      value: ['', Validators.required],
    }) as TranslationFieldInputForm;

    console.debug('Control creado:', group.controls.value);

    return group;
  }

  private resetTranslationForm(): void {
    this.translationForm.setControl('fields', this.fb.array([this.createFieldGroup('NAME')]));

    this.localeIdControl.reset(null);

    this.translationForm.markAsPristine();
    this.translationForm.markAsUntouched();
    this.translationForm.updateValueAndValidity();
  }

  private notifyChanges(): void {
    const currentTranslations = this.translations();

    this._onChange(currentTranslations);
    this._onTouched();

    // Revalidate the locale against the updated translations.
    this.localeIdControl.updateValueAndValidity();
  }

  protected getLanguageName(localeId: number): string {
    return (
      this.languageService.languages().find((language) => language.id === localeId)?.code ?? ''
    );
  }

  protected readonly FIELDS = FIELD_KEYS;

  /** MODE DEBUG: errors form control + value textarea  **/
  // protected getFormErrors(): Record<string, unknown> {
  //   const errors: Record<string, unknown> = {};
  //
  //   const collectErrors = (control: AbstractControl, path: string): void => {
  //     if (control.errors) {
  //       errors[path] = control.errors;
  //     }
  //
  //     if (control instanceof FormGroup) {
  //       Object.entries(control.controls).forEach(([key, child]) => {
  //         collectErrors(child, `${path}.${key}`);
  //       });
  //     }
  //
  //     if (control instanceof FormArray) {
  //       control.controls.forEach((child, index) => {
  //         collectErrors(child, `${path}[${index}]`);
  //       });
  //     }
  //   };
  //
  //   collectErrors(this.translationForm, 'translationForm');
  //
  //   return errors;
  // }
  //
  // protected getFormDebug(): unknown {
  //   return {
  //     status: this.translationForm.status,
  //     valid: this.translationForm.valid,
  //     disabled: this.translationForm.disabled,
  //     errors: this.getFormErrors(),
  //     value: this.translationForm.getRawValue(),
  //     fields: this.fields.controls.map((field, index) => ({
  //       index,
  //       value: field.getRawValue(),
  //       valid: field.valid,
  //       errors: field.errors,
  //       valueErrors: field.controls.value.errors,
  //     })),
  //   };
  // }
  //
  // protected debugTextarea(event: Event, index: number): void {
  //   const textarea = event.target as HTMLTextAreaElement;
  //   const control = this.getFieldValueControl(index);
  //
  //   console.debug('DOM:', textarea.value);
  //   console.debug('Control:', control.value);
  //   console.debug('Control disabled:', control.disabled);
  //   console.debug('Control errors:', control.errors);
  //   console.debug('Control status:', control.status);
  // }
  /** fin mode debug **/
  protected readonly Validators = Validators;
}
