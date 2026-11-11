import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, EMPTY, finalize, map } from 'rxjs';

import { PermissionService } from '../../services/permission.service';
import { PermissionTree } from '../../models/permission-tree.model';

import { AclPanelComponent } from '@shared/components/acl-panel/acl-panel.component';
import { AclDetailComponent } from '@shared/components/acl-panel/components/acl-detail/acl-detail.component';
import { AclTreeComponent } from '@shared/components/acl-panel/components/acl-tree/acl-tree.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { AclTreeNode } from '@shared/models/acl-tree-node.model';
import { AclNodeType } from '@shared/types/acl-node.type';
import { ToastService } from '@shared/servicies/toast/toast-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-list-permission',
  imports: [AclPanelComponent, SpinnerComponent, AclTreeComponent, AclDetailComponent, JsonPipe],
  templateUrl: './list-permission.component.html',
  styleUrl: './list-permission.component.css',
})
export class ListPermissionComponent implements OnInit {
  private readonly permissionService = inject(PermissionService);
  private readonly toastService = inject(ToastService);

  readonly selectedNode = signal<AclTreeNode | null>(null);
  readonly aclNodes = signal<AclTreeNode[]>([]);
  readonly selectedIds = signal<number[]>([]);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.getPermissions();
  }

  protected getPermissions(): void {
    this.loading.set(true);

    this.permissionService
      .findPermissionTree()
      .pipe(
        map((permissions) => permissions.map((permission) => this.toAclTreeNode(permission))),
        catchError((error) => {
          console.error('Error al obtener los permisos:', error);
          this.toastService.error('error.get-permission-tree.title');
          return EMPTY;
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((nodes) => {
        this.aclNodes.set(nodes);
        this.selectedNode.set(nodes[0] ?? null);
      });
  }

  onNodeSelected(node: AclTreeNode): void {
    this.selectedNode.set(node);
  }

  onSelectionChange(id: number): void {
    this.selectedIds.update((ids) =>
      ids.includes(id) ? ids.filter((selectedId) => selectedId !== id) : [...ids, id],
    );
  }

  private toAclTreeNode(permission: PermissionTree): AclTreeNode {
    return {
      id: permission.id,
      code: permission.code,
      name: permission.name,
      description: permission.description,
      nodeType: AclNodeType.PERMISSION,
      children: (permission.children ?? []).map((child) => this.toAclTreeNode(child)),
    };
  }
}
