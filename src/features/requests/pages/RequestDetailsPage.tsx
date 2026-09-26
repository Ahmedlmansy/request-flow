import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DiscardChangesDialog } from "@/features/requests/components/request-details/DiscardChangesDialog";
import { RequestDetailsForm } from "@/features/requests/components/request-details/RequestDetailsForm";
import { RequestDetailsHeader } from "@/features/requests/components/request-details/RequestDetailsHeader";
import { RequestDetailsSidebar } from "@/features/requests/components/request-details/RequestDetailsSidebar";
import { RequestSyncBanner } from "@/features/requests/components/request-details/RequestSyncBanner";
import { useUpdateRequestMutation } from "@/features/requests/hooks/useUpdateRequestMutation";
import type { RequestDetailValues } from "@/features/requests/types/request-details.types";
import type { Request } from "@/features/requests/api/requests.types";
import { useRequestQuery } from "../hooks/useRequestQuery";

function toFormValues(request: Request): RequestDetailValues {
  return {
    title: request.title,
    status: request.status,
    priority: request.priority,
    owner: request.owner,
  };
}

type DiscardIntent = "reset" | "leave" | null;

export default function RequestDetailsPage() {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, dataUpdatedAt, refetch } =
    useRequestQuery(requestId);
  const updateRequestMutation = useUpdateRequestMutation();

  const [values, setValues] = useState<RequestDetailValues | null>(null);
  const [originalValues, setOriginalValues] =
    useState<RequestDetailValues | null>(null);
  const [discardIntent, setDiscardIntent] = useState<DiscardIntent>(null);

  const hasUnsavedChanges =
    values !== null &&
    originalValues !== null &&
    JSON.stringify(values) !== JSON.stringify(originalValues);

  useEffect(() => {
    if (!data) return;
    if (hasUnsavedChanges) return;
    const fresh = toFormValues(data);
    setValues(fresh);
    setOriginalValues(fresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges]);

  const updateValue = <Key extends keyof RequestDetailValues>(
    key: Key,
    value: RequestDetailValues[Key],
  ) => {
    setValues((current) => (current ? { ...current, [key]: value } : current));
  };

  const handleSave = () => {
    if (!requestId || !values) return;

    updateRequestMutation.mutate(
      {
        id: requestId,
        input: {
          title: values.title,
          status: values.status,
          priority: values.priority,
          owner: values.owner,
        },
      },
      {
        onSuccess: () => {
          setOriginalValues(values);
          toast.success("Request updated successfully", {
            description: "All modifications synchronized with the server.",
          });
        },
        onError: () => {
          toast.error("Unable to update request", {
            description: "The current changes were kept locally.",
          });
        },
      },
    );
  };

  const goToRequestsList = () => navigate("/");

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setDiscardIntent("leave");
    } else {
      goToRequestsList();
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setDiscardIntent("reset");
    } else {
      toast.info("No pending edits to cancel");
    }
  };

  const handleDiscard = () => {
    if (originalValues) setValues(originalValues);
    const intent = discardIntent;
    setDiscardIntent(null);
    if (intent === "leave") goToRequestsList();
  };

  if (!requestId) return null;

  if (isLoading || !values || !originalValues) {
    return <DetailsSkeleton />;
  }

  if (isError || !data) {
    return (
      <DetailsError
        message={error?.message}
        onRetry={() => refetch()}
        onBack={goToRequestsList}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8ff] font-sans text-[#131b2e] antialiased">
      <div className="mx-auto max-w-7xl p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <RequestDetailsHeader
            requestId={requestId}
            title={values.title}
            status={values.status}
            hasUnsavedChanges={hasUnsavedChanges}
            isSaving={updateRequestMutation.isPending}
            onBack={handleBack}
            onCancel={handleCancel}
            onSave={handleSave}
          />
          <RequestSyncBanner
            lastSyncedAt={dataUpdatedAt}
            isProtected={hasUnsavedChanges}
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="lg:col-span-7"
            >
              <RequestDetailsForm values={values} onChange={updateValue} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="lg:col-span-5"
            >
              <RequestDetailsSidebar request={data} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <DiscardChangesDialog
        open={discardIntent !== null}
        requestId={requestId}
        onOpenChange={(open) => !open && setDiscardIntent(null)}
        onDiscard={handleDiscard}
      />
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf8ff] p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Skeleton className="h-96 rounded-xl lg:col-span-7" />
          <Skeleton className="h-96 rounded-xl lg:col-span-5" />
        </div>
      </div>
    </div>
  );
}

function DetailsError({
  message,
  onRetry,
  onBack,
}: {
  message?: string;
  onRetry: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8ff] p-6">
      <div className="flex max-w-md flex-col items-center gap-3 rounded-xl border border-red-100 bg-white p-10 text-center shadow-sm">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <p className="text-sm font-semibold text-red-800">
          data could not be loaded.
        </p>
        {message && <p className="text-xs text-red-600">{message}</p>}
        <div className="mt-2 flex gap-2">
          <Button variant="outline" size="sm" onClick={onBack}>
            back
          </Button>
          <Button size="sm" onClick={onRetry}>
            retry
          </Button>
        </div>
      </div>
    </div>
  );
}
