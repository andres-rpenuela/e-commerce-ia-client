export type ToastType = 'success' | 'error' | 'info' | 'warning';

export const TOAST_TYPE_KEYS : Record<ToastType,string> = {
  success: 'toast.success.title',
  error: 'toast.success.title',
  info: 'toast.info.title',
  warning: 'toast.warning.title'
}

export const TOAST_TYPE : Record<ToastType,ToastType> = {
  success : 'success',
  error: 'error',
  info: 'info',
  warning: 'warning'
}
