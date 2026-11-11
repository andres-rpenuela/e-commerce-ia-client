import { Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AclTreeNode } from '@shared/models/acl-tree-node.model';

@Component({
  selector: 'shared-acl-tree-node',
  imports: [NgTemplateOutlet],
  templateUrl: './acl-tree-node.component.html',
  styleUrl: './acl-tree-node.component.css',
})
export class AclTreeNodeComponent {
  readonly node = input.required<AclTreeNode>();
  readonly selectable = input(false);
  readonly selectedIds = input<number[]>([]);
  readonly selectedNodeId = input<number | null>(null);

  readonly selectionChange = output<number>();
  readonly nodeSelected = output<AclTreeNode>();

  readonly checked = computed(() =>
    this.selectedIds().includes(this.node().id)
  );

  readonly indeterminate = computed(() => {
    const descendants = this.getDescendantIds(this.node()).slice(1);
    const selected = this.selectedIds();

    if (descendants.length === 0) return false;

    const selectedCount = descendants.filter(id =>
      selected.includes(id)
    ).length;

    return selectedCount > 0 && selectedCount < descendants.length;
  });

  // !!IMPORT TODO   CADA checkbox emite el ID del nodo que realmente representa.
  onSelectionChange(): void {
    this.selectionChange.emit(this.node().id);
  }

  onNodeSelected(): void {
    this.nodeSelected.emit(this.node());
  }

  private getDescendantIds(node: AclTreeNode): number[] {
    return [
      node.id,
      ...node.children.flatMap(child => this.getDescendantIds(child)),
    ];
  }
}
