
export default function Register({ changeMode }) {
    return (
        <div className="lg:col-span-5 flex justify-center">
            <div
                className="w-full bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-xl relative overflow-hidden">
                {/* <!-- Subtle Accent Background --> */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="relative z-10 space-y-md">
                    <div className="lg:hidden text-center space-y-xs">
                        <h2 className="font-headline-md text-headline-md">Create your account</h2>
                        <p className="font-body-sm text-on-surface-variant">Join 15,000+ readers today.</p>
                    </div>
                    <div className="hidden lg:block">
                        <h2 className="font-headline-md text-headline-md">Get Started</h2>
                        <p className="font-body-sm text-on-surface-variant">Create an account to start your collection.</p>
                    </div>
                    <form className="space-y-md">
                        {/* <!-- Full Name --> */}
                        <div className="space-y-xs">
                            <label className="font-body-sm font-medium text-on-surface" for="fullname">Full Name</label>
                            <div className="relative">
                                <span
                                    className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">person</span>
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-body-md outline-none"
                                    id="fullname" name="fullname" placeholder="Alex Rivers" type="text" />
                            </div>
                        </div>
                        {/* <!-- Email --> */}
                        <div className="space-y-xs">
                            <label className="font-body-sm font-medium text-on-surface" for="email">Email Address</label>
                            <div className="relative">
                                <span
                                    className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">mail</span>
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-body-md outline-none"
                                    id="email" name="email" placeholder="alex@example.com" type="email" />
                            </div>
                        </div>
                        {/* <!-- Password --> */}
                        <div className="space-y-xs">
                            <label className="font-body-sm font-medium text-on-surface" for="password">Password</label>
                            <div className="relative">
                                <span
                                    className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">lock</span>
                                <input
                                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-body-md outline-none"
                                    id="password" name="password" placeholder="••••••••" type="password" />
                                <button
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                                    type="button">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                            </div>
                            <p className="text-[11px] text-on-surface-variant">At least 8 characters with a mix of letters
                                and numbers.</p>
                        </div>
                        {/* <!-- Submit Button --> */}
                        <button
                            className="w-full py-4 rounded-lg font-semibold bg-primary text-on-primary active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2 cursor-pointer"
                            type="submit">
                            Create Account
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </button>
                    </form>

                    <p className="text-center font-body-sm text-on-surface-variant pt-2">
                        {/* By signing up, you agree to our
                        <a className="text-primary hover:underline" href="#">Terms of Service</a>
                        and <a className="text-primary hover:underline" href="#">Privacy Policy</a>. */}
                        or have an account? <button onClick={() => changeMode('login')} className="text-primary hover:underline">Sign In</button>
                    </p>
                </div>
            </div>
        </div>
    )
}
