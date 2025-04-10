import { useFormik } from "formik";
import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../schemas/validationSchema";
import { zodToFormik } from "../utils/zodToFormik";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodToFormik(signupSchema),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setErrorMessage("");

        const { data } = await axios.post(
          "http://localhost:4000/api/v1/auth/signup",
          values,
          { withCredentials: true }
        );

        console.log("Signup Success:", data);

        let timerInterval;
        Swal.fire({
          title: "Signup Successful!",
          html: "Redirecting in <b>3</b> seconds...",
          icon: "success",
          timer: 3000,
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
            navigate("/signin");
          },
        });
      } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);

        Swal.fire({
          title: "Signup Failed",
          text: error.response?.data?.message || "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#d33",
        });

        setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const renderInput = (name, type, label) => (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
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
          className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none transition duration-150 ${
            formik.touched[name] && formik.errors[name]
              ? "border-red-500 ring-1 ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          }`}
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
        <p className="text-red-500 text-sm font-semibold mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );

  return (
    <section className="bg-gradient-to-br from-violet-100 to-indigo-200 min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-violet-700 tracking-tight">Create an account</h1>
          <p className="text-sm text-gray-500 mt-1">Start your journey with TaskMate 🚀</p>
        </div>

        {errorMessage && (
          <p className="text-red-500 font-semibold text-sm text-center mb-3">
            {errorMessage}
          </p>
        )}

        <form className="space-y-6" onSubmit={formik.handleSubmit} noValidate>
          {renderInput("username", "text", "Username")}
          {renderInput("email", "email", "Email")}
          {renderInput("password", "password", "Password")}
          {renderInput("confirmPassword", "password", "Confirm Password")}

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full text-white bg-violet-600 hover:bg-violet-700 active:scale-95 font-semibold rounded-lg text-base px-5 py-2.5 transition-all duration-200 shadow-sm"
          >
            {formik.isSubmitting ? "Creating account..." : "Create account"}
          </motion.button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-violet-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default Signup;
