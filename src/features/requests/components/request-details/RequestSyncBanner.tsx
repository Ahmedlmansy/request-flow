import { RefreshCw } from "lucide-react";

export function RequestSyncBanner() {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#f2f3ff] px-5 py-2.5 text-[#434655] shadow-sm">
      <div className="flex items-center gap-2">
        <RefreshCw className="h-5 w-5 text-[#004ac6]" />
        <span className="text-[13px]">
          <strong className="font-semibold text-[#131b2e]">
            Background Sync Active:
          </strong>{" "}
          Request metadata was verified 45 seconds ago. Your unsaved input is
          locked and protected from overwrite.
        </span>
      </div>
      <span className="font-mono text-[12px] text-[#737686]">v2.14-rel</span>
    </div>
  );
}
