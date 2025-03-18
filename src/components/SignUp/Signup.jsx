import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { SignUpSchema } from "./SignUpValidation";
import { LocalHost } from "../../GlobalURL";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../ToastifyNotification/Notofication";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaImage } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Signup({ setOtpVerify }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("userImg", file);
    }
  };

  const formik = useFormik({
    initialValues: { userImg: "", name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });

        const response = await axios.post(`${LocalHost}createUSer`, formData);
        if (response.status === 200 || response.status === 201) {
          showSuccessToast("Successfully signed up user");
          setOtpVerify(true);
          localStorage.setItem("UserMailId",response.data.email)
          navigate(`/otpverification/${response.data.id}`);
        }
      } catch (error) {
        showErrorToast(error.response?.data?.msg || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
  });


  const MENUDATA = [
    { name: "name", type: "text", placeholder: "Enter Your Name", icon: <FaUser /> },
    { name: "email", type: "email", placeholder: "Enter Your Email", icon: <FaEnvelope /> },
    { name: "password", type: "password", placeholder: "Enter Your Password", icon: <FaLock /> },
    { name: "confirmPassword", type: "password", placeholder: "Confirm Your Password", icon: <FaLock /> },
    { name: "userImg", type: "file", icon: <FaImage /> },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          {MENUDATA.map(({ name, type, placeholder, icon }, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">{icon}</span>
                <input
                  name={name}
                  type={
                    name === "password" ? (showPassword ? "text" : "password") :
                    name === "confirmPassword" ? (showConfirmPassword ? "text" : "password") : type
                  }
                  placeholder={placeholder}
                  onChange={name === "userImg" ? handleFileChange : formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border border-gray-300 rounded-md px-10 py-2 w-full focus:ring-2 focus:ring-blue-400"
                  {...(name !== "userImg" && { value: formik.values[name] })}
                />
                {(name === "password" || name === "confirmPassword") && (
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500"
                    onClick={() =>
                      name === "password"
                        ? setShowPassword(!showPassword)
                        : setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {name === "password" ? (showPassword ? <FaEyeSlash /> : <FaEye />) :
                      name === "confirmPassword" ? (showConfirmPassword ? <FaEyeSlash /> : <FaEye />) : null}
                  </button>
                )}
              </div>
              {formik.touched[name] && formik.errors[name] && (
                <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className={`w-full p-3 rounded-lg transition-all flex items-center justify-center ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="text-center mt-3">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}