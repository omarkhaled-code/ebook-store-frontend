
import { EbookPagination } from "@/types/ebook"

const Pagination = ({ current_page, last_page  }: EbookPagination) => {
    return (
        <nav className="flex items-center justify-center gap-sm mt-xl">
            <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-body-sm text-body-sm font-bold">{current_page}</button>
            {/* <button className="w-10 h-10 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low font-body-sm text-body-sm transition-colors">2</button> */}
            {/* <button className="w-10 h-10 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low font-body-sm text-body-sm transition-colors">3</button> */}
            {/* <span className="text-outline">...</span> */}
            of
            <button className="w-10 h-10 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low font-body-sm text-body-sm transition-colors">{last_page}</button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
            </button>
        </nav>
    )
}

export default Pagination
