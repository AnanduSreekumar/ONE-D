import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}

export default App;
