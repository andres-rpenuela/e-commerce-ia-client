export type FIELD = 'NAME' | 'DESCRIPTION' |  'CUSTOM_1' | 'CUSTOM_2' | 'CUSTOM_3' | 'CUSTOM_4' | 'CUSTOM_5';

export const FIELD_KEYS: Record<FIELD, string> = {
  NAME: 'label.field.name',
  DESCRIPTION: 'label.field.description',
  CUSTOM_1: 'label.field.custom_1',
  CUSTOM_2: 'label.field.custom_2',
  CUSTOM_3: 'label.field.custom_3',
  CUSTOM_4: 'label.field.custom_4',
  CUSTOM_5: 'label.field.custom_5'
};

export const FIELDS: Record<FIELD, FIELD> = {
  NAME: 'NAME',
  DESCRIPTION: 'DESCRIPTION',
  CUSTOM_1: 'CUSTOM_1',
  CUSTOM_2: 'CUSTOM_2',
  CUSTOM_3: 'CUSTOM_3',
  CUSTOM_4: 'CUSTOM_4',
  CUSTOM_5: 'CUSTOM_5'
};
