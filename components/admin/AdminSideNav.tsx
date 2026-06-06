'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/hooks/useToast'

const navLinks = [
  { label: 'Home',  href: '/',          icon: 'home' },
  { label: 'Overview',  href: '/admin',          icon: 'dashboard' },
  { label: 'Ebooks',    href: '/admin/ebooks',    icon: 'menu_book' },
  { label: 'Orders',    href: '/admin/orders',    icon: 'receipt_long' },
]

export default function AdminSideNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { clearAuth } = useAuthStore()
  const toast = useToast()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    clearAuth()
    toast.success('Logged out successfully!')
    router.push('/')
  }

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-lg px-md z-40 hidden md:flex border-r border-outline-variant/30">

      {/* Logo */}
      <div className="mb-lg">
        <Link href="/admin" className="font-headline-sm text-headline-sm font-bold text-primary">
          LuminaBooks
        </Link>
        <p className="font-body-sm text-[11px] text-on-surface-variant mt-1">
          Admin Panel
        </p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col gap-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href ||
            ((link.href !== '/admin' && link.href !== '/') && pathname.startsWith(link.href))

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-md py-sm rounded-lg transition-all font-body-sm
                ${isActive
                  ? 'bg-primary/10 text-primary border-l-4 border-primary font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="space-y-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all font-body-sm"
        >
          <span className="material-symbols-outlined text-[20px]">person</span>
          My Account
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all font-body-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Log Out
        </button>
      </div>
    </aside>
  )
}