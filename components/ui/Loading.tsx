

export default function Loading() {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-surface-container-high">
                <div className="h-full bg-primary animate-progress shadow-[0_0_8px_rgba(70,72,212,0.4)]"></div>
            </div>
            {/* <!-- Main Loading Canvas --> */}
            <main className="min-h-screen flex flex-col items-center justify-center px-gutter relative">
                {/* <!-- Background Ambient Glows --> */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-secondary-fixed/20 blur-[120px] rounded-full">
                    </div>
                    <div
                        className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary-fixed/20 blur-[120px] rounded-full">
                    </div>
                </div>
                {/* <!-- Centered Branding Core --> */}
                <div className="relative z-10 flex flex-col items-center gap-lg">
                    {/* <!-- Minimalist Animated Logo --> */}
                    <div className="animate-subtle-pulse flex flex-col items-center">
                        <div
                            className="w-20 h-20 mb-md bg-gradient-to-tr from-primary to-secondary-container rounded-2xl flex items-center justify-center shadow-xl shadow-primary/10 border border-white/20">
                            <span className="material-symbols-outlined text-[40px] text-white"
                                style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
                        </div>
                        {/* <!-- Product Identity --> */}
                        <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                            Lumina<span className="text-primary">Books</span>
                        </h1>
                    </div>
                    {/* <!-- Loading Status Indicator --> */}
                    <div className="flex flex-col items-center gap-sm">
                        <div className="flex items-center gap-xs text-on-surface-variant font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                            <p>Loading your library...</p>
                        </div>
                        {/* <!-- Skeleton Meta Mockup (Visual Polish) --> */}
                        <div className="mt-md flex gap-sm opacity-20">
                            <div className="w-12 h-16 bg-surface-container-highest rounded-md"></div>
                            <div className="w-12 h-16 bg-surface-container-highest rounded-md translate-y-2"></div>
                            <div className="w-12 h-16 bg-surface-container-highest rounded-md"></div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
