import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { PermissionTree } from '../models/permission-tree.model';
import { PermissionAction } from '@shared/types/permission.type';
import { PermissionBasic } from '../models/permission-basic.model';
import { Permission } from '../models/permission.model';
import { CreatePermissionCommand } from '../models/create-permission-command.model';
import { environment } from '../../../environments/environment';
import { CACHE_TTL, STORAGE_KEY } from '@shared/contants/storage.data';
import { PermissionTreeCache } from '@shared/caches/permission-tree.cache';



@Injectable({
  providedIn: 'root',
})
export class PermissionService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/permissions` ;

  findPermissionTree(forceRefresh = false): Observable<PermissionTree[]> {

    console.debug('[Permissions] Ejecutando findPermissionTree');
    console.debug('[Permissions] forceRefresh:', forceRefresh);

    const cachedTree = this.getCachedPermissionTree();

    console.debug('[Permissions] Caché:', cachedTree);

    if (cachedTree && !forceRefresh) {
      console.debug('[Permissions] Devolviendo datos de caché');
      return of(cachedTree);
    }

    console.debug('[Permissions] Ejecutando petición HTTP:', `${this.apiUrl}/tree`);

    return this.http
      .get<PermissionTree[]>(`${this.apiUrl}/tree`)
      .pipe(
        tap({
          next: tree => {
            console.debug('[Permissions] Respuesta recibida:', tree);
            this.savePermissionTree(tree);
          },
          error: error => {
            console.error('[Permissions] Error HTTP:', error);
          },
        }),
      );


  }

  findPermissionCandidates(action: PermissionAction): Observable<PermissionBasic[]> {
    return this.http.get<PermissionBasic[]>(
      `${this.apiUrl}/parent-candidates/${action}`,
    );
  }

  create(request: CreatePermissionCommand): Observable<Permission> {
    return this.http
      .post<Permission>(this.apiUrl, request)
      .pipe(
        tap(() => this.invalidatePermissionTree()),
      );
  }

  private getCachedPermissionTree(): PermissionTree[] | null {
    const cached = localStorage.getItem(STORAGE_KEY);

    if (!cached) {
      return null;
    }

    try {
      const cache: PermissionTreeCache = JSON.parse(cached);

      const expired =
        Date.now() - cache.timestamp > CACHE_TTL;

      if (expired) {
        this.invalidatePermissionTree();
        return null;
      }

      return cache.data;
    } catch {
      this.invalidatePermissionTree();
      return null;
    }
  }

  private savePermissionTree(tree: PermissionTree[]): void {
    const cache: PermissionTreeCache = {
      data: tree,
      timestamp: Date.now(),
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cache),
    );
  }

  invalidatePermissionTree(): void {
    localStorage.removeItem(STORAGE_KEY);
  }


}
