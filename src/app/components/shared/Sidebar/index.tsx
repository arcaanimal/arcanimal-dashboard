'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { FaTachometerAlt, FaHome, FaPaw, FaUsers, FaHandHoldingUsd, FaChartBar, FaCog, FaSignOutAlt, FaBars, FaCalculator, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../../AuthProvider';
import { useRouter } from 'next/navigation';
const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountingOpen, setIsAccountingOpen] = useState(false);
  const{logout} = useAuth() 
  const router = useRouter()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleAccounting = () => {
    setIsAccountingOpen(!isAccountingOpen);
  };


  function handleLogout(){
    logout()
    router.push('/login')
    
  }

  return (
    <>
      {/* Botão de Toggle para Mobile - só aparece no mobile */}
      <button
        type="button"
        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Abrir sidebar</span>
        <FaBars className="w-6 h-6" />
      </button>

      {/* Overlay para mobile quando sidebar está aberto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out bg-indigo-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:relative sm:translate-x-0 sm:z-auto`}
      >
        {/* Header do sidebar com botão fechar para mobile */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-700 sm:hidden">
          <h2 className="text-white font-semibold text-lg">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-indigo-700 p-2 rounded-lg"
          >
            <span className="sr-only">Fechar sidebar</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => setIsOpen(false)} // Fechar sidebar ao clicar em link no mobile
              >
                <FaTachometerAlt className="w-5 h-5 text-indigo-300 transition duration-75" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/shelters"
                className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => setIsOpen(false)}
              >
                <FaHome className="w-5 h-5 text-indigo-300 transition duration-75" />
                <span className="flex-1 ml-3 whitespace-nowrap">Abrigos</span>
              </Link>
            </li>
            <li>
              <Link
                href="/pets"
                className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => setIsOpen(false)}
              >
                <FaPaw className="w-5 h-5 text-indigo-300 transition duration-75" />
                <span className="flex-1 ml-3 whitespace-nowrap">Adotantes</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admins"
                className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => setIsOpen(false)}
              >
                <FaUsers className="w-5 h-5 text-indigo-300 transition duration-75" />
                <span className="flex-1 ml-3 whitespace-nowrap">Admins</span>
              </Link>
            </li>

            {/* Menu Contabilidade */}
            <li>
              <button
                onClick={toggleAccounting}
                className="flex items-center p-2 w-full text-white rounded-lg hover:bg-indigo-700"
              >
                <FaCalculator className="w-5 h-5 text-indigo-300 transition duration-75" />
                <span className="flex-1 ml-3 whitespace-nowrap text-left">Contabilidade</span>
                {isAccountingOpen ? (
                  <FaChevronDown className="w-4 h-4 text-indigo-300" />
                ) : (
                  <FaChevronRight className="w-4 h-4 text-indigo-300" />
                )}
              </button>
              
              {/* Submenu Contabilidade */}
              {isAccountingOpen && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <Link
                      href="/contability/registerNote"
                      className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700 text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="ml-3">Registrar NF's</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contability/reporting"
                      className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700 text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="ml-3">Prestação de Contas</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contability/searchNote"
                      className="flex items-center p-2 text-white rounded-lg hover:bg-indigo-700 text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="ml-3">Pesquisar NF</span>
                    </Link>
                  </li>
                </ul>
              )}
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