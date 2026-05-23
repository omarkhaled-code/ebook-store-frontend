


import style from "../style/EbooksSkeleton.module.css"
export default function EbookSkeleton() {
    return (
        <main className="pt-32 pb-xl px-gutter max-w-container-max mx-auto">
            {/* <!-- Header Skeleton --> */}
            <header className="mb-xl max-w-2xl">
                <div className={`${style.shimmer} ${style.skeleton_text} w-64 h-10 mb-4 bg-surface-container-highest`}></div>
                <div className={`${style.shimmer} ${style.skeleton_text} w-full h-4 mb-2 bg-surface-container-highest`}></div>
                <div className={`${style.shimmer} ${style.skeleton_text} w-3/4 h-4 bg-surface-container-highest`}></div>
            </header>
            {/* <!-- Search & Filter Bar Skeleton --> */}
            <div className="mb-lg flex flex-col md:flex-row gap-4 items-center">
                <div className={`${style.shimmer} ${style.skeleton_block} h-12 flex-grow bg-surface-container-highest w-full md:w-auto`}></div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className={`${style.shimmer} ${style.skeleton_block} h-12 w-32 bg-surface-container-highest`}></div>
                    <div className={`${style.shimmer} ${style.skeleton_block} h-12 w-32 bg-surface-container-highest`}></div>
                </div>
            </div>
            {/* <!-- Ebook Grid Skeleton --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
                {/* <!-- Card 1 --> */}
                <div className="flex flex-col gap-sm">
                    <div className={`${style.shimmer} ${style.skeleton_block} aspect-[3/4] w-full bg-surface-container-highest shadow-sm`}></div>
                    <div className="flex flex-col gap-2 p-2">
                        <div className={`${style.shimmer} ${style.skeleton_text} w-20 h-3 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-full h-5 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-2/3 h-4 bg-surface-container-highest`}></div>
                        <div className="flex justify-between items-center mt-2">
                            <div className={`${style.shimmer} ${style.skeleton_text} w-16 h-6 bg-surface-container-highest`}></div>
                            <div className={`${style.shimmer} ${style.skeleton_block} w-24 h-9 bg-surface-container-highest`}></div>
                        </div>
                    </div>
                </div>
                {/* <!-- Card 2 --> */}
                <div className="flex flex-col gap-sm">
                    <div className={`${style.shimmer} ${style.skeleton_block} aspect-[3/4] w-full bg-surface-container-highest shadow-sm`}></div>
                    <div className="flex flex-col gap-2 p-2">
                        <div className={`${style.shimmer} ${style.skeleton_text} w-20 h-3 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-full h-5 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-2/3 h-4 bg-surface-container-highest`}></div>
                        <div className="flex justify-between items-center mt-2">
                            <div className={`${style.shimmer} ${style.skeleton_text} w-16 h-6 bg-surface-container-highest`}></div>
                            <div className={`${style.shimmer} ${style.skeleton_block} w-24 h-9 bg-surface-container-highest`}></div>
                        </div>
                    </div>
                </div>
                {/* <!-- Card 3 --> */}
                <div className="flex flex-col gap-sm">
                    <div className={`${style.shimmer} ${style.skeleton_block} aspect-[3/4] w-full bg-surface-container-highest shadow-sm`}></div>
                    <div className="flex flex-col gap-2 p-2">
                        <div className={`${style.shimmer} ${style.skeleton_text} w-20 h-3 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-full h-5 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-2/3 h-4 bg-surface-container-highest`}></div>
                        <div className="flex justify-between items-center mt-2">
                            <div className={`${style.shimmer} ${style.skeleton_text} w-16 h-6 bg-surface-container-highest`}></div>
                            <div className={`${style.shimmer} ${style.skeleton_block} w-24 h-9 bg-surface-container-highest`}></div>
                        </div>
                    </div>
                </div>
                {/* <!-- Card 4 --> */}
                <div className="flex flex-col gap-sm">
                    <div className={`${style.shimmer} ${style.skeleton_block} aspect-[3/4] w-full bg-surface-container-highest shadow-sm`}></div>
                    <div className="flex flex-col gap-2 p-2">
                        <div className={`${style.shimmer} ${style.skeleton_text} w-20 h-3 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-full h-5 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-2/3 h-4 bg-surface-container-highest`}></div>
                        <div className="flex justify-between items-center mt-2">
                            <div className={`${style.shimmer} ${style.skeleton_text} w-16 h-6 bg-surface-container-highest`}></div>
                            <div className={`${style.shimmer} ${style.skeleton_block} w-24 h-9 bg-surface-container-highest`}></div>
                        </div>
                    </div>
                </div>
                {/* <!-- Card 5 --> */}
                <div className="flex flex-col gap-sm">
                    <div className={`${style.shimmer} ${style.skeleton_block} aspect-[3/4] w-full bg-surface-container-highest shadow-sm`}></div>
                    <div className="flex flex-col gap-2 p-2">
                        <div className={`${style.shimmer} ${style.skeleton_text} w-20 h-3 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-full h-5 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-2/3 h-4 bg-surface-container-highest`}></div>
                        <div className="flex justify-between items-center mt-2">
                            <div className={`${style.shimmer} ${style.skeleton_text} w-16 h-6 bg-surface-container-highest`}></div>
                            <div className={`${style.shimmer} ${style.skeleton_block} w-24 h-9 bg-surface-container-highest`}></div>
                        </div>
                    </div>
                </div>
                {/* <!-- Card 6 --> */}
                <div className="flex flex-col gap-sm">
                    <div className={`${style.shimmer} ${style.skeleton_block} aspect-[3/4] w-full bg-surface-container-highest shadow-sm`}></div>
                    <div className="flex flex-col gap-2 p-2">
                        <div className={`${style.shimmer} ${style.skeleton_text} w-20 h-3 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-full h-5 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-2/3 h-4 bg-surface-container-highest`}></div>
                        <div className="flex justify-between items-center mt-2">
                            <div className={`${style.shimmer} ${style.skeleton_text} w-16 h-6 bg-surface-container-highest`}></div>
                            <div className={`${style.shimmer} ${style.skeleton_block} w-24 h-9 bg-surface-container-highest`}></div>
                        </div>
                    </div>
                </div>
                {/* <!-- Card 7 --> */}
                <div className="flex flex-col gap-sm">
                    <div className={`${style.shimmer} ${style.skeleton_block} aspect-[3/4] w-full bg-surface-container-highest shadow-sm`}></div>
                    <div className="flex flex-col gap-2 p-2">
                        <div className={`${style.shimmer} ${style.skeleton_text} w-20 h-3 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-full h-5 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-2/3 h-4 bg-surface-container-highest`}></div>
                        <div className="flex justify-between items-center mt-2">
                            <div className={`${style.shimmer} ${style.skeleton_text} w-16 h-6 bg-surface-container-highest`}></div>
                            <div className={`${style.shimmer} ${style.skeleton_block} w-24 h-9 bg-surface-container-highest`}></div>
                        </div>
                    </div>
                </div>
                {/* <!-- Card 8 --> */}
                <div className="flex flex-col gap-sm">
                    <div className={`${style.shimmer} ${style.skeleton_block} aspect-[3/4] w-full bg-surface-container-highest shadow-sm`}></div>
                    <div className="flex flex-col gap-2 p-2">
                        <div className={`${style.shimmer} ${style.skeleton_text} w-20 h-3 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-full h-5 bg-surface-container-highest`}></div>
                        <div className={`${style.shimmer} ${style.skeleton_text} w-2/3 h-4 bg-surface-container-highest`}></div>
                        <div className="flex justify-between items-center mt-2">
                            <div className={`${style.shimmer} ${style.skeleton_text} w-16 h-6 bg-surface-container-highest`}></div>
                            <div className={`${style.shimmer} ${style.skeleton_block} w-24 h-9 bg-surface-container-highest`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
