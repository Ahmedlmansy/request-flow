# RequestFlow

RequestFlow is a React + TypeScript dashboard for browsing and updating operational request records. It combines a request list with filter/search/sort/pagination state in the URL, a detail view for editing request metadata, and a mock API layer built with MSW to simulate realistic latency and failures.

## Overview

The application presents a request management workspace where users can:

- browse a paginated request list
- search and filter by status and owner
- sort the list by creation or update time
- open a details page to inspect and edit fields
- update request status directly from the list
- retry failed loads and mutations
- preserve the current list state via URL query parameters

The project is structured around a feature-based layout and uses TanStack Query for server-state orchestration. The mock API is intentionally noisy and flaky to exercise async safety patterns such as optimistic updates, rollback, loading states, and background refresh behavior.

## Assignment Requirements

The assignment described a dashboard for managing requests with the following expectations:

- request fields: title, status, priority, owner, createdAt, updatedAt
- search, filter, sort, and pagination in the list
- URL-persisted list state so refreshes and shared links preserve context
- safe handling of slow and out-of-order async responses
- optimistic status changes with rollback on failure
- request details editing with save handling and dirty-state protection
- periodic refresh without resetting filters/page or clobbering unsaved edits
- loading, error, empty, retry, and background refresh behavior
- mock API with simulated latency and failures
- tests covering critical behavior
- README with setup and technical decision notes

## Implemented Features

The current codebase implements the following requirements:

- Request list rendering and navigation to detail pages
- Search by title and request ID
- Status filtering
- Sort by creation/update time
- Pagination with page size selection
- URL synchronization for search, status, sort, page, and page size
- Refresh preserving list state through URL parameters
- Request detail page with editable fields and save actions
- Save success and error feedback
- Unsaved-change protection on navigation and before page unload
- Optimistic status updates from the list
- Rollback of list cache on mutation failure
- Loading, error, and empty list states
- Retry actions on query failures
- Mock API with latency and simulated failure injection
- MSW interception for `/api` routes
- Polling refresh for list/detail queries every 30 seconds while the tab is active
- Basic cache invalidation and refetching after mutations

## Tech Stack

The project uses the following technologies that are actually present in the codebase:

- React 19 — UI rendering and component composition
- TypeScript — application typing and API contracts
- Vite — tooling, dev server, and build pipeline
- React Router DOM 7 — route definitions and URL-driven state
- TanStack Query — server-state caching, refetching, mutation lifecycle, and optimistic updates
- Axios — HTTP client configured against the mock API base URL
- Zod — schema definitions for request-related types and validation contracts
- MSW (Mock Service Worker) — mock API layer in development and test contexts
- Tailwind CSS — styling system and utility classes
- shadcn/ui-inspired components — reusable UI primitives such as dialogs, buttons, tables, inputs, and selects
- Vitest and Testing Library — configured for UI testing; the project includes test tooling but not a populated test suite

## Architecture

The app follows a feature-oriented structure with a thin app shell and feature-specific modules.

```text
src/
├── app/
│   ├── providers/
│   ├── router/
│   └── queryClient.ts
├── components/
│   └── ui/
├── features/
│   └── requests/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── schemas/
│       └── types/
├── lib/
├── mocks/
├── App.tsx
├── main.tsx
├── index.css
└── ...
```

Important responsibilities by layer:

- `src/app` — React Query provider and route registration
- `src/features/requests/api` — request types, query keys, API helpers, and mock API contract
- `src/features/requests/hooks` — data fetching, mutation, and URL-state hooks
- `src/features/requests/components` — list UI, table, filters, and detail view components
- `src/features/requests/pages` — top-level route pages for list and detail screens
- `src/mocks` — MSW handlers, mock dataset, and network simulation logic
- `src/lib` — shared API client and list-item mapping helpers

## State Management Strategy

The project uses a small, layered state model rather than Redux:

