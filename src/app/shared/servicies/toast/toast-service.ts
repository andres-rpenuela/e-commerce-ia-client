
import { Injectable, signal } from '@angular/core';
import { ToastMessage } from '@shared/models/toast.model';
import { TOAST_TYPE, TOAST_TYPE_KEYS, ToastType } from '@shared/types/toast.type';


@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private readonly _toast = signal<ToastMessage | null>(null);

  readonly toast = this._toast.asReadonly();

  private timeout?: ReturnType<typeof setTimeout>;

  success(message: string): void {
    this.show(TOAST_TYPE.success, message);
  }

  error(message: string): void {
    this.show(TOAST_TYPE.error, message);
  }

  info(message: string): void {
    this.show(TOAST_TYPE.info, message);
  }

  warning(message: string): void {
    this.show(TOAST_TYPE.warning, message);
  }

  dismiss(): void {
    clearTimeout(this.timeout);
    this._toast.set(null);
  }

  private show(type: ToastType, message: string): void {
    clearTimeout(this.timeout);

    this._toast.set({ type, message });

    this.timeout = setTimeout(() => {
      this.dismiss();
    }, 4000);
  }
}
