import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaDribbble, FaCamera } from "react-icons/fa";

export default function Profile() {
  const [name, setName] = useState("Olivia Morgan");
  const [email, setEmail] = useState("@oliviamorgan");
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [editMode, setEditMode] = useState(false);

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-xl p-6 w-80 text-center border border-gray-200/30">
        
        {/* Profile Image */}
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          <label className="absolute bottom-0 right-0 bg-gray-900 p-2 rounded-full cursor-pointer">
            <input type="file" className="hidden" onChange={handleImageChange} />
            <FaCamera className="text-white text-xs" />
          </label>
        </div>

        {/* Editable Name & Email */}
        <div className="mt-4">
          {editMode ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg font-semibold text-white bg-transparent border-b border-gray-400 focus:outline-none text-center"
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm text-gray-300 bg-transparent border-b border-gray-400 focus:outline-none text-center mt-1"
              />
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white">{name}</h2>
              <p className="text-gray-300 text-sm">{email}</p>
            </>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 mt-4">
          <FaDribbble className="text-gray-400 hover:text-pink-500 cursor-pointer text-lg transition-all" />
          <FaFacebookF className="text-gray-400 hover:text-blue-500 cursor-pointer text-lg transition-all" />
          <FaInstagram className="text-gray-400 hover:text-purple-500 cursor-pointer text-lg transition-all" />
          <FaTwitter className="text-gray-400 hover:text-blue-400 cursor-pointer text-lg transition-all" />
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mt-4 px-4">
          Passionate designer & developer, creating stunning digital experiences.
        </p>

        {/* Edit & Save Button */}
        <button
          onClick={toggleEditMode}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 mt-4 rounded-full shadow-md transition-all"
        >
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
}
