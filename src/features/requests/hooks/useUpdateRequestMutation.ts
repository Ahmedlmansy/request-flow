import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRequest } from "@/features/requests/api/requests.api";
import { requestsKeys } from "@/features/requests/api/requests.keys";
import type {
  Request,
  RequestsListResponse,
  UpdateRequestInput,
} from "@/features/requests/api/requests.types";

interface MutationVariables {
  id: string;
  input: UpdateRequestInput;
}

interface MutationContext {
  previousLists: [readonly unknown[], RequestsListResponse | undefined][];
  previousDetail: Request | undefined;
}

export function useUpdateRequestMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: MutationVariables) => updateRequest(id, input),

    onMutate: async ({ id, input }) => {
      await queryClient.cancelQueries({ queryKey: requestsKeys.lists() });
      await queryClient.cancelQueries({ queryKey: requestsKeys.detail(id) });

      const previousLists = queryClient.getQueriesData<RequestsListResponse>({
        queryKey: requestsKeys.lists(),
      });
      const previousDetail = queryClient.getQueryData<Request>(
        requestsKeys.detail(id),
      );

      queryClient.setQueriesData<RequestsListResponse>(
        { queryKey: requestsKeys.lists() },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((item) =>
              item.id === id ? { ...item, ...input } : item,
            ),
          };
        },
      );

      if (previousDetail) {
        queryClient.setQueryData<Request>(requestsKeys.detail(id), {
          ...previousDetail,
          ...input,
        });
      }

      return { previousLists, previousDetail } satisfies MutationContext;
    },

    onError: (_err, { id }, context) => {
      const ctx = context as MutationContext | undefined;
      if (!ctx) return;

      ctx.previousLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      if (ctx.previousDetail) {
        queryClient.setQueryData(requestsKeys.detail(id), ctx.previousDetail);
      }
    },

    onSettled: (_data, _err, { id }) => {
      queryClient.invalidateQueries({ queryKey: requestsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: requestsKeys.detail(id) });
    },
  });
}
