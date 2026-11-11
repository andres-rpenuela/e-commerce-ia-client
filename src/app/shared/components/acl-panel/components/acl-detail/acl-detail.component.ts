import { Component, input } from '@angular/core';
import { AclTreeNode } from '@shared/models/acl-tree-node.model';

@Component({
  selector: 'shared-acl-detail',
  imports: [],
  templateUrl: './acl-detail.component.html',
  styleUrl: './acl-detail.component.css',
})
export class AclDetailComponent {
  readonly node = input<AclTreeNode | null>(null);
}
