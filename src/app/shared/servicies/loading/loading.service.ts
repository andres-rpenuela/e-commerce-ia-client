
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  private readonly _loading = signal(false);
  private readonly _message = signal('Procesando...');

  readonly loading = this._loading.asReadonly();
  readonly message = this._message.asReadonly();

  show(message = 'Procesando...'): void {

    console.debug('LoadingService.show()', message);

    this._message.set(message);
    this._loading.set(true);
  }

  hide(): void {
    this._loading.set(false);
  }
}
