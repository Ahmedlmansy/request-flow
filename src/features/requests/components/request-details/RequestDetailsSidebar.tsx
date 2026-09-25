import { Verified } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  auditEntries,
  metadata,
} from "@/features/requests/data/request-details.data";

export function RequestDetailsSidebar() {
  return (
    <div className="flex flex-col gap-5">
      <Card className="rounded-xl border-[#c3c6d7]/40 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737686]">
              System &amp; Audit Metadata
            </span>
            <Verified className="h-4 w-4 text-[#737686]" />
          </div>
        </CardHeader>
        <CardContent>
          {metadata.map((row, index) => (
            <div key={row.label}>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[13px] text-[#434655]">{row.label}</span>
                <div className="text-right">
                  <div className="text-[13px] font-medium">
                    {row.label === "Request Source" ? (
                      <Badge
                        variant="secondary"
                        className="bg-[#eaedff] text-[11px] text-[#434655]"
                      >
                        {row.value}
                      </Badge>
                    ) : row.label === "Reference Hash" ? (
                      <span className="rounded bg-[#f2f3ff] px-1.5 py-0.5 font-mono text-[12px] text-[#737686]">
                        {row.value}
                      </span>
                    ) : (
                      row.value
                    )}
                  </div>
                  {row.sub && (
                    <div className="font-mono text-[12px] text-[#737686]">
                      {row.sub}
                    </div>
                  )}
                </div>
              </div>
              {index < metadata.length - 1 && (
                <Separator className="bg-[#f2f3ff]" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded-xl border-[#c3c6d7]/40 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737686]">
              Audit Trail
            </span>
            <button className="font-mono text-[12px] text-[#004ac6] hover:underline">
              Full Log
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-5 pl-6">
            <div className="absolute bottom-2 left-2.5 top-2 w-0.5 bg-[#eaedff]" />
            {auditEntries.map((entry) => (
              <div key={entry.title} className="relative">
                <div
                  className={`absolute -left-[1.65rem] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-white ${entry.color}`}
                />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold">
                    {entry.title}
                  </span>
                  <span className="font-mono text-[12px] text-[#737686]">
                    {entry.time}
                  </span>
                </div>
                <p className="mt-0.5 text-[13px] text-[#434655]">
                  {entry.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
