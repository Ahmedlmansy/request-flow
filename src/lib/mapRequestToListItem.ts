import type { Request } from "@/features/requests/api/requests.types";
import type {
  RequestListItem,
  RequestListStatus,
} from "@/features/requests/types/request-list.types";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}


function formatRelativeOrDate(iso: string): string {
  const date = new Date(iso);
  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);

  if (diffSec < 60) return "Just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface MapOptions {
  /** id بتاع الـ request اللي عندها mutation شغالة دلوقتي (لو موجود) */
  pendingId?: string;
}

export function mapRequestToListItem(
  request: Request,
  options: MapOptions = {},
): RequestListItem {
  const isPending = options.pendingId === request.id;

  return {
    id: request.id,
    title: request.title,
    // ⚠️ الـ API (Request) مفيهوش حقل department خالص — مش في
    // requests.types.ts ولا requests.data.ts. ده placeholder مؤقت.
    // لو محتاج قيمة حقيقية: ضيف department: string لـ Request type،
    // وللـ mock data، وبعدين استبدل السطر ده بـ request.department.
    department: "—",
    // وقت الـ mutation شغالة على الصف ده، بنعرض "updating" بدل الحالة
    // الحقيقية عشان RequestListTable بيعمل لها special UI (spinner)
    // — ده منفصل تمامًا عن الـ optimistic value المكتوب فعليًا في كاش
    // TanStack Query (اللي فيه الحالة الجديدة الصح لأي مستهلك تاني).
    status: isPending
      ? ("updating" as RequestListStatus)
      : (request.status as RequestListStatus),
    priority: request.priority,
    owner: {
      name: request.owner,
      initials: getInitials(request.owner),
    },
    created: formatRelativeOrDate(request.createdAt),
    updated: formatRelativeOrDate(request.updatedAt),
    isOptimistic: isPending,
  };
}
