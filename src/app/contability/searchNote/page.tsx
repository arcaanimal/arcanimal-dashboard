"use client";

import React, { useState } from "react";
import Layout from "@/app/components/shared/layout/index";
import { FaSearch, FaFileInvoice } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Page() {
    const [searchId, setSearchId] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchId.trim()) {
            router.push(`/contability/searchNote/${searchId.trim()}`);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-full max-w-md mx-auto text-center">
                    {/* Título */}
                    <div className="mb-8">
                        <FaFileInvoice className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Pesquisar Nota Fiscal
                        </h1>
                        <p className="text-gray-600">
                            Digite o ID da nota fiscal para visualizar os detalhes
                        </p>
                    </div>

                    {/* Formulário de busca */}
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                placeholder="Digite o ID da nota fiscal..."
                                className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-colors"
                            />
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={!searchId.trim()}
                            className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                            Pesquisar Nota
                        </button>
                    </form>

                    {/* Informação adicional */}
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                            <strong>Dica:</strong> O ID da nota fiscal geralmente é um código alfanumérico único.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Page;