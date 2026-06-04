import { create } from 'zustand'

interface ConfirmStore {
  isOpen: boolean
  message: string
  onConfirm: () => void
  openConfirm: (message: string, onConfirm: () => void) => void
  closeConfirm: () => void
}

export const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  message: '',
  onConfirm: () => {},
  openConfirm: (message, onConfirm) => set({ isOpen: true, message, onConfirm }),
  closeConfirm: () => set({ isOpen: false, message: '', onConfirm: () => {} }),
}))