import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TranslatePipe } from '@ngx-translate/core';
import { TranslationInput } from '@shared/models/translation-input.model';
import { LabelFormComponent } from '@shared/components/label-form/label-form.component';
import { PERMISSION_ACTIONS } from '@shared/contants/permission.data';
import { TranslationInputFormComponent } from '@shared/components/translation-form/translation-input-form.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { IconsComponent } from '@shared/components/icons/icons.component';
import { PermissionService } from '../../services/permission.service';
import { PERMISSION_ACTION_MAP, PermissionAction } from '@shared/types/permission.type';
import { distinctUntilChanged, finalize, of, startWith, switchMap } from 'rxjs';
import { PermissionBasic } from '../../models/permission-basic.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { ToastService } from '@shared/servicies/toast/toast-service';
import { Router } from '@angular/router';
import { LoadingService } from '@shared/servicies/loading/loading.service';
import { Permission } from '../../models/permission.model';
import { CreatePermissionCommand } from '../../models/create-permission-command.model';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.css'],
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    LabelFormComponent,
    TranslationInputFormComponent,
    ButtonComponent,
    IconsComponent,
    SpinnerComponent,
    //JsonPipe,
    //NgTemplateOutlet,
  ],
})
export class CreatePermissionComponent implements OnInit {
  protected readonly actions: [PermissionAction, string][] = Array.from(
    PERMISSION_ACTIONS.entries(),
  );

  private readonly _router = inject(Router);
  private readonly _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _toastService = inject(ToastService);
  private readonly _permissionService: PermissionService = inject(PermissionService);
  private readonly _loadingService = inject(LoadingService);

  readonly permissionForm = this._formBuilder.group({
    code: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    parentId: [],
    action: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    translations: [[] as TranslationInput[], [Validators.required, Validators.minLength(2)]],
  });

  // Depends on value at action control
  readonly permissionParent: Signal<PermissionBasic[]> = toSignal(
    this.permissionForm.controls.action.valueChanges.pipe(
      startWith(this.permissionForm.controls.action.value),
      distinctUntilChanged(),
      switchMap((action) =>
        action
          ? this._permissionService
              .findPermissionCandidates(action as PermissionAction)
              .pipe(startWith([] as PermissionBasic[])) // ¡clave! startWith([]) dentro de switchMap() para vaciar inmediatamente los candidatos cada vez que cambia la acción.
          : of([]),
      ),
    ),
    { initialValue: [] },
  );

  constructor() {
    effect(() => {
      const hasCandidates = this.permissionParent().length > 0;
      const parentControl = this.permissionForm.controls.parentId;

      if (hasCandidates && parentControl.disabled) {
        parentControl.enable();
      } else if (!hasCandidates && parentControl.enabled) {
        parentControl.disable();
      }
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.permissionForm.invalid) {
      this.permissionForm.markAllAsTouched();
      return;
    }

    const formValue = this.permissionForm.getRawValue();

    const request: CreatePermissionCommand = {
      code: formValue.code!,
      permissionAction: PERMISSION_ACTION_MAP.get(formValue.action!)!,
      parentId: formValue.parentId,

      translations: formValue.translations!.flatMap((translation: any) =>
        translation.fields.map((field: any) => ({
          localeId: translation.localeId,
          field: field.field,
          value: field.value,
        })),
      ),
    };

    this._loadingService.show();
    this._permissionService
      .create(request)
      .pipe(
        finalize(() => {
          this._loadingService.hide();
        }),
      )
      .subscribe({
        next: (response: Permission) => {
          setTimeout(() => {
            this._toastService.success('toast.permission.success');

            this._router.navigate(['/permissions']);
          }, 5000);
        },
        error: (error) => {
          console.error('Error creating permission', error);

          const body = error.error;

          const message = body?.details?.length
            ? body.details.map((detail: any) => `${detail.field}: ${detail.message}`).join('\n')
            : (body?.message ?? 'Ha ocurrido un error inesperado');

          //window.alert(message);
          this._toastService.error(message);
        },
      });
  }

  /** Methods helpers form */
  isValidForm(): boolean {
    return this.permissionForm.valid;
  }

  fieldForm(nameField: string): AbstractControl<any, any, any> | null {
    return this.permissionForm.get(nameField);
  }

  ifTouchField(nameField: string): boolean | undefined {
    return this.fieldForm(nameField!)?.touched;
  }

  hasError(nameField: string, errorCode: string): boolean | undefined {
    return this.fieldForm(nameField!)?.hasError(errorCode);
  }
}
