import { AlertCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type RequestsAsyncStatesProps =
  | { status: "loading" }
  | { status: "error"; message?: string; onRetry: () => void }
  | { status: "empty"; hasActiveFilters: boolean; onReset: () => void };


export function RequestsAsyncStates(props: RequestsAsyncStatesProps) {
  if (props.status === "loading") {
    return (
      <Card className="mb-8 border-[#e2e8f0]/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-1.5 text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2563eb]" />
            Loading requests...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (props.status === "error") {
    return (
      <Card className="mb-8 border-[#e2e8f0]/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            Failed to load requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-red-100 bg-red-50 p-2.5">
            <p className="text-xs font-semibold text-red-800">
              {props.message ??
                "An unexpected error occurred while loading the orders."}
            </p>
          </div>
          <div className="mt-4 flex justify-end border-t border-[#e2e8f0] pt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={props.onRetry}
              className="h-8 text-[#2563eb]"
            >
              Try again{" "}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // status === "empty"
  return (
    <Card className="mb-8 flex flex-col items-center justify-center border-[#e2e8f0]/50 p-10 text-center shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#e2e7ff] text-[#737686]">
        <Filter className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold">No Requests Found</h3>
      <p className="mt-1 max-w-xs text-xs text-[#434655]">
        {props.hasActiveFilters
          ? "No records match the current filter stack."
          : "No requests yet."}
      </p>
      {props.hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={props.onReset}
          className="mt-4 h-8 text-[#2563eb]"
        >
          Reset Filter Stack
        </Button>
      )}
    </Card>
  );
}
