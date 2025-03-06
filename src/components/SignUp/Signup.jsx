import React, { useState } from "react";

export default function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const objectData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    console.log("Submitted Data:", data);
  };

  const INPUTDATA = [
    { name: 'name', type: 'text', placeholder: 'Enter Your Name' },
    { name: 'email', type: 'email', placeholder: 'Enter Your Email' },
    { name: 'password', type: 'password', placeholder: 'Enter Your Password' },
  ]



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {
            INPUTDATA.map(({ name, type, placeholder }, index) => (
              <input onChange={objectData} name={name} type={type} placeholder={placeholder} key={index}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

            ))
          }

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}