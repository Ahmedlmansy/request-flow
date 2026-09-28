import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { default: RequestsPage } = await import(
        "@/features/requests/pages/RequestsPage"
      );
      return { Component: RequestsPage };
    },
  },
  {
    path: "/requests/:requestId",
    lazy: async () => {
      const { default: RequestDetailsPage } = await import(
        "@/features/requests/pages/RequestDetailsPage"
      );
      return { Component: RequestDetailsPage };
    },
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
