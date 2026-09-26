import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest } from "@/features/requests/api/requests.api";
import { requestsKeys } from "@/features/requests/api/requests.keys";
import type { RequestsListResponse } from "@/features/requests/api/requests.types";

interface MutationContext {
  previousLists: [readonly unknown[], RequestsListResponse | undefined][];
}


export function useDeleteRequestMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRequest(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: requestsKeys.lists() });

      const previousLists = queryClient.getQueriesData<RequestsListResponse>({
        queryKey: requestsKeys.lists(),
      });

      queryClient.setQueriesData<RequestsListResponse>(
        { queryKey: requestsKeys.lists() },
        (old) => {
          if (!old) return old;
          const filtered = old.data.filter((item) => item.id !== id);
          if (filtered.length === old.data.length) return old;

          return {
            ...old,
            data: filtered,
            meta: {
              ...old.meta,
              total: Math.max(0, old.meta.total - 1),
            },
          };
        },
      );

      return { previousLists } satisfies MutationContext;
    },

    onError: (_err, _id, context) => {
      const ctx = context as MutationContext | undefined;
      if (!ctx) return;
      ctx.previousLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: requestsKeys.lists() });
    },
  });
}
