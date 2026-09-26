import type { GetRequestsParams } from "./requests.types";

export const requestsKeys = {
  all: ["requests"] as const,
  lists: () => [...requestsKeys.all, "list"] as const,
  list: (params: GetRequestsParams) =>
    [...requestsKeys.lists(), params] as const,
  details: () => [...requestsKeys.all, "detail"] as const,
  detail: (id: string) => [...requestsKeys.details(), id] as const,
};
