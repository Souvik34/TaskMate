import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTokenExpiryWatcher from "../hooks/useTokenExpiryWatcher"; 

const Layout = () => {
  useTokenExpiryWatcher(); 

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="max-w-screen-sm mx-auto mt-10 p-5 shadow-sm border rounded">
        <Navigation />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
