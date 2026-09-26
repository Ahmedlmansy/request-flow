import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  parsePage,
  parsePageSize,
  parsePriority,
  parseSortBy,
  parseSortOrder,
  parseStatus,
} from "./requestsUrlState.helpers";
import type { GetRequestsParams } from "../api/requests.types";

export function useRequestsUrlState() {
  const [searchParams, setSearchParams] = useSearchParams();

type RequestFiltersState = {
  search: string;
  status: "" | "pending" | "in_progress" | "completed" | "cancelled";
  priority: "" | "low" | "medium" | "high";
  owner: string;
  sortBy: "title" | "status" | "priority" | "owner" | "createdAt" | "updatedAt";
  sortOrder: "asc" | "desc";
  page: number;
  pageSize: number;
};

const state: RequestFiltersState = useMemo(
  () => ({
    search: searchParams.get("search") ?? "",
    status: parseStatus(searchParams.get("status")),
    priority: parsePriority(searchParams.get("priority")),
    owner: searchParams.get("owner") ?? "",
    sortBy: parseSortBy(searchParams.get("sortBy")),
    sortOrder: parseSortOrder(searchParams.get("sortOrder")),
    page: parsePage(searchParams.get("page")),
    pageSize: parsePageSize(searchParams.get("pageSize")),
  }),
  [searchParams],
    );
    
  const updateParams = useCallback(
    (
      updates: Partial<GetRequestsParams>,
      options?: { resetPage?: boolean },
    ) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);

          Object.entries(updates).forEach(([key, value]) => {
            if (value === "" || value == null) {
              next.delete(key);
            } else {
              next.set(key, String(value));
            }
          });

          if (options?.resetPage) {
            next.delete("page");
          }

          return next;
        },
        { replace: true }, 
      );
    },
    [setSearchParams],
  );

  const setSearch = useCallback(
    (value: string) => updateParams({ search: value }, { resetPage: true }),
    [updateParams],
  );

  const setStatus = useCallback(
    (value: GetRequestsParams["status"]) =>
      updateParams({ status: value }, { resetPage: true }),
    [updateParams],
  );

  const setPriority = useCallback(
    (value: GetRequestsParams["priority"]) =>
      updateParams({ priority: value }, { resetPage: true }),
    [updateParams],
  );

  const setOwner = useCallback(
    (value: string) => updateParams({ owner: value }, { resetPage: true }),
    [updateParams],
  );

  const setSort = useCallback(
    (sortBy: GetRequestsParams["sortBy"], sortOrder: "asc" | "desc") =>
      updateParams({ sortBy, sortOrder }, { resetPage: true }),
    [updateParams],
  );

  const setPage = useCallback(
    (page: number) => updateParams({ page }),
    [updateParams],
  );

  const setPageSize = useCallback(
    (pageSize: number) => updateParams({ pageSize }, { resetPage: true }),
    [updateParams],
  );

  return {
    ...state,
    setSearch,
    setStatus,
    setPriority,
    setOwner,
    setSort,
    setPage,
    setPageSize,
  };
}