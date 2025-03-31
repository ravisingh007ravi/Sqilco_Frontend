import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { showSuccessToast, showErrorToast } from "../ToastifyNotification/Notofication";
import { LocalHost } from "../../GlobalURL";
import { LoginSchema } from "./LogInValidation";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";


export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setIsLoggedIn, setUserImage, setUserData } = useAuth();

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
      
        const response = await axios.post(`${LocalHost}loginUser`, values);
        

        if (response.status === 200) {
          showSuccessToast("Successfully Logged In");
          setIsLoggedIn(true);
          setUserImage(response.data.profileImage)

          localStorage.setItem("Usertoken", response.data.token);
          localStorage.setItem("userId", response.data.id);

          setUserData({
            name: response.data.name,
            email: response.data.email,
            UserImg: response.data.profileImage
          })
          navigate("/");
        }
      } catch (error) {
        
        if (error.response.data.msg == 'User Not Found') {
          showErrorToast(error.response?.data?.msg);
          navigate(`/signup`);
        }
        else if (error.response.data.msg == 'Wrong Password') { showErrorToast(error.response?.data?.msg); }

        else if (!error.response.data.data.isVerify) {
          navigate(`/otpverification/userLogin/${error.response.data.data._id}`);
        }
        else showErrorToast(error.response?.data?.msg || "Invalid Credentials");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const INPUT_FIELDS = [
    { name: "email", type: "email", placeholder: "Enter Your Email", icon: <FaEnvelope /> },
    { name: "password", type: "password", placeholder: "Enter Your Password", icon: <FaLock /> },
  ];

  const AdminAPI = async () => {
    try {
      setIsAdminLoading(true);
      const AdminURL = `${LocalHost}LogInAdmin`;
      const response = await axios.post(AdminURL, values);

      console.log(response);
      if (response.status === 200) {
        showSuccessToast("Successfully Logged In");
        navigate("/adminHome");
      }
    }
    catch (error) {
      showErrorToast(error.response?.data?.msg || "Something went wrong");
    }
    finally {
      setIsAdminLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {INPUT_FIELDS.map(({ name, type, placeholder, icon }, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">{icon}</span>
                <input
                  name={name}
                  type={name === "password" ? (showPassword ? "text" : "password") : type}
                  placeholder={placeholder}
                  value={values[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="border border-gray-300 rounded-md px-10 py-2 w-full focus:ring-2 focus:ring-blue-400"
                />
                {name === "password" && (
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div>
              {touched[name] && errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
            </div>
          ))}

          <button
            type="submit"
            className={`w-full p-3 rounded-lg transition-all flex items-center justify-center ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>

          <button
            onClick={AdminAPI}
            type="submit"
            className={`w-full p-3 rounded-lg transition-all flex items-center justify-center ${isAdminLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            disabled={isAdminLoading}
          >
            {isAdminLoading ? "Logging In..." : "Admin"}
          </button>

          <div className="text-center mt-3">
            <p className="text-sm text-gray-600">
              Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <Link to="/reset-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
