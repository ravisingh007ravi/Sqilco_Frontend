import React from 'react';
import { IoSearch } from "react-icons/io5";

export default function Search() {
    return (
        <div className="relative w-full max-w-xs">

            <input type="text" placeholder="Search..."
                className="w-full rounded-lg bg-gray-700 px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400" />

        </div>
        
    );
}
    

