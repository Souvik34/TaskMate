import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const fullName = decoded?.username || decoded?.name || "User";
        const first = fullName.split(" ")[0];
        setFirstName(first);
      } catch {
        console.error("Invalid token");
        setFirstName("User");
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between bg-violet-700 text-white px-6 py-4 shadow-md"
    >
      <h1 className="text-2xl font-bold tracking-wide">🚀 TaskMate</h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-base">{firstName}</p>
      
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        />

        <button
          onClick={handleSignOut}
          className="bg-white text-violet-700 font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition duration-200"
        >
          Sign out
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
