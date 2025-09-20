"use client";

import React from "react";
import Layout from "@/app/components/shared/layout/index";
import { FaFileInvoice, FaCalendarAlt, FaDollarSign, FaUser, FaTag, FaImage, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

function Page() {
    // Mock data da nota fiscal
    const notaFiscal = {
        tipo: "saida",
        data: "2025-09-18T10:00:00Z",
        valor: 320.00,
        descricao: "Compra de alimentos para evento social",
        categoria: "alimentação",
        responsavel: "joao.pereira",
        comprovanteUrl: "https://i.ibb.co/nNXxPMH0/151580-entenda-como-funcionam-os-creditos-da-nota-fiscal-paulista-para-pj.jpg",
        origemDestino: "Supermercado Central"
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                {/* Header com botão voltar */}
                <div className="mb-8">
                    <Link 
                        href="/contability/searchNote"
                        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
                    >
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                    </Link>
                    
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
                            <FaFileInvoice className="w-8 h-8 mr-3 text-indigo-600" />
                            Detalhes da Nota Fiscal
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Informações principais */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Informações Gerais</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Tipo */}
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <FaTag className="w-5 h-5 text-indigo-600 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-600">Tipo</p>
                                        <p className="font-semibold text-gray-800 capitalize">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                notaFiscal.tipo === 'saida' 
                                                    ? 'bg-red-100 text-red-800' 
                                                    : 'bg-green-100 text-green-800'
                                            }`}>
                                                {notaFiscal.tipo === 'saida' ? 'Saída' : 'Entrada'}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Data */}
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <FaCalendarAlt className="w-5 h-5 text-indigo-600 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-600">Data</p>
                                        <p className="font-semibold text-gray-800">{formatDate(notaFiscal.data)}</p>
                                    </div>
                                </div>

                                {/* Valor */}
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <FaDollarSign className="w-5 h-5 text-indigo-600 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-600">Valor</p>
                                        <p className="font-semibold text-gray-800 text-lg">{formatCurrency(notaFiscal.valor)}</p>
                                    </div>
                                </div>

                                {/* Responsável */}
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <FaUser className="w-5 h-5 text-indigo-600 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-600">Responsável</p>
                                        <p className="font-semibold text-gray-800">{notaFiscal.responsavel}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Descrição */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-2">Descrição</p>
                                <p className="text-gray-800">{notaFiscal.descricao}</p>
                            </div>

                            {/* Categoria e Origem/Destino */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-2">Categoria</p>
                                    <p className="font-semibold text-gray-800 capitalize">{notaFiscal.categoria}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-2">{notaFiscal.origemDestino == 'entrada' ? 'Origem' : 'Destino'}</p>
                                    <p className="font-semibold text-gray-800">{notaFiscal.origemDestino}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comprovante */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <FaImage className="w-5 h-5 mr-2 text-indigo-600" />
                                Comprovante
                            </h3>
                            
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <FaImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">Imagem da nota fiscal</p>
                                <a 
                                    href={notaFiscal.comprovanteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <FaImage className="w-4 h-4 mr-2" />
                                    Ver Comprovante
                                </a>
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações</h3>
                            <div className="space-y-3">
                                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors" disabled>
                                    Editar Nota
                                </button>
                                <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Page;