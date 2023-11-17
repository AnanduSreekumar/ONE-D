import React, { useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Create from "../pages/Create/Create";

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
        element: <Signup />,
      },
      {
        path: "/create",
        element: <Create />,
      },
    ],
  },
]);

const Routes = () => {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <AuthContext.Provider value={value}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default Routes;
