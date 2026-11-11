
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Storage } from '@shared/interfaces/storage.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {

  private readonly platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get<T>(key: string): T | null {
    if (!this.isBrowser) {
      return null;
    }

    try {
      const value = localStorage.getItem(key);

      return value ? JSON.parse(value) as T : null;
    } catch {
      this.remove(key);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }

  remove(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}
