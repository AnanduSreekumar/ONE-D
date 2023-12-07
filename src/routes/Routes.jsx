import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Hero from "../components/Hero";
import Admin from "../pages/Admin/Admin";
import AHome from "../pages/Admin/AHome";
import ALogin from "../pages/Admin/Auth/ALogin";
import ARegister from "../pages/Admin/Auth/ARegister";
import CLogin from "../pages/Checker/Auth/CLogin";
import CRegister from "../pages/Checker/Auth/CRegister";
import Checker from "../pages/Checker/Checker";
import CHome from "../pages/Checker/CHome";
import Home from "../pages/Home";
import NLogin from "../pages/Notary/Auth/NLogin";
import NRegister from "../pages/Notary/Auth/NRegister";
import NHome from "../pages/Notary/NHome";
import Notary from "../pages/Notary/Notary";
import Login from "../pages/User/Auth/Login";
import Register from "../pages/User/Auth/Register";
import Create from "../pages/User/Create/Create";
import Dashboard from "../pages/User/Create/Dashboard";
import UserLogs from "../pages/User/UserLogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Hero />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/logs",
            element: <UserLogs />,
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
        ],
      },
      {
        path: "/notary",
        element: <Notary />,
        children: [
          {
            path: "/notary",
            element: <NHome />,
          },
          {
            path: "/notary/login",
            element: <NLogin />,
          },
          {
            path: "/notary/register",
            element: <NRegister />,
          },
        ],
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "/admin",
            element: <AHome />,
          },
          {
            path: "/admin/login",
            element: <ALogin />,
          },
          {
            path: "/admin/register",
            element: <ARegister />,
          },
        ],
      },
      {
        path: "/checker",
        element: <Checker />,
        children: [
          {
            path: "/checker",
            element: <CHome />,
          },
          {
            path: "/checker/login",
            element: <CLogin />,
          },
          {
            path: "/checker/register",
            element: <CRegister />,
          },
        ],
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
