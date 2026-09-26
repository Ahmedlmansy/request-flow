import { z } from "zod";

export const requestStatusSchema = z.enum([
  "",
  "pending",
  "in_progress",
  "completed",
  "cancelled",
]);

export const requestPrioritySchema = z.enum(["low", "medium", "high"]);

export const requestSortBySchema = z.enum([
  "createdAt",
  "updatedAt",
  "title",
  "priority",
]);

export const sortOrderSchema = z.enum(["asc", "desc"]);

export const requestSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: requestStatusSchema,
  priority: requestPrioritySchema,
  owner: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type RequestStatus = z.infer<typeof requestStatusSchema>;

export type RequestPriority = z.infer<typeof requestPrioritySchema>;

export type RequestSortBy = z.infer<typeof requestSortBySchema>;

export type SortOrder = z.infer<typeof sortOrderSchema>;

export type Request = z.infer<typeof requestSchema>;

export type CreateRequestInput = Pick<
  Request,
  "title" | "status" | "priority" | "owner"
>;

export type UpdateRequestInput = Partial<
  Pick<Request, "title" | "status" | "priority" | "owner">
>;

export interface GetRequestsParams {
  search?: string;
  status?: RequestStatus;
  priority?: RequestPriority;
  owner?: string;
  sortBy?: RequestSortBy;
  sortOrder?: SortOrder;
  page: number;
  pageSize: number;
}
export interface RequestsListMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
export interface RequestsListResponse {
  data: Request[];
  meta: RequestsListMeta;
}
