import React, { useState } from 'react';
import { RxDashboard } from "react-icons/rx";
import { LuUsersRound } from "react-icons/lu";
import { GrProductHunt } from "react-icons/gr";
import { IoBagCheckOutline } from "react-icons/io5";
import { SiMaxplanckgesellschaft, SiSellfy } from "react-icons/si";

import Dashboard from './Dashboard';
import User from './User';
import Product from './Product';
import ShopKeeper from './ShopKeeper';
import Order from './Order';
import Sales from './Sales';

const AdminHome = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [activeMobileComponent, setActiveMobileComponent] = useState('Dashboard');

  const menuItems = [
    { icon: <RxDashboard />, label: 'Dashboard', component: 'Dashboard' },
    { icon: <LuUsersRound />, label: 'User', component: 'User' },
    { icon: <GrProductHunt />, label: 'Product', component: 'Product' },
    { icon: <SiSellfy />, label: 'Shopkeeper', component: 'ShopKeeper' },
    { icon: <IoBagCheckOutline />, label: 'Orders', component: 'Order' },
    { icon: <SiMaxplanckgesellschaft />, label: 'Sales', component: 'Sales' },
  ];

  const renderComponent = (component) => {
    switch (component) {
      case 'Dashboard': return <Dashboard />;
      case 'User': return <User />;
      case 'BlockUser': return <BlockUser />;
      case 'Product': return <Product />;
      case 'ProductToBeAccessed': return <ProductToBeAccessed />;
      case 'ShopKeeper': return <ShopKeeper />;
      case 'ActiveShopkeeper': return <ActiveShopkeeper />;
      case 'Order': return <Order />;
      case 'OrderPending': return <OrderPending />;
      case 'Sales': return <Sales />;
      default: return <Dashboard />;
    }
  };

  return (
    <div>
      {/* Desktop View */}
      <div className='md:flex hidden pt-18'>
        {/* Sidebar */}
        <div className='bg-white w-[18%] min-h-screen border-r px-4 py-2'>
          <h1 className='text-3xl font-bold py-2'>Admin</h1>
          <ul className='mt-4 font-semibold'>
            {menuItems.map((item, index) => (
              <li key={index} className='mb-2'>
                <button
                  className={`w-full flex items-center gap-3 text-[15px] capitalize justify-start py-2 px-3 rounded-md hover:bg-gray-200 
                  ${activeComponent === item.component ? 'bg-gray-300' : ''}`}
                  onClick={() => setActiveComponent(item.component)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className='flex-1 p-8 bg-gray-100'>{renderComponent(activeComponent)}</div>
      </div>

      {/* Mobile View */}
      <div className='md:hidden'>
        {/* Mobile Content */}
        <div className='p-4 bg-gray-100 min-h-screen'>
          {renderComponent(activeMobileComponent)}
        </div>

        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-between bg-gray-300 pt-4 pb-2 border-t border-gray-400 shadow-md z-50">
          {menuItems.map(({ icon, label, component }, key) => (
            <button
              key={key}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer hover:text-orange-700 transition-all 
              ${activeMobileComponent === component ? 'bg-gray-400' : ''}`}
              onClick={() => setActiveMobileComponent(component)}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default AdminHome;
