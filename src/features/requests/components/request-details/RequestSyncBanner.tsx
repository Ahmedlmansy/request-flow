import { RefreshCw } from "lucide-react";

interface RequestSyncBannerProps {
  lastSyncedAt?: number;
  isProtected: boolean;
}

function formatSecondsAgo(timestamp?: number): string {
  if (!timestamp) return "just now";
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}

export function RequestSyncBanner({
  lastSyncedAt,
  isProtected,
}: RequestSyncBannerProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#f2f3ff] px-5 py-2.5 text-[#434655] shadow-sm">
      <div className="flex items-center gap-2">
        <RefreshCw className="h-5 w-5 text-[#004ac6]" />
        <span className="text-[13px]">
          <strong className="font-semibold text-[#131b2e]">
            Background Sync Active:
          </strong>{" "}
          Request metadata was verified {formatSecondsAgo(lastSyncedAt)}.{" "}
          {isProtected
            ? "Your unsaved input is locked and protected from overwrite."
            : "No local edits pending."}
        </span>
      </div>
    </div>
  );
}
