import { PermissionTree } from '../../permissions/models/permission-tree.model';

export interface PermissionTreeCache {
  data: PermissionTree[];
  timestamp: number;
}
