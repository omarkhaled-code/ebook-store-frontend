import Link from "next/link";
export default function Footer() {
    return (
        <footer className="bg-surface-container-lowest dark:bg-surface-dim w-full py-md border-t border-outline-variant/30">
            {/* تم تعديل الجريد هنا ليكون 3 أعمدة فقط ليناسب البيانات الجديدة */}
            <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-3 gap-lg items-start">
                
                {/* العمود الأول: الشعار والوصف */}
                <div className="space-y-sm">
                    <span className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed-dim">
                        LuminaBooks
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant pt-xs">
                        Curating the finest digital knowledge for developers and designers.
                    </p>
                    <div className="flex gap-sm pt-xs">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[18px]">public</span>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[18px]">mail</span>
                        </div>
                    </div>
                </div>
                
                {/* العمود الثاني: Marketplace بعد تنظيفه */}
                <div className="space-y-sm">
                    <h5 className="font-body-md text-body-md font-bold text-on-surface">Marketplace</h5>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/ebooks" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all">
                                All Ebooks
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all">
                                Design &amp; Creative
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all">
                                Engineering
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* العمود الثالث: Company */}
                <div className="space-y-sm">
                    <h5 className="font-body-md text-body-md font-bold text-on-surface">Company</h5>
                    <ul className="space-y-2">
                        <li>
                            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            {/* الجزء السفلي: حقوق النشر واللغة (تم تقليص الهامش العلوي من mt-xl إلى mt-md ليكون متناسقاً) */}
            <div className="max-w-container-max mx-auto px-gutter mt-md pt-md border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-md">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                    © 2026 LuminaBooks Inc. All rights reserved.
                </p>
                <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">language</span>
                    <select className="bg-transparent border-none font-body-sm text-body-sm text-on-surface-variant focus:ring-0 cursor-pointer outline-none">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                    </select>
                </div>
            </div>
        </footer>
    );
}