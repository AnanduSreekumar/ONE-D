import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <Hero />
      {console.log(import.meta.env.VITE_REACT_APP_USER_POOL_ID)}
    </>
  );
};

export default Home;
