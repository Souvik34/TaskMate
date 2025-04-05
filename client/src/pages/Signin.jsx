import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { signinSchema } from "../schemas/validationSchema";
import { zodToFormik } from "../utils/zodToFormik";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodToFormik(signinSchema),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/auth/signin",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const token = response.data.token || response.data.accessToken;
        if (!token) throw new Error("No token received from API");

        localStorage.setItem("token", token);

        let timerInterval;
        Swal.fire({
          title: "Login Successful!",
          html: "Redirecting in <b>3</b> seconds...",
          timer: 3000,
          icon: "success",
          showConfirmButton: false,
          allowOutsideClick: false,
          timerProgressBar: true,
          didOpen: () => {
            const b = Swal.getHtmlContainer().querySelector("b");
            let remaining = 3;
            timerInterval = setInterval(() => {
              remaining -= 1;
              if (b) b.textContent = remaining.toString();
            }, 1000);
          },
          willClose: () => {
            clearInterval(timerInterval);
            navigate("/dashboard/todo-list");
          },
        });
      } catch (err) {
        Swal.fire({
          title: "Login Failed",
          text: err.response?.data?.message || err.message || "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    },
  });

  const renderInput = (name, type, label) => (
    <div className="space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative group">
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          id={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className={`transition-all duration-200 ease-in-out w-full px-4 py-2 text-sm rounded-lg border shadow-sm focus:outline-none focus:ring-2 ${
            formik.touched[name] && formik.errors[name]
              ? "border-red-500 ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          autoComplete="off"
        />
        {type === "password" && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-10 flex items-center cursor-pointer text-gray-600"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </div>
        )}
        {formik.touched[name] && formik.errors[name] && (
          <div className="absolute inset-y-0 right-3 flex items-center text-red-500">
            <AlertCircle size={18} />
          </div>
        )}
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-sm text-red-500 font-medium">{formik.errors[name]}</p>
      )}
    </div>
  );

  return (
    <section className="bg-gradient-to-br from-blue-100 via-white to-violet-100 min-h-screen flex items-center justify-center">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in"
        style={{
          animation: "fade-in 0.5s ease-out both",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6 animate-slide-in"
          style={{
            animation: "slide-up 0.6s ease-out both",
          }}
          noValidate
        >
          <h1 className="text-3xl font-bold text-center text-violet-700">
            Sign in to TaskMate
          </h1>

          {renderInput("email", "email", "Email")}
          {renderInput("password", "password", "Password")}

          <button
            type="submit"
            className="w-full py-2.5 px-5 bg-violet-600 hover:bg-violet-700 text-white text-base font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
          >
            Sign in
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-violet-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0 }
            to { opacity: 1 }
          }

          @keyframes slide-up {
            from { transform: translateY(20px); opacity: 0 }
            to { transform: translateY(0); opacity: 1 }
          }
        `}
      </style>
    </section>
  );
};

export default Signin;
