import { useQuery } from "@tanstack/react-query";
import { getRequestById } from "@/features/requests/api/requests.api";
import { requestsKeys } from "@/features/requests/api/requests.keys";

export function useRequestQuery(id: string | undefined) {
  return useQuery({
    queryKey: requestsKeys.detail(id ?? ""),
    queryFn: () => getRequestById(id as string),
    enabled: !!id,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  });
}
