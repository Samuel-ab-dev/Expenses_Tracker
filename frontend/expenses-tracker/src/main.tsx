import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "../context/userProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./i18n/index.ts";
import "./index.css";
import App from "./App";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <App />
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
);
