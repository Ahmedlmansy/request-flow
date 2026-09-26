import { setupWorker } from "msw/browser";
import { requestsHandlers } from "./handlers";

export const worker = setupWorker(...requestsHandlers);
