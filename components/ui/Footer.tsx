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
                        <Link href='/' className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[18px]">public</span>
                        </Link>
                        <Link href="mailto:info@luminabooks.com" className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-[18px]">mail</span>
                        </Link>
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
                    </ul>
                </div>

                {/* العمود الثالث: Company */}
                <div className="space-y-sm">
                    <h5 className="font-body-md text-body-md font-bold text-on-surface">Company</h5>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/about" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            {/* الجزء السفلي: حقوق النشر واللغة (تم تقليص الهامش العلوي من mt-xl إلى mt-md ليكون متناسقاً) */}
            <div className="max-w-container-max mx-auto px-gutter mt-md pt-md border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-md">
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                    © 2026 LuminaBooks Inc. All rights reserved.
                </p>
                {/* Soon... */}
                {/* <div className="flex items-center gap-xs"> */}
                    {/* <span className="material-symbols-outlined text-on-surface-variant text-[20px]">language</span> */}
                    {/* <select className="bg-transparent border-none font-body-sm text-body-sm text-on-surface-variant focus:ring-0 cursor-pointer outline-none"> */}
                        {/* <option>English (US)</option> */}
                        {/* <option>Arabic (AR)</option> */}
                        {/* <option>French</option> */}
                    {/* </select> */}
                {/* </div> */}
            </div>
        </footer>
    );
}