import { Link } from "react-router-dom";

import type { Request } from "@/features/requests/api/requests.types";

export function RequestRow({ request }: { request: Request }) {
  return (
    <tr className="border-t border-slate-200">
      <td className="px-4 py-3">
        <Link
          to={`/requests/${request.id}`}
          className="font-medium text-blue-700 hover:underline"
        >
          {request.title}
        </Link>
        <p className="mt-1 text-xs text-slate-500">{request.description}</p>
      </td>
      <td className="px-4 py-3 capitalize">{request.status}</td>
      <td className="px-4 py-3 text-slate-500">
        {new Date(request.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
}
