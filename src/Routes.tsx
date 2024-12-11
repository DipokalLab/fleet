import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "./App";
import { LandingPage } from "./pages/Landing";
import { AuthPage } from "./pages/Auth";
import { ProfilePage } from "./pages/Profile";
import { AuthDonePage } from "./pages/AuthDone";
import { NotFoundPage } from "./pages/Error/NotFound";
import { DashboardPage } from "./pages/Dashboard";
import { PublicSpacePage } from "./pages/PublicSpace";
import { FallbackPage } from "./pages/Error/Fallback";
import { CreditPage } from "./pages/Credit";
import { PrivacyPage } from "./pages/Docs/Privacy";
import { DocsPage } from "./pages/Docs";
import { AboutPage } from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <FallbackPage />,
  },
  {
    path: "/app/*",
    element: <App />,
    errorElement: <FallbackPage />,
  },
  {
    path: "/space/*",
    element: <PublicSpacePage />,
    errorElement: <FallbackPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <FallbackPage />,
  },
  {
    path: "/auth/google/done",
    element: <AuthDonePage />,
    errorElement: <FallbackPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <FallbackPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <FallbackPage />,
  },
  {
    path: "/credit",
    element: <CreditPage />,
    errorElement: <FallbackPage />,
  },
  {
    path: "/docs",
    element: <DocsPage />,
    errorElement: <FallbackPage />,
  },
  {
    path: "/docs/privacy",
    element: <PrivacyPage />,
    errorElement: <FallbackPage />,
  },
  {
    path: "about",
    element: <AboutPage />,
    errorElement: <FallbackPage />,
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
