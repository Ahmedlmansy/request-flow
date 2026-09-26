// Requests Url State Helpers
import type {
  RequestStatus,
  RequestPriority,
} from "@/features/requests/api/requests.types";

const VALID_STATUSES: RequestStatus[] = [
  "pending",
  "in_progress",
  "completed",
  "cancelled",
];
const VALID_PRIORITIES: RequestPriority[] = ["low", "medium", "high"];
const VALID_SORT_FIELDS = [
  "title",
  "status",
  "priority",
  "owner",
  "createdAt",
  "updatedAt",
] as const;

export function parseStatus(value: string | null): RequestStatus | "" {
  return VALID_STATUSES.includes(value as RequestStatus)
    ? (value as RequestStatus)
    : "";
}

export function parsePriority(value: string | null): RequestPriority | "" {
  return VALID_PRIORITIES.includes(value as RequestPriority)
    ? (value as RequestPriority)
    : "";
}

export function parseSortBy(
  value: string | null,
): (typeof VALID_SORT_FIELDS)[number] {
  return VALID_SORT_FIELDS.includes(value as any)
    ? (value as (typeof VALID_SORT_FIELDS)[number])
    : "createdAt";
}

export function parseSortOrder(value: string | null): "asc" | "desc" {
  return value === "asc" ? "asc" : "desc";
}

export function parsePage(value: string | null): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

export function parsePageSize(value: string | null): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.min(100, Math.floor(n)) : 10;
}
