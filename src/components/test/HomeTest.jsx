import React, { useState } from 'react';
import Dashboard from '../test/DashBoard';
import Product from '../test/Product';
import Sales from '../test/Sales';

export default function HomeTest() {

  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Product':
        return <Product />;
      case 'Sales':
        return <Sales />;
      default:
        return <Dashboard />;
    }
  };

  const MENU = [
    { label: 'Dashboard', component: 'Dashboard' },
    { label: 'Product', component: 'Product' },
    { label: 'Sales', component: 'Sales' },
  ]

  return (
    <div className="flex pt-14 items-center">

      {/* Left div */}
      <div className="w-1/4 p-4 bg-gray-200 min-h-screen">
        <h1 className="text-xl font-bold mb-4">Admin</h1>
        <ul>
          {
            MENU.map((item, index) => (
              <li className="cursor-pointer p-2 hover:bg-gray-300" key={index} onClick={() => setActiveComponent(item.component)}>{item.label}</li>
            ))
          }
        </ul>
      </div>

      {/* Right div */}
      <div className="w-3/4 p-4">
        {renderComponent()}
      </div>
    </div>
  );
}
