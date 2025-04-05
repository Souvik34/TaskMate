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
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-md border-b border-white/20 backdrop-blur-md bg-gradient-to-r from-violet-200/40 via-blue-200/40 to-pink-200/40"
    >
    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-blue-500 to-pink-500 text-transparent bg-clip-text font-serif">
  TaskMate
</h1>


      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="font-bold text-base text-gray-800">{firstName}</p>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        />

        <button
          onClick={handleSignOut}
          className="bg-violet-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-violet-700 transition duration-200"
        >
          Sign out
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
