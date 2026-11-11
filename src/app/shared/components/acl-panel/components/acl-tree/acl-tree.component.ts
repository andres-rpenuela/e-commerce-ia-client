import { Component, input, output } from '@angular/core';
import { AclTreeNodeComponent } from '@shared/components/acl-panel/components/acl-tree/acl-tree-node/acl-tree-node.component';
import { AclTreeNode } from '@shared/models/acl-tree-node.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'shared-acl-tree',
  imports: [AclTreeNodeComponent, JsonPipe],
  templateUrl: './acl-tree.component.html',
  styleUrl: './acl-tree.component.css',
})
export class AclTreeComponent {
  readonly nodes = input.required<AclTreeNode[]>();
  readonly selectable = input(false);
  readonly selectedIds = input<number[]>([]);
  readonly selectedNodeId = input<number | null>(null);

  readonly selectionChange = output<number>();
  readonly nodeSelected = output<AclTreeNode>();
}
