import { http, HttpResponse } from "msw";
import type { Request } from "@/features/requests/api/requests.types";
import { requests } from "./data";
import { simulateNetwork } from "./simulate";


const NO_CACHE_HEADERS = { "Cache-Control": "no-store" };

export const requestsHandlers = [
  http.get("/api/requests", async ({ request }) => {
    await simulateNetwork({ failureRate: 0.1 });

    const url = new URL(request.url);

    const search = url.searchParams.get("search")?.toLowerCase() || "";
    const status = url.searchParams.get("status") || "";
    const priority = url.searchParams.get("priority") || "";
    const owner = url.searchParams.get("owner")?.toLowerCase() || "";
    const sortBy = (url.searchParams.get("sortBy") ||
      "createdAt") as keyof Request;
    const sortOrder =
      url.searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
    const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
    const pageSize = Math.max(
      1,
      Math.min(100, Number(url.searchParams.get("pageSize")) || 10),
    );

    // 1. Filtering
    let filtered = requests.filter((item: Request) => {
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search);

      const matchesStatus = !status || item.status === status;
      const matchesPriority = !priority || item.priority === priority;
      const matchesOwner = !owner || item.owner.toLowerCase().includes(owner);

      return matchesSearch && matchesStatus && matchesPriority && matchesOwner;
    });

    // 2. Sorting
    filtered = filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue == null || bValue == null) return 0;

      // Dates
      if (sortBy === "createdAt" || sortBy === "updatedAt") {
        const aTime = new Date(aValue as string).getTime();
        const bTime = new Date(bValue as string).getTime();
        return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
      }

      // Strings
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    // 3. Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return HttpResponse.json(
      {
        data,
        meta: {
          total,
          page,
          pageSize,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
      { headers: NO_CACHE_HEADERS },
    );
  }),

  // get single request
  http.get("/api/requests/:id", async ({ params }) => {
    await simulateNetwork({ failureRate: 0.1 });

    const found = requests.find((r) => r.id === params.id);
    if (!found) {
      return HttpResponse.json(
        { message: "Not found" },
        { status: 404, headers: NO_CACHE_HEADERS },
      );
    }
    return HttpResponse.json(found, { headers: NO_CACHE_HEADERS });
  }),

  // Update request
  http.patch("/api/requests/:id", async ({ params, request }) => {
    await simulateNetwork({ failureRate: 0.15 });

    const body = (await request.json()) as Partial<Request>;
    const index = requests.findIndex((r) => r.id === params.id);

    if (index === -1) {
      return HttpResponse.json(
        { message: "Not found" },
        { status: 404, headers: NO_CACHE_HEADERS },
      );
    }

    requests[index] = {
      ...requests[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json(requests[index], { headers: NO_CACHE_HEADERS });
  }),
];


  http.delete("/api/requests/:id", async ({ params }) => {
    await simulateNetwork({ failureRate: 0.15 });
 
    const index = requests.findIndex((r) => r.id === params.id);
 
    if (index === -1) {
      return HttpResponse.json(
        { message: "Not found" },
        { status: 404, headers: NO_CACHE_HEADERS },
      );
    }
 
    requests.splice(index, 1);
 
    return HttpResponse.json(
      { id: params.id as string },
      { headers: NO_CACHE_HEADERS },
    );
  })
 
