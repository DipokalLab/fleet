import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes.tsx";
import { ThemeProvider } from "deventds2";
import { OptionPanelProvider } from "./context/OptionPanelContext.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { TopProgressProvider } from "./context/TopProgress.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <OptionPanelProvider>
      <TopProgressProvider>
        <RouterProvider router={router} />
      </TopProgressProvider>
    </OptionPanelProvider>
  </ThemeProvider>
);
