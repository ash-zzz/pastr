import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./pages/App.tsx";
import IndexPage from "./pages/IndexPage.tsx";
import "./index.css";
import { loadDataForPage } from "./utils/api.ts";

const router = createBrowserRouter([
  {
    path: "/:name",
    element: <App />,
    loader: async ({ params: { name = "index" } }) => loadDataForPage(name),
  },
  {
    path: "/",
    element: <IndexPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
