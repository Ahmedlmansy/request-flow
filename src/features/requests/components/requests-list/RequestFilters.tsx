import type { RequestStatus } from "../../api/requests.types";
import type { RequestPriority } from "../../api/requests.types";
import { RequestSearch } from "./RequestSearch";
import { RequestSort } from "./RequestSort";
import { RequestStatusSelect } from "./RequestStatusSelect";

type Props = {
  search: string;
  onSearch: (value: string) => void;
  status: RequestStatus | "all";
  onStatus: (value: RequestStatus | "all") => void;
  priority: RequestPriority | "";
  onPriority: (value: RequestPriority | "") => void;
  owner: string;
  onOwner: (value: string) => void;
  sort: "newest" | "oldest";
  onSort: (value: "newest" | "oldest") => void;
};

export function RequestFilters({
  search,
  onSearch,
  status,
  onStatus,
  priority,
  onPriority,
  owner,
  onOwner,
  sort,
  onSort,
}: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(16rem,1fr)_repeat(4,minmax(8rem,auto))]">
      <RequestSearch value={search} onChange={onSearch} />
      <RequestStatusSelect value={status} onChange={onStatus} />
      <label className="sr-only" htmlFor="filter-priority">
        Filter by priority
      </label>
      <select
        id="filter-priority"
        aria-label="Filter by priority"
        value={priority}
        onChange={(event) =>
          onPriority(event.target.value as RequestPriority | "")
        }
        className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"
      >
        <option value="">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <label className="sr-only" htmlFor="filter-owner">
        Filter by owner
      </label>
      <input
        id="filter-owner"
        aria-label="Filter by owner"
        value={owner}
        onChange={(event) => onOwner(event.target.value)}
        placeholder="Owner"
        className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"
      />
      <RequestSort value={sort} onChange={onSort} />
    </div>
  );
}
