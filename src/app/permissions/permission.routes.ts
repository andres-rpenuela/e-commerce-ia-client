import { Routes } from '@angular/router';
import { PermissionsPageComponent } from './pages/permission.page';
import { CreatePermissionComponent } from './features/create-permission/create-permission.component';

export const PERMISSION_ROUTES: Routes = [
  {
    path: 'permissions',
    component: PermissionsPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreatePermissionComponent
      },
      {
        path: 'list',
        loadComponent: () => import('./features/list-permission/list-permission.component').then(m => m.ListPermissionComponent)
      },
      // {
      //   path: ':id', // Ruta para ver un permiso específico
      //   loadComponent: () => import('./features/view-permission/view-permission.component').then(m => m.ViewPermissionComponent)
      // }
      // Aquí añadiremos list y view.
    ]
  }
  /*
  {
    path: '',
    loadComponent: () =>
      import('./pages/permission-tree-page/permission-tree-page')
        .then(m => m.PermissionTreePage)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/permission-form-page/permission-form-page')
        .then(m => m.PermissionFormPage)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/permission-form-page/permission-form-page')
        .then(m => m.PermissionFormPage)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/permission-detail-page/permission-detail-page')
        .then(m => m.PermissionDetailPage)
  }*/
];
