import { Routes } from '@angular/router';
import { CreatePermissionComponent } from './permissions/features/create-permission/create-permission.component';
import { PERMISSION_ROUTES } from './permissions/permissions.routes';


export const routes: Routes = [
  ...PERMISSION_ROUTES,
  {
    path: '',
    redirectTo: 'permissions',
    pathMatch: 'full'
  }
];
