import { ToastType } from '@shared/types/toast.type';

export interface ToastMessage {
  type: ToastType;
  message: string;
}
