import { createBrowserRouter, Navigate } from "react-router";
import { routes } from "../config/routes";
import { Login } from "../features/auth/Login";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import { Register } from "../features/auth/Register";
import { SharedTravelPlanPage } from "../features/Sharing";
import { TravelPlanDetails, TravelPlanList } from "../features/TravelPlan";
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
    path: routes.sharedTrip,
    element: <SharedTravelPlanPage />,
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
            element: <TravelPlanList />,
          },
          {
            path: routes.tripDetails,
            element: <TravelPlanDetails />,
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
