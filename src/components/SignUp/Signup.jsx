import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { SignUpSchema } from "./SignUpValidation";
import { LocalHost } from "../../GlobalURL";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../ToastifyNotification/Notofication";
import { Link } from "react-router-dom";
import { getCroppedImage } from "../ImageCrop/cropImageHelper";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import CropImage from "../ImageCrop/CropImage";

const INPUT_FIELDS = [
  { name: "name", type: "text", placeholder: "Enter Your Name", icon: <FaUser /> },
  { name: "email", type: "email", placeholder: "Enter Your Email", icon: <FaEnvelope /> },
  { name: "password", type: "password", placeholder: "Enter Your Password", icon: <FaLock /> },
  { name: "confirmPassword", type: "password", placeholder: "Confirm Your Password", icon: <FaLock /> },
];

export default function Signup({ setOtpVerify }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedFile, setCroppedFile] = useState(null);

  const formik = useFormik({
    initialValues: { userImg: "", name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      try {
        if (!croppedFile) {
          return;
        }
    
        setIsLoading(true);
        const formData = new FormData();
    
        Object.keys(values).forEach((key) => {
          if (key !== "userImg") formData.append(key, values[key]);
        });
    
        formData.append("userImg", croppedFile);
    
        const response = await axios.post(`${LocalHost}createUSer`, formData);
    
        if (response.status === 200 || response.status === 201) {
          showSuccessToast("Successfully signed up user");
          setOtpVerify(true);
          sessionStorage.setItem("UserMailId", response.data.email);
          navigate(`/otpverification/userLogin/${response.data.id}`);
        }
      } catch (error) {
        if (error.response?.data?.data?.isVerify) navigate('/login');
        else showErrorToast(error.response?.data?.msg || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    
  });

  const handleFileSelect = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropAndSetImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
  
    const croppedImageBlob = await getCroppedImage(imageSrc, croppedAreaPixels);
    if (!croppedImageBlob) return;
  
    const file = new File([croppedImageBlob], "cropped-image.jpg", { type: "image/jpeg" });
  
    setCroppedFile(file);
    formik.setFieldValue("userImg", file);
    setShowCropper(false);
    setImageSrc(null);
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Sign Up</h2>
        
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          {INPUT_FIELDS.map(({ name, type, placeholder, icon }, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">{icon}</span>
                <input
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="border border-gray-300 rounded-md px-10 py-2 w-full focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {formik.touched[name] && formik.errors[name] && (
                <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
              )}
            </div>
          ))}

          {/* Image Upload Field */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-semibold">Upload Profile Image</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-500"><FaImage /></span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                className="border border-gray-300 rounded-md px-10 py-2 w-full focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Image Cropper */}
          {imageSrc && showCropper && (
            <CropImage 
              imageSrc={imageSrc}
              onCropComplete={handleCropComplete}
              onCancel={() => setShowCropper(false)}
              onSave={handleCropAndSetImage}
            />
          )}

          {croppedFile && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(croppedFile)}
                alt="Cropped Preview"
                className="w-20 h-20 rounded-full mx-auto"
              />
            </div>
          )}

          <button
            type="submit"
            className={`w-full p-3 rounded-lg transition-all flex items-center justify-center ${
              isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
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
