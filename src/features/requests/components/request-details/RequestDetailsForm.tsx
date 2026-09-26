import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  RequestDetailValues,
  RequestDetailStatus,
  RequestDetailPriority,
} from "@/features/requests/types/request-details.types";

interface RequestDetailsFormProps {
  values: RequestDetailValues;
  onChange: <Key extends keyof RequestDetailValues>(
    key: Key,
    value: RequestDetailValues[Key],
  ) => void;
}

const OWNER_OPTIONS = [
  "Ahmed Mahmoud",
  "Sara Ali",
  "Omar Hassan",
  "Nour El-Din",
  "Yasmin Khaled",
  "Karim Fathy",
  "Mona Samir",
  "Tarek Mostafa",
  "Hana Ibrahim",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

export function RequestDetailsForm({
  values,
  onChange,
}: RequestDetailsFormProps) {
  return (
    <Card className="rounded-xl border-[#c3c6d7]/40 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Request Parameters</h2>
            <p className="mt-0.5 text-[13px] text-[#434655]">
              Update the primary attributes and routing owner.
            </p>
          </div>
          <Badge
            variant="secondary"
            className="bg-[#eaedff] text-[11px] uppercase tracking-wider text-[#434655]"
          >
            Edit Mode
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="reqTitle" className="text-[12px] font-semibold">
              Request Title
            </Label>
            <span className="font-mono text-[12px] text-[#737686]">
              Required
            </span>
          </div>
          <Input
            id="reqTitle"
            value={values.title}
            onChange={(event) => onChange("title", event.target.value)}
            className="h-9 rounded-lg border-transparent bg-[#f2f3ff] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#2563eb]/40"
          />
          <p className="text-[13px] text-[#434655]">
            Concise summary of the business operational request.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailSelect
            label="Status"
            value={values.status}
            onChange={(value) =>
              onChange("status", value as RequestDetailStatus)
            }
            options={[
              ["pending", "Pending"],
              ["in_progress", "In Progress"],
              ["completed", "Completed"],
              ["cancelled", "Cancelled"],
            ]}
          />
          <DetailSelect
            label="Priority"
            value={values.priority}
            onChange={(value) =>
              onChange("priority", value as RequestDetailPriority)
            }
            options={[
              ["high", "High (P1)"],
              ["medium", "Medium (P2)"],
              ["low", "Low (P3)"],
            ]}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[12px] font-semibold">Current Assignee</Label>
          <Select
            value={values.owner}
            onValueChange={(value) => value && onChange("owner", value)}
          >
            <SelectTrigger className="relative h-9 rounded-lg border-transparent bg-[#f2f3ff] pl-11 focus:ring-2 focus:ring-[#2563eb]/40">
              <div className="absolute left-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#2563eb] text-[11px] font-bold text-white">
                {getInitials(values.owner)}
              </div>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {OWNER_OPTIONS.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[13px] text-[#434655]">
            Assigned member receives state transitions and resolution notices.
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-[12px] font-semibold">
              Description &amp; Operational Context
            </Label>
            <span className="text-[11px] text-[#737686]">
              Markdown supported
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[12px] font-semibold">{label}</Label>
      <Select
        value={value}
        onValueChange={(nextValue) => nextValue && onChange(nextValue)}
      >
        <SelectTrigger className="h-9 rounded-lg border-transparent bg-[#f2f3ff] focus:ring-2 focus:ring-[#2563eb]/40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(([optionValue, optionLabel]) => (
            <SelectItem key={optionValue} value={optionValue}>
              {optionLabel}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
