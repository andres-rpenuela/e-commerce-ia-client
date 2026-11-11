import { FIELD } from '@shared/types/translation-field.type';


export interface TranslationFieldInput  {
  field: FIELD;
  value: string;
}

export interface TranslationInput  {
  localeId: number;
  fields: TranslationFieldInput[]
}
