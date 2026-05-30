'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/hooks/useToast'

const navLinks = [
  { label: 'Dashboard',  href: '/dashboard',           icon: 'dashboard' },
  { label: 'My Library', href: '/dashboard/purchases',  icon: 'book_2' },
  { label: 'Orders',     href: '/dashboard/orders',     icon: 'receipt_long' },
  { label: 'Settings',   href: '/dashboard/settings',   icon: 'settings' },
  { label: 'Support',    href: '/dashboard/support',    icon: 'help_outline' },
]

export default function SideNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, clearAuth } = useAuthStore()
  const toast = useToast()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      clearAuth()
      toast.success('Logged out successfully!')
      router.push('/')
    } catch {
      toast.error('Something went wrong!')
    }
  }

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-lg px-md gap-4 z-40 hidden md:flex">
      
      {/* Logo */}
      <div className="mb-lg">
        <Link href="/" className="font-headline-sm text-headline-sm font-bold text-primary">
          LuminaBooks
        </Link>
      </div>

      {/* User info */}
      <div className="flex items-center gap-3 px-4 mb-xl">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="font-headline-sm text-primary font-bold uppercase">
            {user?.name?.charAt(0) || '?'}
          </span>
        </div>
        <div>
          <p className="font-body-sm text-on-surface font-semibold truncate max-w-[130px]">
            {user?.name || 'User'}
          </p>
          <p className="font-body-sm text-on-surface-variant text-[12px]">
            {user?.role === 'admin' ? 'Admin' : 'Member'}
          </p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col gap-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all active:translate-x-1 font-body-sm
                ${isActive
                  ? 'bg-primary/10 text-primary border-l-4 border-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all rounded-lg font-body-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Log Out
        </button>
      </div>
    </aside>
  )
}