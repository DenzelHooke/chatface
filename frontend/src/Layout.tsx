import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./global.css";
import ToastWatcher from "./components/ToastWatcher";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: any }) => {
  return (
    <div className="layout">
      <ToastWatcher />
      <ToastContainer />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
};

export default Layout;
