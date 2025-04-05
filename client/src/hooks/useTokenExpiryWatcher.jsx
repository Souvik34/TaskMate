import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const useTokenExpiryWatcher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expiryTimeInMs = decoded.exp * 1000;
      const currentTimeInMs = Date.now();
      const timeUntilExpiry = expiryTimeInMs - currentTimeInMs;

      if (timeUntilExpiry <= 3000) {
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please sign in again.",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          willClose: () => {
            localStorage.removeItem("token");
            navigate("/");
          },
        });
      } else {
        const timeout = setTimeout(() => {
          Swal.fire({
            icon: "warning",
            title: "Session Expiring",
            text: "Redirecting to login...",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            willClose: () => {
              localStorage.removeItem("token");
              navigate("/");
            },
          });
        }, timeUntilExpiry - 3000);

        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.error("Invalid token", error);
    }
  }, [navigate]); 
};

export default useTokenExpiryWatcher;
