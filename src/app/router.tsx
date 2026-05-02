import { createBrowserRouter, Navigate } from "react-router";
import { routes } from "../config/routes";
import { Login } from "../features/auth/Login";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import { Register } from "../features/auth/Register";
import { Dashboard } from "../features/dashboard/Dashboard";
import { AppLayout } from "../layouts/AppLayout";
import { AuthLayout } from "../layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: routes.login,
        element: <Login />,
      },
      {
        path: routes.register,
        element: <Register />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: routes.home,
            element: <Navigate to={routes.trips} replace />,
          },
          {
            path: routes.trips,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={routes.trips} replace />,
  },
]);
