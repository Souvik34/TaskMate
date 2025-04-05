import React from "react";
import { NavLink } from "react-router-dom";
import { RouteIndex, RouteTodoList } from "../helper/RouteName";
import { motion } from "framer-motion";

const Navigation = () => {
  const baseButton =
    "py-2.5 px-5 text-sm font-medium rounded-lg border transition-all duration-200 shadow-sm";

  const inactiveButton =
    baseButton +
    " text-gray-900 bg-white border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200";

  const activeButton =
    baseButton +
    " text-white bg-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300";

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
