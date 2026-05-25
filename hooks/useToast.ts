import { useToastStore } from '@/store/toastStore'

export function useToast() {
  const { addToast } = useToastStore()

  return {
    success: (message: string) => addToast(message, 'success'),
    error:   (message: string) => addToast(message, 'error'),
    warning: (message: string) => addToast(message, 'warning'),
    info:    (message: string) => addToast(message, 'info'),
  }
}