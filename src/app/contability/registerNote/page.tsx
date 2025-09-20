"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/app/components/shared/layout/index";
import { FaFileInvoice, FaArrowUp, FaArrowDown, FaUpload, FaCalendarAlt, FaDollarSign, FaUser, FaTag, FaFileAlt } from "react-icons/fa";

type TipoNota = 'entrada' | 'saida' | null;

interface FormData {
    valor: string;
    categoria: string;
    responsavel: string;
    origemDestino: string;
    descricao: string;
    dataOcorrencia: string;
    comprovante: File | null;
}

function Page() {
    const [tipoNota, setTipoNota] = useState<TipoNota>(null);
    const [formData, setFormData] = useState<FormData>({
        valor: '',
        categoria: '',
        responsavel: '',
        origemDestino: '',
        descricao: '',
        dataOcorrencia: '',
        comprovante: null
    });
    const [previewUrl, setPreviewUrl] = useState<string>('');

    // Buscar o nome do usuário do localStorage
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                setFormData(prev => ({
                    ...prev,
                    responsavel: user.name || ''
                }));
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                comprovante: file
            }));
            
            // Criar preview da imagem
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const notaData = {
            tipo: tipoNota,
            ...formData,
            dataOcorrencia: new Date(formData.dataOcorrencia).toISOString()
        };
        
        console.log('Dados da nota:', notaData);
        // Aqui você fará a chamada para a API
        alert(`Nota de ${tipoNota} registrada com sucesso!`);
        
        // Reset do formulário
        resetForm();
    };

    const resetForm = () => {
        // Manter o responsável ao resetar o formulário
        const userData = localStorage.getItem('user');
        let responsavelAtual = '';
        
        if (userData) {
            try {
                const user = JSON.parse(userData);
                responsavelAtual = user.name || '';
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        }

        setFormData({
            valor: '',
            categoria: '',
            responsavel: responsavelAtual,
            origemDestino: '',
            descricao: '',
            dataOcorrencia: '',
            comprovante: null
        });
        setPreviewUrl('');
        setTipoNota(null);
    };

    const categorias = [
        'alimentação',
        'medicamentos',
        'equipamentos',
        'serviços veterinários',
        'manutenção',
        'transporte',
        'doações',
        'eventos',
        'outros'
    ];

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                {/* Título */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center mb-4">
                        <FaFileInvoice className="w-8 h-8 mr-3 text-indigo-600" />
                        Registrar Nota Fiscal
                    </h1>
                </div>

                {!tipoNota ? (
                    /* Seleção do tipo de nota */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <button
                            onClick={() => setTipoNota('saida')}
                            className="p-8 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-red-400 hover:shadow-lg transition-all group"
                        >
                            <FaArrowUp className="w-12 h-12 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Registrar Saída</h3>
                            <p className="text-gray-600">Registrar gastos e despesas</p>
                        </button>

                        <button
                            onClick={() => setTipoNota('entrada')}
                            className="p-8 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-green-400 hover:shadow-lg transition-all group"
                        >
                            <FaArrowDown className="w-12 h-12 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Registrar Entrada</h3>
                            <p className="text-gray-600">Registrar receitas e doações</p>
                        </button>
                    </div>
                ) : (
                    /* Formulário */
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                {tipoNota === 'saida' ? (
                                    <><FaArrowUp className="w-5 h-5 text-red-500 mr-2" /> Registrar Saída</>
                                ) : (
                                    <><FaArrowDown className="w-5 h-5 text-green-500 mr-2" /> Registrar Entrada</>
                                )}
                            </h2>
                            <button
                                onClick={() => setTipoNota(null)}
                                className="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                            >
                                Voltar
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Formulário principal */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Campos do formulário - 2/3 da tela */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Linha 1: Valor e Data */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                <FaDollarSign className="w-4 h-4 mr-2 text-indigo-600" />
                                                Valor
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                name="valor"
                                                value={formData.valor}
                                                onChange={handleInputChange}
                                                placeholder="0,00"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                <FaCalendarAlt className="w-4 h-4 mr-2 text-indigo-600" />
                                                Data da Ocorrência
                                            </label>
                                            <input
                                                type="datetime-local"
                                                name="dataOcorrencia"
                                                value={formData.dataOcorrencia}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Linha 2: Categoria e Responsável */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                <FaTag className="w-4 h-4 mr-2 text-indigo-600" />
                                                Categoria
                                            </label>
                                            <select
                                                name="categoria"
                                                value={formData.categoria}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                required
                                            >
                                                <option value="">Selecione uma categoria</option>
                                                {categorias.map(cat => (
                                                    <option key={cat} value={cat} className="capitalize">{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                <FaUser className="w-4 h-4 mr-2 text-indigo-600" />
                                                Responsável
                                            </label>
                                            <input
                                                type="text"
                                                name="responsavel"
                                                value={formData.responsavel}
                                                placeholder="Nome do responsável"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed focus:outline-none"
                                                disabled
                                                readOnly
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Este campo é preenchido automaticamente com seu nome
                                            </p>
                                        </div>
                                    </div>

                                    {/* Linha 3: Origem/Destino */}
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <FaTag className="w-4 h-4 mr-2 text-indigo-600" />
                                            {tipoNota === 'saida' ? 'Destino' : 'Origem'}
                                        </label>
                                        <input
                                            type="text"
                                            name="origemDestino"
                                            value={formData.origemDestino}
                                            onChange={handleInputChange}
                                            placeholder={tipoNota === 'saida' ? 'Para onde foi o dinheiro?' : 'De onde veio o dinheiro?'}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>

                                    {/* Linha 4: Descrição */}
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <FaFileAlt className="w-4 h-4 mr-2 text-indigo-600" />
                                            Descrição
                                        </label>
                                        <textarea
                                            name="descricao"
                                            value={formData.descricao}
                                            onChange={handleInputChange}
                                            placeholder="Descreva os detalhes da transação..."
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Upload de comprovante - 1/3 da tela */}
                                <div className="lg:col-span-1">
                                    <div className="bg-gray-50 rounded-lg p-6">
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
                                            <FaUpload className="w-4 h-4 mr-2 text-indigo-600" />
                                            Comprovante da Nota
                                        </label>

                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            {previewUrl ? (
                                                <div className="space-y-4">
                                                    <img 
                                                        src={previewUrl} 
                                                        alt="Preview" 
                                                        className="max-w-full h-48 object-contain mx-auto rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setPreviewUrl('');
                                                            setFormData(prev => ({ ...prev, comprovante: null }));
                                                        }}
                                                        className="text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                        Remover imagem
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <FaUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                    <p className="text-gray-600 mb-4">
                                                        Clique para fazer upload da nota fiscal
                                                    </p>
                                                </div>
                                            )}
                                            
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                id="comprovante"
                                            />
                                            <label
                                                htmlFor="comprovante"
                                                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
                                            >
                                                {previewUrl ? 'Alterar imagem' : 'Selecionar arquivo'}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botão de submit - agora fora do grid e depois do comprovante */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition-colors ${
                                        tipoNota === 'saida' 
                                            ? 'bg-red-600 hover:bg-red-700' 
                                            : 'bg-green-600 hover:bg-green-700'
                                    }`}
                                >
                                    {tipoNota === 'saida' ? 'Cadastrar Saída' : 'Cadastrar Entrada'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Page;