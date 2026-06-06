import { create } from "zustand";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  addToast: (message, type, duration = 4000) => {
    const existing = get().toasts;

    // 👈 Don't add if same message already showing
    const isDuplicate = existing.some((t) => t.message === message);
    if (isDuplicate) return;

    // 👈 Max 3 toasts at a time — remove oldest if exceeded
    const trimmed = existing.length >= 3 ? existing.slice(1) : existing;

    const id = Math.random().toString(36).slice(2);

    set({ toasts: [...trimmed, { id, message, type, duration }] });

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
