import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login/Page.tsx";
import Register from "./register/Page.tsx";
import Index from "./index/Page.tsx";
import Layout from "./Layout.tsx";
import Dashboard from "./dashboard/Page.tsx";

import { store } from "../app/store.ts";
import { Provider } from "react-redux";
import Modal from "react-modal";

Modal.setAppElement("#root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </Provider>
);
