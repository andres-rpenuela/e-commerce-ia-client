export interface PermissionTree {
  id: number;
  code: string;
  name: string;
  description: string;
  children?: PermissionTree[];
}
