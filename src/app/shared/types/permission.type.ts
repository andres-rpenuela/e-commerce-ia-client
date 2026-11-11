export type PermissionAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';


export const PERMISSION_ACTION_MAP = new Map<string,PermissionAction>([
  ['CREATE', 'CREATE'],
  ['READ', 'READ'],
  ['UPDATE', 'UPDATE'],
  ['DELETE', 'DELETE'],
]);
