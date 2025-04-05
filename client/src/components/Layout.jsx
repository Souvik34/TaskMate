import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTokenExpiryWatcher from "../hooks/useTokenExpiryWatcher";
import { motion } from "framer-motion";

const Layout = () => {
  useTokenExpiryWatcher();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
      <ToastContainer />
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-screen-sm mx-auto mt-10 p-6 shadow-lg border border-gray-200 bg-white rounded-xl"
      >
        <Navigation />
        <div className="mt-6">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default Layout;
