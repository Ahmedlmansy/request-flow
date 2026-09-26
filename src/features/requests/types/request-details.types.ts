import type {
  RequestPriority,
  RequestStatus,
} from "@/features/requests/api/requests.types";


export type RequestDetailStatus = RequestStatus;
export type RequestDetailPriority = RequestPriority;

export interface RequestDetailValues {
  title: string;
  status: RequestDetailStatus;
  priority: RequestDetailPriority;
  owner: string;
}
