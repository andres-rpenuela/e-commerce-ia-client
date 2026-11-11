
import { InjectionToken } from '@angular/core';

/**
 * Como las interfaces de TypeScript desaparecen durante la compilación,
 * Angular necesita un token para poder inyectar la implementación.
 *
 * Example de como registrar la implementación en Angular:
 *
 * import { ApplicationConfig } from '@angular/core';
 * import { STORAGE } from '@shared/storage/storage.token';
 * import { LocalStorageService } from '@shared/storage/services/local-storage.service';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     {
 *       provide: STORAGE,
 *       useExisting: LocalStorageService,
 *     },
 *   ],
 * };
 *
 * Utilizamos useExisting para que Angular reutilice la instancia de LocalStorageService en lugar de crear otra.
 */
export const STORAGE = new InjectionToken<Storage>('STORAGE');
