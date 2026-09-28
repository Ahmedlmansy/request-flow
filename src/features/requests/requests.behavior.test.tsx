import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider, useLocation } from "react-router-dom";
import { useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { requestsKeys } from "@/features/requests/api/requests.keys";
import type {
  Request,
  RequestsListResponse,
} from "@/features/requests/api/requests.types";
import {
  getRequestById,
  getRequests,
  updateRequest,
} from "@/features/requests/api/requests.api";
import { useRequestsQuery } from "@/features/requests/hooks/useRequestsQuery";
import { useRequestsUrlState } from "@/features/requests/hooks/useRequestsUrlState";
import { useUpdateRequestMutation } from "@/features/requests/hooks/useUpdateRequestMutation";
import RequestDetailsPage from "@/features/requests/pages/RequestDetailsPage";

vi.mock("@/features/requests/api/requests.api", () => ({
  getRequests: vi.fn(),
  getRequestById: vi.fn(),
  updateRequest: vi.fn(),
  deleteRequest: vi.fn(),
}));

const request: Request = {
  id: "REQ-1001",
  title: "Update billing information",
  status: "pending",
  priority: "high",
  owner: "Ahmed Mahmoud",
  createdAt: "2026-09-01T09:15:00Z",
  updatedAt: "2026-09-01T09:15:00Z",
};

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function renderDetails(initialEntries = ["/requests/REQ-1001"]) {
  const queryClient = createQueryClient();
  const router = createMemoryRouter(
    [
      { path: "/", element: <div>Requests list route</div> },
      { path: "/requests/:requestId", element: <RequestDetailsPage /> },
    ],
    { initialEntries, initialIndex: initialEntries.length - 1 },
  );

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  return { router, queryClient };
}

function UrlStateProbe() {
  const state = useRequestsUrlState();
  const location = useLocation();

  return (
    <>
      <input
        aria-label="Search state"
        value={state.search}
        onChange={(event) => state.setSearch(event.target.value)}
      />
      <select
        aria-label="Priority state"
        value={state.priority}
        onChange={(event) => state.setPriority(event.target.value as typeof state.priority)}
      >
        <option value="">All</option>
        <option value="high">High</option>
      </select>
      <input
        aria-label="Owner state"
        value={state.owner}
        onChange={(event) => state.setOwner(event.target.value)}
      />
      <output data-testid="current-search">{location.search}</output>
    </>
  );
}

function MutationProbe() {
  const mutation = useUpdateRequestMutation();
  return (
    <button
      onClick={() =>
        mutation.mutate({ id: request.id, input: { status: "completed" } })
      }
    >
      Update status
    </button>
  );
}

function OutOfOrderQueryProbe() {
  const [search, setSearch] = useState("slow");
  const { data } = useRequestsQuery({ search, page: 1, pageSize: 10 });

  return (
    <>
      <button onClick={() => setSearch("fast")}>Show fast result</button>
      <output data-testid="query-title">
        {data?.data[0]?.title ?? "Loading"}
      </output>
    </>
  );
}

function responseWithTitle(title: string): RequestsListResponse {
  return {
    data: [{ ...request, title }],
    meta: {
      total: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
  };
}

describe("request behavior", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows the detail error state after the initial request fails", async () => {
    vi.mocked(getRequestById).mockRejectedValueOnce(
      new Error("Request unavailable"),
    );

    renderDetails();

    expect(await screen.findByText("data could not be loaded.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "retry" })).toBeInTheDocument();
  });

  it("blocks browser-style back navigation until edits are discarded", async () => {
    const user = userEvent.setup();
    vi.mocked(getRequestById).mockResolvedValue(request);
    const { router } = renderDetails(["/", "/requests/REQ-1001"]);

    const title = await screen.findByLabelText("Request Title");
    await user.clear(title);
    await user.type(title, "Changed title");

    await act(async () => {
      router.navigate(-1);
    });

    expect(
      await screen.findByText("Discard unsaved changes?"),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Discard Changes" }));
    expect(await screen.findByText("Requests list route")).toBeInTheDocument();
  });

  it("loads the newly selected request after confirming navigation", async () => {
    const user = userEvent.setup();
    vi.mocked(getRequestById).mockImplementation(async (id) => ({
      ...request,
      id,
      title: `Title for ${id}`,
    }));
    const { router } = renderDetails();

    const title = await screen.findByLabelText("Request Title");
    await user.clear(title);
    await user.type(title, "Unsaved title");
    await act(async () => {
      router.navigate("/requests/REQ-1002");
    });

    expect(
      await screen.findByText("Discard unsaved changes?"),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Discard Changes" }));

    await waitFor(() => {
      expect(screen.getByLabelText("Request Title")).toHaveValue(
        "Title for REQ-1002",
      );
    });
  });

  it("persists priority and owner filters while clearing the page", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [{ path: "/", element: <UrlStateProbe /> }],
      { initialEntries: ["/?search=invoice&page=3&pageSize=20"] },
    );
    render(<RouterProvider router={router} />);

    await user.selectOptions(screen.getByLabelText("Priority state"), "high");
    fireEvent.change(screen.getByLabelText("Owner state"), {
      target: { value: "Sara" },
    });

    const params = new URLSearchParams(screen.getByTestId("current-search").textContent);
    expect(params.get("search")).toBe("invoice");
    expect(params.get("priority")).toBe("high");
    expect(params.get("owner")).toBe("Sara");
    expect(params.has("page")).toBe(false);
    expect(params.get("pageSize")).toBe("20");
  });

  it("keeps the current search result when an older response arrives later", async () => {
    let resolveSlow!: (response: RequestsListResponse) => void;
    vi.mocked(getRequests).mockImplementation(({ search }) => {
      if (search === "slow") {
        return new Promise((resolve) => {
          resolveSlow = resolve;
        });
      }
      return Promise.resolve(responseWithTitle("Fast result"));
    });
    const user = userEvent.setup();
    const queryClient = createQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <OutOfOrderQueryProbe />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(resolveSlow).toBeTypeOf("function"));
    await user.click(screen.getByRole("button", { name: "Show fast result" }));
    expect(await screen.findByText("Fast result")).toBeInTheDocument();

    await act(async () => {
      resolveSlow(responseWithTitle("Slow result"));
    });

    expect(screen.getByTestId("query-title")).toHaveTextContent("Fast result");
  });

  it("rolls an optimistic status update back when the API rejects", async () => {
    let rejectUpdate!: (error: Error) => void;
    vi.mocked(updateRequest).mockImplementation(
      () =>
        new Promise<Request>((_resolve, reject) => {
          rejectUpdate = reject;
        }),
    );

    const queryClient = createQueryClient();
    const params = { page: 1, pageSize: 10 };
    const response: RequestsListResponse = {
      data: [request],
      meta: {
        total: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
    const queryKey = requestsKeys.list(params);
    queryClient.setQueryData(queryKey, response);

    render(
      <QueryClientProvider client={queryClient}>
        <MutationProbe />
      </QueryClientProvider>,
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Update status" }));
    await waitFor(() => {
      expect(queryClient.getQueryData<RequestsListResponse>(queryKey)?.data[0].status)
        .toBe("completed");
    });

    await act(async () => {
      rejectUpdate(new Error("Simulated failure"));
    });

    await waitFor(() => {
      expect(queryClient.getQueryData<RequestsListResponse>(queryKey)?.data[0].status)
        .toBe("pending");
    });
  });
});