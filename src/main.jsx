import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./provider/axios.interceptor.js";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </CookiesProvider>
    </QueryClientProvider>
  </StrictMode>
);
