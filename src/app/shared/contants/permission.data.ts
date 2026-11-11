import { PermissionAction } from '../types/permission.type';

export const PERMISSION_ACTIONS = new Map<PermissionAction, string>([
  ['CREATE', 'permission.action.create'],
  ['READ', 'permission.action.read'],
  ['UPDATE', 'permission.action.update'],
  ['DELETE', 'permission.action.delete']
]);
