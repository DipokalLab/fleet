import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes.tsx";
import { ThemeProvider } from "deventds2";
import { OptionPanelProvider } from "./context/OptionPanelContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <OptionPanelProvider>
      <RouterProvider router={router} />
    </OptionPanelProvider>
  </ThemeProvider>
);
