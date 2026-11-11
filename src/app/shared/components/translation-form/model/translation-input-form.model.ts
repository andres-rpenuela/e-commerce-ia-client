import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FIELD } from '@shared/types/translation-field.type';

/** Formulario de un campo de traducción. */
export type TranslationFieldInputForm = FormGroup<{
  field: FormControl<FIELD | null>;
  value: FormControl<string>;
}>;

/** Formulario de las traducciones de un idioma. */
export type   TranslationInputForm = FormGroup<{
  localeId: FormControl<number | null>;
  fields: FormArray<TranslationFieldInputForm>;
}>;

/** Formulario raíz de todas las traducciones. */
export type TranslationInputFieldForm = FormGroup<{
  translations: FormArray<TranslationInputForm>;
}>;
