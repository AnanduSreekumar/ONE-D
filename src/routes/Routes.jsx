import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/User/Auth/Login";
import Create from "../pages/User/Create/Create";
import Register from "../pages/User/Auth/Register";
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
import NotaryForm from "../pages/Notary/NotaryForm";

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
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
