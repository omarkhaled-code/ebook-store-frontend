'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Overview', href: '/admin', icon: 'dashboard' },
    { label: 'Ebooks', href: '/admin/ebooks', icon: 'menu_book' },
    { label: 'Orders', href: '/admin/orders', icon: 'receipt_long' },
    { label: 'My Account', href: '/admin/account', icon: 'person' },
]

export default function AdminBottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-around px-sm py-xs">
            {navLinks.map((link) => {
                const isActive = pathname === link.href ||
                    ((link.href !== '/admin' || '/') && pathname.startsWith(link.href))

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex flex-col items-center gap-[2px] px-sm py-xs rounded-xl transition-all min-w-[60px]
              ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}
                    >
                        <div className={`w-1 h-1 rounded-full mb-[2px] transition-all ${isActive ? 'bg-primary' : 'bg-transparent'}`} />
                        <span
                            className="material-symbols-outlined text-[24px]"
                            style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                        >
                            {link.icon}
                        </span>
                        <span className="font-label-mono text-[10px] font-medium">
                            {link.label}
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}