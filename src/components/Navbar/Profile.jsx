import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaCamera } from "react-icons/fa";
import { useAuth } from "../Contexts/AuthContext";


const socialIcons = [
  { icon: FaFacebookF, color: "hover:text-blue-500" },
  { icon: FaInstagram, color: "hover:text-pink-600" },
  { icon: FaLinkedin, color: "hover:text-blue-400" },
  { icon: FaTwitter, color: "hover:text-blue-300" }
];

export default function Profile() {
  const { userData } = useAuth();
  const [profileImage, setProfileImage] = useState(userData?.UserImg);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || "Ravi Singh",
    email: userData?.email || "Ravi@gmail.com",
    bio: "Passionate designer & developer, creating stunning digital experiences."
  });
  console.log(formData)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
  };

  return (
    <div className="fixed inset-0  bg-gradient-to-br from-gray-900 to-gray-800 overflow-auto">
      <div className="flex h-full w-full">
        {/* Desktop Image Section */}
        <div className="hidden md:flex w-1/2 bg-black bg-opacity-30 items-center justify-center p-8">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-64 md:pt-2 pt-10 h-64 md:w-80 md:h-80 rounded-full object-cover border-8 border-white border-opacity-20 shadow-2xl"
            />
            <label className="absolute bottom-4 right-4 bg-gray-900 p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-all">
              <input type="file" className="hidden" onChange={handleImageChange} />
              <FaCamera className="text-white" />
            </label>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
          <div className="max-w-md w-full">
            {/* Name and Email */}
            <div className="mb-8">
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-3xl md:text-4xl font-bold text-white bg-transparent border-b border-gray-400 focus:outline-none w-full mb-4"
                    placeholder="Your Name"
                  />
                  <p className="text-xl text-gray-300">{formData.email}</p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{formData.name}</h1>
                  <p className="text-xl text-gray-300">{formData.email}</p>
                </>
              )}
            </div>

            {/* Bio */}
            <div className="mb-8">
              {editMode ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="text-gray-300 bg-transparent border border-gray-400 rounded-lg focus:outline-none w-full p-2 h-32"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-300 text-lg">{formData.bio}</p>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex space-x-6 mb-8">
              {socialIcons.map(({ icon: Icon, color }, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className={`text-gray-400 ${color} transition-colors`}
                >
                  <Icon className="text-2xl" />
                </a>
              ))}
            </div>

            {/* Edit/Save Button */}
            <button
              onClick={toggleEditMode}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg transition-all"
            >
              {editMode ? "Save Profile" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Mobile Image Section */}
        <div className="md:hidden absolute top-8 left-0 right-0 flex justify-center">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white border-opacity-20 shadow-lg"
            />
            <label className="absolute bottom-0 right-0 bg-gray-900 p-2 rounded-full cursor-pointer">
              <input type="file" className="hidden" onChange={handleImageChange} />
              <FaCamera className="text-white text-xs" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}