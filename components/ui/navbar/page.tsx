"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


const LinkComponent = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathname = usePathname();
    return pathname === href ? (
        <Link href={href} className="text-primary dark:text-primary-fixed-dim font-semibold border-b-2 border-primary font-body-md text-body-md transition-colors">
            {children}
        </Link>
    ) : (
    <Link   href={href} className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-body-md text-body-md">
        {children}
    </Link>
) 
};

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md shadow-sm">
            <div className="flex justify-between items-center px-gutter max-w-container-max mx-auto h-16">
                <div className="flex items-center gap-md">
                    <Link href="/">
                        <span className="font-headline-sm text-headline-sm font-bold text-primary dark:text-on-primary-fixed-variant">
                            LuminaBooks
                        </span>
                    </Link>

                    {/* الروابط المحسنة والمحدثة */}
                    <div className="hidden md:flex gap-md ml-lg">
                        <LinkComponent href="/ebooks">
                            Explore
                        </LinkComponent>
                        <LinkComponent href="/trending">
                            Trending
                        </LinkComponent>
                        <LinkComponent href="/categories">
                            Categories
                        </LinkComponent>
                        <LinkComponent href="/about">   
                            About Us
                        </LinkComponent>
                    </div>
                </div>

                {/* أزرار تسجيل الدخول والبدء */}
                <div className="flex items-center gap-sm">
                    <button className="hidden lg:flex items-center px-sm py-xs text-on-surface-variant font-body-sm text-body-sm hover:text-primary transition-colors">
                        Login
                    </button>
                    <button className="bg-primary text-on-primary px-md py-xs rounded-lg font-body-sm text-body-sm font-semibold scale-100 active:scale-95 transition-transform duration-200 shadow-sm">
                        Join Free
                    </button>
                </div>
            </div>
        </nav>
    );
}