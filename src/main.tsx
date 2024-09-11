import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PergamentApp from "./pages/PergamentApp.tsx";
import PergamentLandingPage from "./pages/PergamentLandingPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PergamentLandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/whiteboard",
    element: <PergamentApp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
);
