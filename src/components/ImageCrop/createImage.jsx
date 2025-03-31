import React, { useRef } from "react";
import { FaImage } from "react-icons/fa";

export default function CreateImage({ onFileSelect }) {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 text-gray-500"><FaImage /></span>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="border border-gray-300 rounded-md px-10 py-2 w-full text-gray-500 focus:ring-2 focus:ring-blue-400"
      >
        Upload Profile Image
      </button>
    </div>
  );
}
