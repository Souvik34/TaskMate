import React from "react";
import { NavLink } from "react-router-dom";
import { RouteIndex, RouteTodoList } from "../helper/RouteName";
import { motion } from "framer-motion";

const Navigation = () => {
  const baseButton =
    "py-3 px-6 text-sm font-semibold rounded-xl border transition-all duration-200 shadow-md backdrop-blur-md";

  const inactiveButton =
    baseButton +
    " text-gray-800 bg-white/70 border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:ring-2 focus:ring-blue-200";

  const activeButton =
    baseButton +
    " text-white bg-gradient-to-r from-blue-600 to-violet-600 border-blue-700 hover:from-blue-700 hover:to-violet-700 focus:ring-2 focus:ring-blue-300";

  return (
    <motion.div
      className="pb-6 border-b border-gray-200 flex gap-4 items-center justify-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <NavLink
        to={RouteIndex}
        className={({ isActive }) => (isActive ? activeButton : inactiveButton)}
      >
        📝 Add Todo
      </NavLink>

      <NavLink
        to={RouteTodoList}
        className={({ isActive }) => (isActive ? activeButton : inactiveButton)}
      >
        📋 My Todo
      </NavLink>
    </motion.div>
  );
};

export default Navigation;
