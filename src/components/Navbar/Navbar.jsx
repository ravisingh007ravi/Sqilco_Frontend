import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import DropDownMenu from "./DropDownMenu";
import Search from './Search'
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const MENUDATA = [
    { name: 'Home', href: '/', CSS: 'text-red-100' },
    { name: 'About', href: '/about', CSS: 'text-green-100' },
    { name: 'Services', href: '/service', CSS: 'text-pink-100' },
    { name: 'Contact', href: '/contact', CSS: 'text-red-100' },
  ];

  return (
    <nav className='fixed w-full top-0 z-50 bg-gray-800 text-white shadow-md'>
      <div className='max-w-10xl mx-auto px-6 py-4 flex justify-between items-center'>

        {/* first div */}
        <div className='flex items-center gap-10'>
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
        <div className='hidden md:flex'>
          <Search />
        </div>

        {/* third div */}
        <div className=' items-center space-x-4'>
          {isLoggedIn ? (
            <DropDownMenu className='pl-32' />
          ) : (
            <Link to='/login'>
              <button className='hidden md:flex px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>
                Sign/LogIn
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}

        <div className='flex gap-5 md:hidden mr-8'>

          <div className=' text-2xl cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoMdClose /> : <FaBars />}
          </div>

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
            {!isLoggedIn && (
              <Link to='/login'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>
                  Sign/LogIn
                </button>
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
