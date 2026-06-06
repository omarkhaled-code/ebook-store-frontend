"use client";
import { useState } from "react"; // استيراد الـ State للتحكم في قائمة الموبايل
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

const LinkComponent = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => {
    const pathname = usePathname();
    return pathname === href ? (
        <Link href={href} onClick={onClick} className="text-primary dark:text-primary-fixed-dim font-semibold border-b-2 border-primary font-body-md text-body-md transition-colors block md:inline-block">
            {children}
        </Link>
    ) : (
        <Link href={href} onClick={onClick} className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-body-md text-body-md block md:inline-block">
            {children}
        </Link>
    )
};

export default function Navbar() {
    const { isAuthenticated, user, clearAuth } = useAuthStore();
    const router = useRouter();
    
    // State لفتح وإغلاق القائمة في الموبايل
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        const res = await fetch('/api/auth/logout', {
            method: "POST"
        })
        if (res.ok) {
            clearAuth()
            setIsMenuOpen(false); // إغلاق القائمة عند الخروج
            router.push('/auth')
        }
    }

    return (
        <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md shadow-sm">
            <div className="flex justify-between items-center px-gutter max-w-container-max mx-auto h-16">
                
                {/* الجزء الأيسر: اللوجو والروابط الـ Desktop */}
                <div className="flex items-center gap-md">
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <span className="font-headline-sm text-headline-sm font-bold text-primary dark:text-on-primary-fixed-variant">
                            LuminaBooks
                        </span>
                    </Link>

                    {/* الروابط تظهر فقط في الـ Desktop وتختفي في الموبايل (hidden md:flex) */}
                    <div className="hidden md:flex gap-md ml-lg">
                        <LinkComponent href="/ebooks">Explores</LinkComponent>
                        <LinkComponent href="/about">About Us</LinkComponent>
                        <LinkComponent href="/contact">Contact Us</LinkComponent>

                        {isAuthenticated && (
                            <LinkComponent href="/dashboard">Dashboard</LinkComponent>
                        )}
                        {(isAuthenticated && user?.role === 'admin') && (
                            <LinkComponent href="/admin">Administration</LinkComponent>
                        )}
                    </div>
                </div>

                {/* الجزء الأيمن: أزرار الـ Auth للـ Desktop + زر الـ Hamburger للموبايل */}
                <div className="flex items-center gap-sm">
                    {/* أزرار الـ Desktop */}
                    <div className="hidden md:flex items-center gap-sm">
                        {!isAuthenticated ? (
                            <Link href="/auth" className="bg-primary text-on-primary px-5 py-2 rounded-lg font-body-md text-body-md font-semibold scale-100 active:scale-95 transition-all shadow-md">
                                Join Now
                            </Link>
                        ) : (
                            <button className="flex items-center px-sm py-xs text-on-surface-variant hover:text-red-500 cursor-pointer transition-colors" onClick={handleLogout}>
                                <span className="material-symbols-outlined mr-1">logout</span>
                                Logout
                            </button>
                        )}
                    </div>

                    {/* زر الـ Hamburger يظهر فقط في الموبايل (flex md:hidden) */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex md:hidden items-center justify-center p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[28px]">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* قائمة الموبايل المنسدلة: تظهر فقط عند الضغط على الهامبرغر وفي الشاشات الصغيرة */}
            {isMenuOpen && (
                <div className="md:hidden w-full bg-surface dark:bg-surface-dim border-t border-outline-variant/20 px-gutter py-4 space-y-4 shadow-lg absolute left-0 top-16 z-40 animate-in fade-in slide-in-from-top-5 duration-200">
                    
                    {/* الروابط الأساسية */}
                    <div className="space-y-3">
                        <LinkComponent href="/ebooks" onClick={() => setIsMenuOpen(false)}>
                            Explores
                        </LinkComponent>
                        <LinkComponent href="/about" onClick={() => setIsMenuOpen(false)}>
                            About Us
                        </LinkComponent>
                        <LinkComponent href="/contact" onClick={() => setIsMenuOpen(false)}>
                            Contact Us
                        </LinkComponent>

                        {/* روابط الحماية بناءً على حالة تسجيل الدخول */}
                        {isAuthenticated && (
                            <LinkComponent href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                Dashboard
                            </LinkComponent>
                        )}
                        {(isAuthenticated && user?.role === 'admin') && (
                            <LinkComponent href="/admin" onClick={() => setIsMenuOpen(false)}>
                                Administration
                            </LinkComponent>
                        )}
                    </div>

                    {/* خط فاصل داخلي */}
                    <hr className="border-outline-variant/10" />

                    {/* أزرار تسجيل الدخول / الخروج للموبايل */}
                    <div>
                        {!isAuthenticated ? (
                            <Link 
                                href="/auth" 
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full text-center bg-primary text-on-primary px-5 py-2.5 rounded-lg font-body-md text-body-md font-semibold shadow-md"
                            >
                                Join Now
                            </Link>
                        ) : (
                            <button 
                                className="w-full flex items-center justify-center gap-xs px-sm py-2.5 text-red-500 bg-red-500/10 hover:bg-red-500/20 rounded-lg font-body-md text-body-md transition-colors cursor-pointer" 
                                onClick={handleLogout}
                            >
                                <span className="material-symbols-outlined">logout</span>
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}