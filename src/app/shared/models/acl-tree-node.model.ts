import { AclNodeType } from '@shared/types/acl-node.type';

export interface AclTreeNode {
  id: number;
  code: string;
  name: string;
  description?: string;
  nodeType: AclNodeType;
  children: AclTreeNode[];
}
