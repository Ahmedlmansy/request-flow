import { Verified } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Request } from "@/features/requests/api/requests.types";

interface RequestDetailsSidebarProps {
  request: Request;
}


export function RequestDetailsSidebar({ request }: RequestDetailsSidebarProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Request ID", value: request.id },
    {
      label: "Created At",
      value: new Date(request.createdAt).toLocaleString(),
    },
    {
      label: "Last Updated",
      value: new Date(request.updatedAt).toLocaleString(),
    },
    { label: "Owner", value: request.owner },
  ];

  return (
    <div className="flex flex-col gap-5">
      <Card className="rounded-xl border-[#c3c6d7]/40 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737686]">
              Request Metadata
            </span>
            <Verified className="h-4 w-4 text-[#737686]" />
          </div>
        </CardHeader>
        <CardContent>
          {rows.map((row, index) => (
            <div key={row.label}>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[13px] text-[#434655]">{row.label}</span>
                <span className="text-[13px] font-medium">{row.value}</span>
              </div>
              {index < rows.length - 1 && (
                <Separator className="bg-[#f2f3ff]" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
