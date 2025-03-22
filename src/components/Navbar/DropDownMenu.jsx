import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

export default function DropDownMenu() {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const UserIMG = localStorage.getItem('profileImg');

  const DROPDOWNMENUDATA = [
    { name: 'Your Profile', href: '/profile', icon: <FaUser className="size-4 mr-2" /> },
    { name: 'Settings', href: '/settings', icon: <FaCog className="size-4 mr-2" /> },
    { name: 'Logout', onClick: handleLogout, icon: <FaSignOutAlt className="size-4 mr-2" /> },
  ];

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            {UserIMG ? (
              <img className="size-8 rounded-full" src={UserIMG} alt="User Profile" />
            ) : (
              <FaUser className="size-8 text-white bg-gray-600 rounded-full p-1" />
            )}
          </MenuButton>
        </div>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          {DROPDOWNMENUDATA.map(({ name, href, onClick, icon }) => (
            <MenuItem key={name}>
              {onClick ? (
                <button
                  onClick={onClick}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {icon}
                  {name}
                </button>
              ) : (
                <Link to={href} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {icon}
                  {name}
                </Link>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