- URL state → `react-router-dom` `useSearchParams` and query parameter serialization
- Server state → TanStack Query (`useQuery`, `useMutation`, `invalidateQueries`, `setQueryData`)
- Detail form state → local React `useState` in `RequestDetailsPage`
- Local UI state → component-level state for dialogs, data freshness banners, and loading flags

This is intentionally lightweight because the application’s core data comes from a mock API and the fetch lifecycle is already well-served by TanStack Query. There is no Redux store or global app state layer.

## Data Flow

A typical request flows through the app like this:

```text
User interaction
  ↓
Request page / detail page
  ↓
Custom hook (useRequestsQuery / useRequestQuery / useUpdateRequestMutation)
  ↓
Axios client (/api base URL)
  ↓
MSW handler
  ↓
Mock data store
  ↓
TanStack Query cache
  ↓
Rendered UI
```

For the list page, the hook uses query params from the URL to generate the request key and fetch set. For detail-page updates, the mutation updates the list and detail caches optimistically before the API call resolves.

## URL State

List state is synced to the browser URL through `useRequestsUrlState`.

Persisted query parameters:

- `search`
- `status`
- `priority`
- `owner`
- `sortBy`
- `sortOrder`
- `page`
- `pageSize`

Behavior:

- changing filters or search resets pagination via `resetPage: true`
- sorting resets pagination as well
- page changes keep the current filter state intact
- the list uses the URL as the single source of truth for current view state
- refresh and sharing a URL both preserve the current list view because the fetch request is reconstructed from the URL parameters

Example current URL:

```text
/?search=invoice&status=pending&sortBy=createdAt&sortOrder=desc&page=2&pageSize=20
```

This refreshes the same filtered and sorted list view without losing the current state.

## API / Mock API

The app relies on MSW handlers defined in `src/mocks/handlers.ts` and started in `src/main.tsx`.

Available endpoints:

```text
GET    /api/requests
GET    /api/requests/:id
PATCH  /api/requests/:id
DELETE /api/requests/:id
```

The list endpoint supports the following request params:

- `search`
- `status`
- `priority`
- `owner`
- `sortBy`
- `sortOrder`
- `page`
- `pageSize`

The mock list response shape is:

```ts
{
  data: Request[],
  meta: {
    total: number,
    page: number,
    pageSize: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPrevPage: boolean,
  }
}
```

Where `Request` includes:

```ts
{
  id: string,
  title: string,
  status: "pending" | "in_progress" | "completed" | "cancelled",
  priority: "low" | "medium" | "high",
  owner: string,
  createdAt: string,
  updatedAt: string,
}
```

Mock behavior:

- latency is simulated using `simulateNetwork()` with random delays between 200ms and 1200ms
- random failure injection is enabled for list/detail/update/delete requests
- failed requests throw an error that is surfaced in the UI and can be retried
- the mock API also returns 404 JSON messages for missing record IDs

The `api` client in `src/lib/api.ts` applies a base URL of `/api` and normalizes Axios rejection errors into a plain object with `message`, `status`, and `isNetworkError` fields.

## Optimistic Updates

The project implements optimistic status updates on the request list via `useUpdateRequestMutation`.

Flow:

```text
User changes status in the list
  ↓
Mutation starts
  ↓
TanStack Query caches new status immediately
  ↓
UI reflects the updated value right away
  ↓
API call resolves
  ↓
Success: keep optimistic state
Failure: restore previous cached query data
```

The mutation does the following in `onMutate`:

- cancels active list and detail queries
- snapshots previous list and detail cache data
- updates matching list items immediately
- updates the detail query cache if the same request is open

If the request fails, `onError` restores the cached state for each affected query key. The mutation then revalidates queries with `invalidateQueries` to sync with the server on the next cycle.

This logic is implemented for the list update flow, not for all detail-form field edits.

## Background Refresh / Polling

The app includes background refetching for both list and detail queries.

- `useRequestsQuery` sets `refetchInterval: 30_000`
- `useRequestQuery` sets `refetchInterval: 30_000`
- `refetchIntervalInBackground` is set to `false`, so polling runs while the page is active but not in the background tab

