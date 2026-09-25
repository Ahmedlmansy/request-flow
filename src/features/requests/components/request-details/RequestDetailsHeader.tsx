import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { statusConfig } from "@/features/requests/data/request-details.data";
import type { RequestDetailStatus } from "@/features/requests/types/request-details.types";

interface RequestDetailsHeaderProps {
  requestId: string;
  title: string;
  status: RequestDetailStatus;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  onBack?: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export function RequestDetailsHeader({
  requestId,
  title,
  status,
  hasUnsavedChanges,
  isSaving,
  onBack,
  onCancel,
  onSave,
}: RequestDetailsHeaderProps) {
  const currentStatus = statusConfig[status];
  return (
    <>
      <div className="flex items-center gap-2 text-sm text-[#434655]">
        <button
          onClick={onBack}
          className="flex items-center gap-1 font-medium text-[#004ac6] transition-colors hover:text-[#003ea8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Requests
        </button>
        <span className="text-[#737686]">/</span>
        <span className="font-mono text-[12px] font-medium text-[#131b2e]">
          {requestId}
        </span>
      </div>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <h1 className="truncate text-[28px] font-semibold leading-9 tracking-tight">
            {title}
          </h1>
          <span className="rounded-lg bg-[#eaedff] px-2.5 py-0.5 font-mono text-[12px] font-semibold text-[#434655]">
            {requestId}
          </span>
          <Badge
            variant="outline"
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${currentStatus.className}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${currentStatus.dot}`} />
            {currentStatus.label}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <AnimatePresence>
            {hasUnsavedChanges && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#e2e7ff] px-3 py-1.5 text-[12px] font-semibold text-[#38485d]"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#004ac6]" />
                Unsaved changes detected
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="h-9 rounded-lg border-[#c3c6d7] bg-white hover:bg-[#f2f3ff]"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={onSave}
            disabled={isSaving || !hasUnsavedChanges}
            className="h-9 gap-1.5 rounded-lg bg-[#2563eb] text-white hover:bg-[#004ac6]"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
