'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { FaTachometerAlt, FaHome, FaPaw, FaUsers, FaHandHoldingUsd, FaChartBar, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useAuth } from '../../AuthProvider';
import { useRouter } from 'next/navigation';
const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const{logout} = useAuth() 
  const router = useRouter()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  function handleLogout(){
    logout()
    router.push('/login')
    
  }

  return (
    <>
      {/* Botão de Toggle para Mobile */}
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Abrir sidebar</span>
        <FaBars className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 bg-indigo-800`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700"
              >
                <FaTachometerAlt className="w-5 h-5 text-indigo-300 transition duration-75" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/shelters"
                className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700"
              >
                <FaHome className="w-5 h-5 text-indigo-300 transition duration-75" />
                <span className="flex-1 ml-3 whitespace-nowrap">Abrigos</span>
              </Link>
            </li>
            <li>
              <Link
                href="/pets"
                className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700"
              >
                <FaPaw className="w-5 h-5 text-indigo-300 transition duration-75" />
                <span className="flex-1 ml-3 whitespace-nowrap">Adotantes</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admins"
                className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700"
              >
                <FaUsers className="w-5 h-5 text-indigo-300 transition duration-75" />
                <span className="flex-1 ml-3 whitespace-nowrap">Admins</span>
              </Link>
            </li>

            <li>
              <button
                onClick={()=>handleLogout()}
                className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700"
              >
                <FaSignOutAlt className="w-5 h-5 text-indigo-300 transition duration-75" />
                <span className="flex-1 ml-3 whitespace-nowrap">Sair</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;