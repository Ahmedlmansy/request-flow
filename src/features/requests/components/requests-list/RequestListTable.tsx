import { motion } from "framer-motion";
import { ChevronDown, MoreHorizontal, RefreshCw } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  priorityConfig,
  statusConfig,
} from "@/features/requests/data/requests.data";
import type {
  RequestListItem,
  RequestListStatus,
} from "@/features/requests/types/request-list.types";

interface RequestListTableProps {
  requests: RequestListItem[];
  rowsPerPage: string;
  onStatusChange?: (
    request: RequestListItem,
    status: RequestListStatus,
  ) => void;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange: (value: string) => void;
}

export function RequestListTable({
  requests,
  rowsPerPage,
  onStatusChange,
  onPageChange,
  onRowsPerPageChange,
}: RequestListTableProps) {
  return (
    <section className="mb-8 overflow-hidden rounded-xl border border-[#e2e8f0]/40 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#e2e8f0] bg-[#f2f3ff] hover:bg-[#f2f3ff]">
              <TableHead className="w-12 text-center">
                <Checkbox />
              </TableHead>
              {[
                "Request Title & ID",
                "Status (Inline Triage)",
                "Priority",
                "Owner",
                "Created",
                "Updated",
                "Actions",
              ].map((heading) => (
                <TableHead
                  key={heading}
                  className="text-[11px] font-semibold uppercase tracking-wider text-[#737686]"
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request, index) => (
              <RequestRow
                key={request.id}
                request={request}
                index={index}
                onStatusChange={onStatusChange}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <RequestPagination
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </section>
  );
}

function RequestRow({
  request,
  index,
  onStatusChange,
}: {
  request: RequestListItem;
  index: number;
  onStatusChange?: (
    request: RequestListItem,
    status: RequestListStatus,
  ) => void;
}) {
  const status = statusConfig[request.status];
  const priority = priorityConfig[request.priority];
  const StatusIcon = status.icon;
  const PriorityIcon = priority.icon;
  return (
    <motion.tr
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: 0.05 * index }}
      className={cn(
        "group cursor-pointer border-b border-[#f1f5f9] transition-colors hover:bg-[#f8fafc]",
        request.isOptimistic && "bg-blue-50/40",
        request.status === "cancelled" && "opacity-75",
      )}
    >
      <TableCell className="text-center">
        <Checkbox />
      </TableCell>
      <TableCell>
        <div className="flex min-w-0 flex-col">
          <a
            href={`#/requests/${request.id}`}
            className={cn(
              "truncate text-sm font-semibold transition-colors hover:text-[#2563eb]",
              request.status === "cancelled" && "line-through",
            )}
          >
            {request.title}
          </a>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="font-mono text-xs font-medium text-[#2563eb]">
              {request.id}
            </span>
            <span className="text-[#c3c6d7]">•</span>
            <span className="text-xs text-[#434655]">{request.department}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        {request.status === "updating" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e2e7ff] px-2.5 py-1 font-mono text-xs text-[#434655]">
            <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#2563eb]" />
            Updating...
          </span>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-opacity hover:opacity-90",
                  status.className,
                )}
              >
                {StatusIcon ? (
                  <StatusIcon className="h-3.5 w-3.5" />
                ) : (
                  <span
                    className={cn("h-1.5 w-1.5 rounded-full", status.dot)}
                  />
                )}
                {status.label}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {(
                [
                  "in_progress",
                  "pending",
                  "completed",
                  "cancelled",
                ] as RequestListStatus[]
              ).map((nextStatus) => (
                <DropdownMenuItem
                  key={nextStatus}
                  onClick={() => onStatusChange?.(request, nextStatus)}
                >
                  {statusConfig[nextStatus].label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </TableCell>
      <TableCell>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold",
            priority.className,
          )}
        >
          <PriorityIcon className="h-3 w-3" />
          {priority.label}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            {request.owner.avatar && (
              <AvatarImage
                src={request.owner.avatar}
                alt={request.owner.name}
              />
            )}
            <AvatarFallback className="bg-[#d2d9f4] text-[11px] font-semibold text-[#0b1c30]">
              {request.owner.initials || request.owner.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-sm">{request.owner.name}</span>
        </div>
      </TableCell>
      <TableCell className="whitespace-nowrap text-sm text-[#434655]">
        {request.created}
      </TableCell>
      <TableCell className="whitespace-nowrap text-sm text-[#434655]">
        {request.updated === "Just now" ? (
          <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Just now
          </span>
        ) : (
          request.updated
        )}
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#737686]">
          <MoreHorizontal className="h-4 w-4" />{" "}
        </Button>
      </TableCell>
    </motion.tr>
  );
}

function RequestPagination({
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: {
  rowsPerPage: string;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-[#e2e8f0] bg-white px-4 py-3 sm:flex-row">
      <span className="text-sm text-[#434655]">
        Showing <strong className="text-[#131b2e]">1</strong> to{" "}
        <strong className="text-[#131b2e]">{rowsPerPage}</strong> of{" "}
        <strong className="text-[#131b2e]">128</strong> requests
      </span>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" className="h-8 px-2.5" disabled>
          Prev
        </Button>
        {[1, 2, 3].map((page) => (
          <Button
            key={page}
            variant={page === 1 ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange?.(page)}
            className={cn(
              "h-8 w-8",
              page === 1 && "bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
            )}
          >
            {page}
          </Button>
        ))}
        <span className="px-1 text-sm text-[#737686]">…</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(7)}
          className="h-8 w-8"
        >
          7
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(2)}
          className="h-8 px-2.5"
        >
          Next
        </Button>
      </div>
      <label className="flex items-center gap-2 text-sm text-[#434655]">
        Rows per page:
        <select
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(event.target.value)}
          className="h-8 rounded-md border border-slate-200 bg-white px-2"
        >
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
    </div>
  );
}