This is exposed in the UI as a subtle “refreshing” state. On the request list, the table adds a `pointer-events-none opacity-60` visual treatment while `isFetching && isPlaceholderData` is true. The page does not show a full-block loading screen during refreshes. Instead, the list remains visible and current filters/page remain intact due to the URL-driven state and query keys.

For request details, `RequestDetailsPage` avoids overwriting unsaved edits when a background refetch arrives. It only resets the form values when `hasUnsavedChanges` is false, and a banner indicates whether the request is protected from overwrite.

## Forms and Validation

The project does not use a form library such as `react-hook-form` or a runtime schema library for the detail form. The detail page is implemented with local React state and direct input handlers.

The current form flow is:

- `RequestDetailsPage` stores `values` and `originalValues` in `useState`
- `updateValue` updates a specific field
- `RequestDetailsForm` renders the form controls and calls `onChange`
- the save action sends `{ title, status, priority, owner }` to the patch API

This means there is currently no schema-driven validation layer or form validation helper at runtime. Field validation is effectively absent beyond UI affordances and the constraints in the type system.

## Error Handling

The app handles errors at several layers:

- initial list failures show the error card with a retry button
- detail page failures show a dedicated error state with back and retry actions
- mutation errors keep the optimistic modal state but show a toast notification
- 404 responses from the mock API surface a message from the API client interceptor
- retry actions call `refetch()` on the relevant query
- optimistic mutation failures restore cached values in `onError`

The error interceptor in `src/lib/api.ts` normalizes Axios failures to a consistent object with `message`, `status`, and `isNetworkError`.

## Loading and Empty States

The project includes distinct state handling for loading and empty data:

- initial data loading → `RequestsAsyncStates` with a loading skeleton card
- error state → red error card with retry action
- empty results → empty state card, with optional reset-button when filters are active
- background refresh → subtle opacity treatment and preserved page state instead of full-screen replacement
- detail loading → skeleton layout while the request data is not yet available
- detail error → alert card with retry and back actions

The list page uses `isLoading` for the first load, while `isFetching` and `isPlaceholderData` indicate an in-flight refresh that keeps the current UI in place.

## Performance Considerations

The codebase includes a few deliberate performance choices:

- TanStack Query caches request list and detail entries by query key
- query keys include search, filter, paging, and sort values, which prevents accidental cache collisions
- `keepPreviousData` is used so the list does not jump to a blank state during refetches
- background polling is throttled to every 30 seconds
- the list and detail pages are split into feature-specific components to reduce re-render scope
- the optimistic mutation uses targeted `setQueryData` updates rather than a full app-wide reset
- the list maps server records into a lightweight table model when rendering

The project does not include a heavy global state layer, which keeps render churn relatively low for a small dashboard application.

## Testing

The project is configured for Vitest and Testing Library in `vite.config.ts`:

```ts
// vite.config.ts
test: {
  globals: true,
  environment: "jsdom",
  setupFiles: "./src/test/setup.ts",
}
```

The repo’s current state includes the testing toolchain, but no actual test files were present in the workspace when reviewed. That means there is no concrete automated coverage for flows such as list rendering, URL state sync, optimistic updates, form save success/rollback, or background refresh in the current implementation.

The project does include the dependencies needed for this work, and the command to run the suite is:

```bash
npm test
```

## Getting Started

### Requirements

No explicit Node.js version is pinned in `package.json`.

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Tests

```bash
npm test
```

### Build

```bash
npm run build
```

## Environment Variables

There are no required runtime environment variables in the project at the moment.

- `.env` exists but is empty
- no `.env.example` file is present
- the app uses a relative `/api` Axios base URL and does not access Vite env variables

No secret or production credentials are required for the current mock setup.

## Important Technical Decisions

