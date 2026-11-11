import { Component, input, signal } from '@angular/core';
import { AclTreeNode } from '@shared/models/acl-tree-node.model';


@Component({
  selector: 'shared-acl-panel',
  imports: [],
  templateUrl: './acl-panel.component.html',
  styleUrl: './acl-panel.component.css',
})
export class AclPanelComponent {

  // readonly nodes = input.required<AclTreeNode[]>();

  readonly selectedNode = signal<AclTreeNode | null>(null);

  selectNode(node: AclTreeNode): void {
    this.selectedNode.set(node);
  }
}
