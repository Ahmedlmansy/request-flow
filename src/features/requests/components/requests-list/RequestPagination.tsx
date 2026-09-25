type Props = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export function RequestPagination({ page, pageCount, onPageChange }: Props) {
  if (pageCount <= 1) return null;
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="text-blue-700 disabled:text-slate-400"
      >
        Previous
      </button>
      <span>
        Page {page} of {pageCount}
      </span>
      <button
        type="button"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
        className="text-blue-700 disabled:text-slate-400"
      >
        Next
      </button>
    </div>
  );
}
