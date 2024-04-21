import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import MainLayout from "../layout/layout/MainLayout";
import Loadable from '../layout/ui-component/Loadable';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DashboardDefault />,
      },
    ],
  },
]);
