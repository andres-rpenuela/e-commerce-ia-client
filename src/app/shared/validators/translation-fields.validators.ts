import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FIELD } from '@shared/types/translation-field.type';

export function requiredNameFieldValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fields = control.get('fields');

    if (!fields) {
      return null;
    }

    const hasNameField = fields.value?.some(
      (field: { field: FIELD | null }) => field.field === 'NAME',
    );

    return hasNameField
      ? null
      : { requiredNameField: true };
  };
}



/**
 * Validates that a translation does not contain duplicate fields.
 */
export function uniqueTranslationFieldsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fields = control.get('fields');

    if (!fields || !Array.isArray(fields.value)) {
      return null;
    }

    const fieldValues = fields.value
      .map((item: { field: FIELD | null }) => item.field)
      .filter((field): field is FIELD => field !== null);

    const hasDuplicates = new Set(fieldValues).size !== fieldValues.length;

    return hasDuplicates
      ? { duplicateTranslationFields: true }
      : null;
  };
}
