// is not page available retrun to page available
import { useEffect } from "react";
import type { RequestsListResponse } from "@/features/requests/api/requests.types";

interface UseClampPageParams {
  data: RequestsListResponse | undefined;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function useClampPage({
  data,
  currentPage,
  onPageChange,
}: UseClampPageParams) {
  useEffect(() => {
    if (!data?.meta) return;

    const { totalPages } = data.meta;

    if (totalPages === 0) return;

    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [data, currentPage, onPageChange]);
}