1. TanStack Query was chosen for server state because the app needs caching, revalidation, stale data handling, and mutation lifecycles that would otherwise require custom logic.
2. URL parameters are used for list state to keep the list view shareable and refresh-safe. This is implemented directly with `useSearchParams` and custom parsing helpers.
3. Form state is kept local to `RequestDetailsPage` instead of using a library like React Hook Form because the edit flow is small and the project does not yet need a richer validation system.
4. MSW is used to simulate a realistic API without a backend service, which also gives deterministic control over latency and failure probability.
5. Optimistic updates are implemented only for the inline status mutation, where the list item preview changes before the API resolves.
6. Rollback is handled by restoring previous query cache entries in `onError` for all list query keys affected by the mutation.
7. Background refresh works through `refetchInterval`, but it intentionally avoids a full-page blocking spinner so the user remains focused on the active page and the current filters remain intact.
8. The app relies on React Query query keys and `cancelQueries`/`invalidateQueries` to reduce stale state conflicts and keep cache data aligned with the server.
9. Unsaved changes are protected by a `beforeunload` event listener and a confirmation dialog when the user tries to leave the detail page.
10. Unnecessary UI churn is reduced by using query keys to preserve list state and by using placeholder data during refetch so the interface remains stable.

## Assignment Requirement vs Implementation

| Requirement | Status | Implementation |
| --- | --- | --- |
| Search | Implemented | URL-backed search in the list page with `useRequestsUrlState` and `useRequestsQuery` |
| Filtering | Implemented | status filter is applied on the list query with query params |
| Sorting | Implemented | sort by created/updated time and URL persistence |
| Pagination | Implemented | paginated list and page size selector |
| URL persistence | Implemented | search/filter/sort/page state stored in the query string |
| Refresh preserving state | Implemented | list state is reconstructed from URL params |
| Shareable URL state | Implemented | URL reflects the current filters/sort/page |
| Slow API handling | Implemented | mock network delay via `simulateNetwork()` |
| Failure handling | Implemented | mock API failures injected with random probability |
| Out-of-order responses | Partial | query caching and placeholder data reduce visible conflict; no custom request-ordering logic is implemented |
| Optimistic status update | Implemented | list status mutation updates cache before API completes |
| Rollback on failure | Implemented | previous query data is restored in `onError` |
| Detail page view | Implemented | view request metadata and edit fields |
| Save changes | Implemented | patch request mutation and success toast |
| Save errors | Implemented | mutation error toast and local change retention |
| Unsaved changes protection | Implemented | dialog + `beforeunload` guard |
| Background refresh | Implemented | 30-second refetch interval with preserved list state |
| Loading states | Implemented | skeleton and async-state cards |
| Error states | Implemented | list/detail error views and retry actions |
| Empty states | Implemented | empty results card with reset option |
| Mock API | Implemented | MSW handlers and generated mock data |
| Test coverage | Not implemented | tooling configured, but no actual tests were present in the repo |

## Known Limitations

The implementation is functional for the assignment scope, but some items are only partially satisfied or intentionally simplified:

- There is no real form validation layer using React Hook Form + Zod. The detail form uses local state only.
- There is no actual test suite in the current repository, despite the Vitest configuration being present.
- The project does not implement a full “owner” or “priority” filter UI beyond the existing status filter and the `owner` URL parameter support in the API layer.
- The app does not expose explicit environment configuration for API hosts or feature flags; it assumes a local mock layer running via MSW.
- The optimistic update pattern is implemented for list status changes, not for every detail field change.
- The mock API is intentionally probabilistic and may produce failures; the app is designed around that behavior but not a production-grade backend contract.

## Development Notes

- The app starts with MSW in `src/main.tsx` before mounting the React app.
- The mock API runs under `/api` and is designed to fail randomly, so the UI should be checked with a few reloads or repeated actions to see retry and rollback flows.
- The request list is driven primarily by URL state. If you need to debug list state, check the browser query string as the source of truth.
- Background polling is intentionally conservative and does not force a full re-render or reset the current view.
- The assignment’s design intent is visible in the styling and component structure, but the code remains a practical implementation rather than a fully production-hardened backend-integrated app.

---

This README reflects the code as it exists in the repository today, not an idealized version of the assignment. It documents the implemented behavior, the current architecture, and the notable gaps that remain.
