import React from "react";
import axios from 'axios'
import { useFormik } from "formik";
import { UserSchema } from '../Validation/AllValidation'
import {LocalHost} from '../../GlobalURL'

export default function Signup() {

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: UserSchema, 
    onSubmit: async(values) => {
      
      const respode = await axios.post(`${LocalHost}createUSer`, values)
      console.log(respode)

    },
  });
  console.log(values)

  const INPUTDATA = [
    { name: "name", type: "text", placeholder: "Enter Your Name" },
    { name: "email", type: "email", placeholder: "Enter Your Email" },
    { name: "password", type: "password", placeholder: "Enter Your Password" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {INPUTDATA.map(({ name, type, placeholder }, index) => (
            <div key={index}>
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
              {touched[name] && errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}

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
