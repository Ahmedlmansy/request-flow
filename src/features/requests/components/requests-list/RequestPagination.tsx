type Props = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

function getPageNumbers(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current]);
  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];

  sorted.forEach((p, idx) => {
    if (idx > 0 && p - sorted[idx - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(p);
  });

  return result;
}

export function RequestPagination({ page, pageCount, onPageChange }: Props) {
  if (pageCount <= 1) return null;

  const pageNumbers = getPageNumbers(page, pageCount);

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

      <div className="flex items-center gap-1">
        {pageNumbers.map((p, idx) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${idx}`} className="px-1 text-slate-400">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
                        aria-current={p === page ? "page" : undefined}
              className={
                p === page
                  ? "flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 font-semibold text-white"
                  : "flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100"
              }
            >
              {p}
            </button>
          ),
        )}
      </div>

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
