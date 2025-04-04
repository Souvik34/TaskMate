import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
        if (!token) {
          throw new Error("No token received from API");
        }

        localStorage.setItem("token", token);

        let timerInterval;
        Swal.fire({
          title: "Login Successful!",
          html: "Redirecting in <b>3</b> seconds...",
          timer: 3000,
          icon: "success",
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
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
            navigate("/dashboard/home");
          },
        });
      } catch (err) {
        console.error("🚨 Login Error:", err);

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
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          id={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          className={`mt-1 block w-full px-4 py-2 border ${
            formik.touched[name] && formik.errors[name]
              ? "border-red-500 ring-1 ring-red-500"
              : "border-gray-300"
          } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          autoComplete="off"
        />
        {type === "password" && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-10 flex items-center cursor-pointer text-gray-600"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </div>
        )}
        {formik.touched[name] && formik.errors[name] && (
          <div className="absolute inset-y-0 right-3 flex items-center text-red-500">
            <AlertCircle size={20} />
          </div>
        )}
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 font-semibold text-sm mt-1">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
          <h1 className="text-3xl font-bold text-blue-700 text-center">
            Sign in to TaskMate
          </h1>

          {renderInput("email", "email", "Email")}
          {renderInput("password", "password", "Password")}

          <button
            type="submit"
            className="w-full text-white bg-violet-600 hover:bg-violet-700 font-medium rounded-lg text-base px-5 py-2.5"
          >
            Sign in
          </button>

          <p className="text-base text-center text-gray-500">
            Don’t have an account yet?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signin;
