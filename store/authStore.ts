import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearAuth: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearAuth: () => set({ user: null, isAuthenticated: false }),
      fetchUser: async () => {
        try {
          // استخدم المسار الذي لديك، افترضت أنه في /api/auth/me بناءً على هيكلة المجلدات
          const response = await fetch("/api/auth/me", {
            method: "GET",
          });

          const data = await response.json();

          if (!response.ok) {
            // في حال كان الرد 401 أو أي خطأ آخر، امسح بيانات المستخدم
            set({ user: null, isAuthenticated: false });
            return;
          }

          // إذا نجح الطلب، قم بتحديث الحالة
          set({ user: data.user, isAuthenticated: true });
        } catch (error) {
          // في حال حدوث خطأ في الشبكة أو أي مشكلة أخرى
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    { name: "user-storage" },
  ),
);
