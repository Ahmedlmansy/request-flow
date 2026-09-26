
import { api } from "@/lib/api";
import type {
  Request,
  GetRequestsParams,
  RequestsListResponse,
  UpdateRequestInput,
} from "./requests.types";

function buildParams(params: GetRequestsParams) {
  const cleaned: Record<string, string | number> = {};

  if (params.search) cleaned.search = params.search;
  if (params.status) cleaned.status = params.status;
  if (params.priority) cleaned.priority = params.priority;
  if (params.owner) cleaned.owner = params.owner;
  if (params.sortBy) cleaned.sortBy = params.sortBy;
  if (params.sortOrder) cleaned.sortOrder = params.sortOrder;
  cleaned.page = params.page ?? 1;
  cleaned.pageSize = params.pageSize ?? 10;

  return cleaned;
}

export async function getRequests(
  params: GetRequestsParams,
): Promise<RequestsListResponse> {
  const { data } = await api.get<RequestsListResponse>("/requests", {
    params: buildParams(params),
  });
  return data;
}

export async function getRequestById(id: string): Promise<Request> {
  const { data } = await api.get<Request>(`/requests/${id}`);
  return data;
}

export async function updateRequest(
  id: string,
  input: UpdateRequestInput,
): Promise<Request> {
  const { data } = await api.patch<Request>(`/requests/${id}`, input);
  return data;
}

export async function deleteRequest(id: string): Promise<{ id: string }> {
  const { data } = await api.delete<{ id: string }>(`/requests/${id}`);
  return data;
}
