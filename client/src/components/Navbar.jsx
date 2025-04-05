import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
    <nav className="flex items-center justify-between bg-violet-600 text-white px-6 py-3 mb-4">
      <h1 className="text-2xl font-bold">TaskMate</h1>
      <div className="flex items-center gap-4">
        <span className="font-medium">{firstName}</span>
        <img
  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  alt="Profile"
  className="w-9 h-9 rounded-full border-2 border-white"
/>


        <button
          onClick={handleSignOut}
          className="bg-white text-violet-600 px-3 py-1 rounded font-semibold hover:bg-gray-100 transition"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
