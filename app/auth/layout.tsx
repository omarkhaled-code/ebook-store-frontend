export default function layout({ children }) {
    return (

        <main className="flex-grow flex items-center justify-center pt-16 px-gutter">
            <div className="max-w-container-max w-full grid grid-cols-1 lg:grid-cols-12 items-center py-xl gap-xl">
                {/* <!-- Left Side: Value Proposition / Bento-ish Layout --> */}
                <div className="lg:col-span-7 space-y-lg hidden lg:block">
                    <div className="space-y-sm">
                        <span
                            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full font-label-mono text-label-mono">
                            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                            JOIN 15,000+ READERS
                        </span>
                        <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">
                            Unlock a world of <span className="text-primary">knowledge</span> and curated stories.
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant">
                            Experience the most sophisticated platform for modern readers and digital bibliophiles.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-md">
                        {/* <!-- Feature Card 1 --> */}
                        <div
                            className="p-md bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-xs hover:shadow-md transition-all">
                            <div
                                className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
                                <span className="material-symbols-outlined">library_books</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm">Curated Library</h3>
                            <p className="font-body-sm text-on-surface-variant">Personalized recommendations powered by human
                                editors and smart algorithms.</p>
                        </div>
                        {/* <!-- Feature Card 2 --> */}
                        <div
                            className="p-md bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-xs hover:shadow-md transition-all">
                            <div
                                className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                                <span className="material-symbols-outlined">devices</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm">Multi-Device</h3>
                            <p className="font-body-sm text-on-surface-variant">Read seamlessly on your e-reader, tablet, or phone
                                with instant cloud sync.</p>
                        </div>
                        {/* <!-- Testimonial/Social Proof --> */}
                        <div
                            className="col-span-2 p-md bg-surface-container rounded-xl border border-outline-variant/30 flex items-center gap-md">
                            <img className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                                data-alt="A close-up portrait of a professional man in his thirties with a warm, confident smile, set against a blurred urban background with soft afternoon sunlight. The lighting is high-end and cinematic, following a sophisticated light-mode aesthetic. The overall mood is approachable, professional, and successful, perfectly aligned with a premium digital service audience."
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYnTYuXp9QnbIvQv24RaclfahuwBYHk5OiZ4oRveKtpA05n4nxqjdaFMTGklSmbxO6lKUXzjBF8e8GH2fxzTuE-lRrBzu2rQ5NsUiJlr29r9HMkFixcBo8WplUHG2AkQ7RAxc5iRoNVNPDbC9L3PVvwjAaxXG7Drgg2KfKHM_xqw07Qns2c3sdELvN2v2D-JBMPWRpppSJTfzIkPnQpAsTpZjxpvEmhUrhvMtuMqEacQmmd7wc8wgKLatxeSA0twKUPindSsxFnA" />
                            <div>
                                <p className="font-body-md text-on-surface italic">"The interface is so clean, it actually makes me
                                    want to read more. LuminaBooks is a game changer."</p>
                                <p className="font-body-sm font-semibold text-primary mt-1">— James Carter, Tech Lead</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Right Side: Registration Form --> */}
                {children}
            </div>
        </main>

    )
}
