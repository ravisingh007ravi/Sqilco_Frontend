import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import DropDownMenu from "./DropDownMenu";
import Search from './Search'
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [log, setLogIn] = useState(true);

  const MENUDATA = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/service' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className='bg-gray-800 text-white shadow-md'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>

        {/* first div */}
        <div className='flex items-center gap-5'>
          <div className='text-2xl font-bold'>Logo</div>

          <ul className='hidden md:flex space-x-6'>
            {MENUDATA.map(({ name, href }, key) => (
              <li key={key}>
                <Link to={href} ><button className=' text-white font-semibold hover:text-gray-600 transition'>{name}</button></Link>
              </li>
            ))}
          </ul>
        </div>

        {/* second div */}
        <Search />


        {/* third div */}
        <div className='hidden md:flex items-center space-x-4'>
          {log ? (
            <Link to='/signup' >
              <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>Sign/LogIn</button>
            </Link>) : (<DropDownMenu />)
          }
        </div>



        {/* Mobile Menu Button */}
        <div className='md:hidden text-2xl cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <IoMdClose /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-gray-900 text-white py-4 absolute top-16 left-0 w-full shadow-lg'>
          <ul className='flex flex-col items-center space-y-4'>
            {MENUDATA.map(({ name, href }, key) => (
              <li key={key}>
                <Link to={href}><button className='hover:text-gray-400 text-white font-semibold transition'>{name}</button></Link>
              </li>
            ))}
            <Link to='/signup' ><button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>Sign/LogIn</button></Link>
          </ul>
        </div>
      )}
    </nav>
  );
}