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
import { NotFoundPage } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/auth/google/done",
    element: <AuthDonePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
