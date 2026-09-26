import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useRequestsUrlState } from "@/features/requests/hooks/useRequestsUrlState";
import { useRequestsQuery } from "@/features/requests/hooks/useRequestsQuery";
import { useClampPage } from "@/features/requests/hooks/useClampPage";

import { RequestListTable } from "@/features/requests/components/requests-list/RequestListTable";
import { RequestsAsyncStates } from "@/features/requests/components/requests-list/RequestsAsyncStates";

import { RequestFilters } from "@/features/requests/components/requests-list/RequestFilters";
import { RequestsHeader } from "@/features/requests/components/requests-list/RequestsHeader";
import type { RequestStatus } from "@/features/requests/api/requests.types";
import type {
  RequestListItem,
  RequestListStatus,
} from "@/features/requests/types/request-list.types";
import { useUpdateRequestMutation } from "../hooks/useUpdateRequestMutation";
import { mapRequestToListItem } from "@/lib/mapRequestToListItem";
import { useDeleteRequestMutation } from "../hooks/useDeleteRequestMutation";

interface RequestsPageProps {
  onCreateRequest?: () => void;
  onExportRequests?: () => void;
  onRefreshRequests?: () => void;
  onStatusChange?: (
    request: RequestListItem,
    status: RequestListStatus,
  ) => void;
  onDeleteRequest?: (request: RequestListItem) => void;
}

export default function RequestsPage({
  onCreateRequest,
  onExportRequests,
  onRefreshRequests,
  onStatusChange,
  onDeleteRequest,
}: RequestsPageProps) {
  const {
    search,
    status,
    sortOrder,
    page,
    pageSize,
    setSearch,
    setStatus,
    setSort,
    setPage,
    setPageSize,
  } = useRequestsUrlState();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useRequestsQuery({
    search,
    status,
    sortBy: "createdAt",
    sortOrder,
    page,
    pageSize,
  });

  useClampPage({ data, currentPage: page, onPageChange: setPage });

  const updateRequestMutation = useUpdateRequestMutation();
  const pendingId = updateRequestMutation.isPending
    ? updateRequestMutation.variables?.id
    : undefined;

  const deleteRequestMutation = useDeleteRequestMutation();
  const deletingId = deleteRequestMutation.isPending
    ? deleteRequestMutation.variables
    : undefined;

  const requests = useMemo(
    () =>
      (data?.data ?? []).map((item) =>
        mapRequestToListItem(item, { pendingId }),
      ),
    [data, pendingId],
  );

  const handleStatusChange = useCallback(
    (request: RequestListItem, newStatus: RequestListStatus) => {
      const status = newStatus as RequestStatus;

      updateRequestMutation.mutate(
        { id: request.id, input: { status } },
        {
          onSuccess: () => onStatusChange?.(request, newStatus),
        },
      );
    },
    [updateRequestMutation, onStatusChange],
  );

  const handleDelete = useCallback(
    (request: RequestListItem) => {
      deleteRequestMutation.mutate(request.id, {
        onSuccess: () => onDeleteRequest?.(request),
      });
    },
    [deleteRequestMutation, onDeleteRequest],
  );

  const handleFilterStatusChange = useCallback(
    (value: RequestStatus | "all") => {
      setStatus(value === "all" ? "" : value);
    },
    [setStatus],
  );

  const handleSortChange = useCallback(
    (value: "newest" | "oldest") => {
      setSort("createdAt", value === "newest" ? "desc" : "asc");
    },
    [setSort],
  );

  const handleResetFilters = useCallback(() => {
    setSearch("");
    setStatus("");
    setSort("createdAt", "desc");
  }, [setSearch, setStatus, setSort]);

  const handleRefresh = useCallback(() => {
    refetch();
    onRefreshRequests?.();
  }, [refetch, onRefreshRequests]);

  const handleRowsPerPageChange = useCallback(
    (value: string) => {
      const parsed = Number(value);
      if (Number.isFinite(parsed) && parsed > 0) setPageSize(parsed);
    },
    [setPageSize],
  );

  const isEmpty = !isLoading && !isError && requests.length === 0;
  const hasActiveFilters = !!search || !!status;
  const totalPages = data?.meta.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-[#faf8ff] font-sans text-[#131b2e] antialiased">
      <div className="mx-auto max-w-7xl p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <RequestsHeader
            onCreate={onCreateRequest}
            onExport={onExportRequests}
            onRefresh={handleRefresh}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <RequestFilters
            search={search}
            onSearch={setSearch}
            status={status === "" ? "all" : status}
            onStatus={handleFilterStatusChange}
            sort={sortOrder === "asc" ? "oldest" : "newest"}
            onSort={handleSortChange}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {isLoading ? (
            <RequestsAsyncStates status="loading" />
          ) : isError ? (
            <RequestsAsyncStates
              status="error"
              message={error?.message}
              onRetry={() => refetch()}
            />
          ) : isEmpty ? (
            <RequestsAsyncStates
              status="empty"
              hasActiveFilters={hasActiveFilters}
              onReset={handleResetFilters}
            />
          ) : (
            <RequestListTable
              requests={requests}
              rowsPerPage={String(pageSize)}
              page={page}
              totalPages={totalPages}
              totalItems={data?.meta.total ?? 0}
              deletingId={deletingId}
              isRefreshing={isFetching && isPlaceholderData}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onPageChange={setPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
