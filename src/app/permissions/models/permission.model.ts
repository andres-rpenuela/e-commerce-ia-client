import { PermissionAction } from '@shared/types/permission.type';

export interface Permission{
  id: number;
  code: string;
  permissionAction: PermissionAction;
  parentId: number | null;
}

