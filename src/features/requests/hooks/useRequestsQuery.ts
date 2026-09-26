
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getRequests } from "@/features/requests/api/requests.api";
import type { GetRequestsParams } from "@/features/requests/api/requests.types";
import { requestsKeys } from "../api/requests.keys";

export function useRequestsQuery(params: GetRequestsParams) {
  return useQuery({
    queryKey: requestsKeys.list(params),
    queryFn: () => getRequests(params),
    placeholderData: keepPreviousData,
    refetchInterval: 30_000, 
    refetchIntervalInBackground: false, 
  });
}
