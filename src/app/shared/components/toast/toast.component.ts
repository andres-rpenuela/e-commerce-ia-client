import { Component, inject } from '@angular/core';
import { ToastService } from '@shared/servicies/toast/toast-service';
import { TOAST_TYPE_KEYS } from '@shared/types/toast.type';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'shared-toast',
  styleUrl: './toast.component.css',
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  readonly toastService = inject(ToastService);

  readonly styles = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
  };


  readonly iconStyles = {
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700',
  };

  protected readonly TOAST_TYPE_KEYS = TOAST_TYPE_KEYS;
}
