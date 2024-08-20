import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "./App";
import { LandingPage } from "./pages/Landing";

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
    path: "about",
    element: <div>About</div>,
  },
]);
