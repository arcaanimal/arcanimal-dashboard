import React from "react";
import Sidebar from "../Sidebar";
import Link from "next/link";
import { useCheckAuthorization } from "@/app/hooks/auth/useCheckAutorization"; // <- importa seu hook
import "./layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data, isLoading } = useCheckAuthorization();

  console.log(data)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <span className="text-gray-700 text-lg">Carregando...</span>
      </div>
    );
  }

  if (!data?.success) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 backdrop-blur-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Acesso negado</h1>
          <p className="text-gray-600">Desculpe, você ainda não tem permissão para acessar essa página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden sm:block w-64 bg-white shadow-md flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <Sidebar />
            </div>
            <Link href="/dashboard">
              <h1 className="text-2xl font-bold text-gray-800">Arca Dashboard</h1>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 max-w-7xl mx-auto flex-1 overflow-auto hide-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
