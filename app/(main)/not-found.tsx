import Link from 'next/link';

export default function NotFound() {
    return (
     <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-gutter">
        <div className="max-w-3xl w-full text-center">
            {/* <!-- Hero Illustration Container --> */}
            <div className="relative mb-12 flex justify-center">
                {/* <!-- Floating geometric accents for "Functional Sophistication" --> */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="relative group">
                    {/* <!-- The Illustration --> */}
                    <div
                        className="w-64 h-80 bg-surface-container-high rounded-xl shadow-lg border border-outline-variant overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
                        <img className="w-full h-full object-cover"
                            data-alt="A minimalist, high-end 3D render of a single, lonely indigo-colored book sitting on a vast, pristine white marble bookshelf. One empty, dark rectangular gap where a book is missing draws the viewer's eye. The lighting is soft and cinematic, casting delicate diffused shadows across the smooth surfaces. The aesthetic is clean, professional, and sophisticated, dominated by a palette of bright whites, subtle greys, and a deep, vibrant indigo accent."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1nR_8NfLJNXSmvQwSkXCmscL03CuIjVJ4iq2-d6ylcl0gVmWkT3PVo_GI4vkiWvgZLyg_RQK9S46rsuRpT4rGqd3T-mMM9jUPS1q5R8emAXEJ1UGDTNOTMdNGHq0wAuKOx6xKtlQxPG2aRQPeEnErs5yKQcr3DCX2NzPI6Kv33YYxgW4AVBrXWF-Zd83y1OU8mt2KVgWzrz9usnNkoxGVDAzPZ_HHQe8HkZit6HgePzio5ElR619iydIoNoMJW7OzoZMXj8_bhg" />
                    </div>
                    {/* <!-- 404 Overlay Badge --> */}
                    <div
                        className="absolute -bottom-6 -right-6 bg-primary px-6 py-3 rounded-xl shadow-xl border border-white/10 transform rotate-3">
                        <span className="font-label-mono text-label-mono text-white">ERROR CODE: 404</span>
                    </div>
                </div>
            </div>
            {/* <!-- Typography Content --> */}
            <h1 className="font-display-lg text-display-lg text-on-surface mb-4">404 - Page Not Found</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
                The chapter you're looking for seems to have been misplaced. The page might have been moved or simply
                doesn't exist in our current library.
            </p>
            {/* <!-- Action Cluster --> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-xl font-headline-sm text-headline-sm shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 active:scale-95"
                    href="/">
                    <span className="material-symbols-outlined">home</span>
                    Back to Marketplace
                </Link>
            </div>
         
        </div>
    </main>
    );
}