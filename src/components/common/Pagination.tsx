interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const pages = [];

  // Generate visible pages
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between py-4">

      {/* Previous */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="
          flex items-center gap-2 px-3 py-2 border rounded-lg
          bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300
          disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
        "
      >
        Previous
      </button>

      {/* Page Numbers */}
      <ul className="hidden sm:flex items-center gap-1">
        {pages.map((p) => (
          <li key={p}>
            <button
              onClick={() => onPageChange(p)}
              className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${p === page
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-white/[0.07]"}
              `}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="
          flex items-center gap-2 px-3 py-2 border rounded-lg
          bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300
          disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
        "
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
