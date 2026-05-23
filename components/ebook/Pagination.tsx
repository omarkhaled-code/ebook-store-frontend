interface PaginationProps {
  current_page: number
  last_page: number
  handlePageChange: (newPage: number) => void
}

const Pagination = ({ current_page, last_page, handlePageChange }: PaginationProps) => {
  return (
    <nav className="flex items-center justify-center gap-sm mt-xl">
      {/* Previous button */}
      <button
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-50"
        disabled={current_page === 1}
        onClick={() => handlePageChange(current_page - 1)}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {/* Current page */}
      <button className="w-10 h-10 rounded-lg bg-primary text-on-primary font-body-sm text-body-sm font-bold">
        {current_page}
      </button>

      <span className="text-outline">of</span>

      {/* Last page */}
      <button
        className="w-10 h-10 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low font-body-sm text-body-sm transition-colors"
        onClick={() => handlePageChange(last_page)}
        disabled={current_page === last_page}
      >
        {last_page}
      </button>

      {/* Next button */}
      <button
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-50"
        disabled={current_page === last_page}
        onClick={() => handlePageChange(current_page + 1)}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>
  )
}

export default Pagination