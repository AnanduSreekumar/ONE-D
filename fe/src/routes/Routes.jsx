import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/Auth/Login";
import Create from "../pages/Create/Create";
import Register from "../pages/Auth/Register";
import Admin from "../pages/Admin/Admin";
import AdminHome from "../pages/Admin/AdminHome";
import AdminUserDetail from "../pages/Admin/AdminUserDetail";
import AdminUserCard from "../pages/Admin/AdminUserCard";
import Dashboard from "../pages/Dashboard";
import Notary from "../pages/Notary/Notary";
import NotaryLogin from "../pages/Notary/NotaryLogin";
import NotaryRegister from "../pages/Notary/NotaryRegister";
import NotaryDashboard from "../pages/Notary/NotaryDashboard";
import Checker from "../pages/Notary/Checker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "/admin",
            element: <AdminHome />,
          },
          {
            path: "/admin/:userId",
            element: <AdminUserDetail />,
          },
        ],
      },
      {
        path: "/notary",
        element: <Notary />,
        children: [
          {
            path: "/notary/login",
            element: <NotaryLogin />,
          },
          {
            path: "/notary/register",
            element: <NotaryRegister />,
          },
          {
            path: "/notary",
            element: <NotaryDashboard />,
          },
        ],
      },
      {
        path: "/checker",
        element: <Checker />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
