"use client";

import React, { useState, useMemo } from "react";
import Layout from "@/app/components/shared/layout/index";
import { FaChartPie, FaChartBar, FaTable, FaEye, FaDownload, FaFilter, FaCalendarAlt, FaFileAlt } from "react-icons/fa";
import Link from "next/link";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface NotaFiscal {
    id: string;
    tipo: "entrada" | "saida";
    valor: number;
    categoria: string;
    linkNota: string;
    descricao: string;
    dataRegistro: string;
    responsavel: string;
    origemDestino: string;
}

function Page() {
    // Mock data
    const mockData = {
        "resumo": {
            "totalEntrada": 8500,
            "totalSaida": 600
        },
        "pieChart": {
            "entrada": {
                "doações": 500,
                "investimentos": 5000,
                "outros": 3000
            },
            "saida": {
                "alimentação": 200,
                "viagem": 400
            }
        },
        "barChart": {
            "entrada": {
                "jan": 200,
                "fev": 300,
                "mar": 499
            },
            "saida": {
                "jan": 200,
                "fev": 300,
                "mar": 499
            }
        },
        "tabela": [
            {
                "id": "1",
                "tipo": "entrada" as const,
                "valor": 500,
                "categoria": "doações",
                "linkNota": "https://exemplo.com/notas/1.pdf",
                "descricao": "Doação mensal da empresa ABC",
                "dataRegistro": "2025-01-10",
                "responsavel": "João Silva",
                "origemDestino": "Empresa ABC"
            },
            {
                "id": "2",
                "tipo": "saida" as const,
                "valor": 200,
                "categoria": "alimentação",
                "linkNota": "https://exemplo.com/notas/2.pdf",
                "descricao": "Compra de alimentos para abrigo",
                "dataRegistro": "2025-01-15",
                "responsavel": "Maria Souza",
                "origemDestino": "Supermercado Central"
            },
            {
                "id": "3",
                "tipo": "entrada" as const,
                "valor": 5000,
                "categoria": "investimentos",
                "linkNota": "https://exemplo.com/notas/3.pdf",
                "descricao": "Investimento externo para novo projeto",
                "dataRegistro": "2025-02-01",
                "responsavel": "Carlos Oliveira",
                "origemDestino": "Investidor XP"
            },
            {
                "id": "4",
                "tipo": "saida" as const,
                "valor": 400,
                "categoria": "viagem",
                "linkNota": "https://exemplo.com/notas/4.pdf",
                "descricao": "Deslocamento para evento em outra cidade",
                "dataRegistro": "2025-02-10",
                "responsavel": "Ana Dias",
                "origemDestino": "Ônibus RJ-SP"
            },
            {
                "id": "5",
                "tipo": "entrada" as const,
                "valor": 3000,
                "categoria": "outros",
                "linkNota": "https://exemplo.com/notas/5.pdf",
                "descricao": "Contribuição avulsa via Pix",
                "dataRegistro": "2025-03-05",
                "responsavel": "Equipe Financeira",
                "origemDestino": "PIX Anônimo"
            }
        ]
    };

    // Estados para filtros
    const [filtroTipo, setFiltroTipo] = useState<"todos" | "entrada" | "saida">("todos");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");

    // Filtrar dados da tabela
    const dadosFiltrados = useMemo(() => {
        return mockData.tabela.filter(item => {
            // Filtro por tipo
            if (filtroTipo !== "todos" && item.tipo !== filtroTipo) {
                return false;
            }

            // Filtro por data
            if (dataInicio && item.dataRegistro < dataInicio) {
                return false;
            }
            if (dataFim && item.dataRegistro > dataFim) {
                return false;
            }

            return true;
        });
    }, [filtroTipo, dataInicio, dataFim]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    const handleExportPDF = () => {
        alert("Funcionalidade de exportar PDF será implementada");
    };

    const handleExportCSV = () => {
        const headers = ["ID", "Tipo", "Valor", "Categoria", "Descrição", "Data", "Responsável", "Origem/Destino"];
        const csvContent = [
            headers.join(","),
            ...dadosFiltrados.map(item => [
                item.id,
                item.tipo,
                item.valor,
                item.categoria,
                `"${item.descricao}"`,
                item.dataRegistro,
                `"${item.responsavel}"`,
                `"${item.origemDestino}"`
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "relatorio_notas_fiscais.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Dados para os gráficos
    const pieDataEntrada = Object.entries(mockData.pieChart.entrada).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        formatted: formatCurrency(value)
    }));
    
    const pieDataSaida = Object.entries(mockData.pieChart.saida).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        formatted: formatCurrency(value)
    }));

    const barDataMeses = Object.keys(mockData.barChart.entrada);
    const barData = barDataMeses.map((mes: string) => ({
        mes: mes.charAt(0).toUpperCase() + mes.slice(1),
        entrada: mockData.barChart.entrada[mes as keyof typeof mockData.barChart.entrada],
        saida: mockData.barChart.saida[mes as keyof typeof mockData.barChart.saida]
    }));

    // Cores para os gráficos
    const COLORS_ENTRADA = ['#10B981', '#059669', '#047857', '#065F46'];
    const COLORS_SAIDA = ['#EF4444', '#DC2626', '#B91C1C', '#991B1B'];

    // Custom label para pie chart
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
        if (percent < 0.05) return null; // Não mostrar labels muito pequenas
        
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text 
                x={x} 
                y={y} 
                fill="white" 
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central"
                fontSize="12"
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Título */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center mb-2">
                        <FaChartBar className="w-8 h-8 mr-3 text-indigo-600" />
                        Relatórios Financeiros
                    </h1>
                    <p className="text-gray-600">Análise detalhada das movimentações financeiras</p>
                </div>

                {/* Cards de Resumo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-full">
                                <FaChartPie className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Total Entradas</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatCurrency(mockData.resumo.totalEntrada)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-red-100 rounded-full">
                                <FaChartPie className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Total Saídas</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {formatCurrency(mockData.resumo.totalSaida)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <FaChartBar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-600">Saldo Atual</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {formatCurrency(mockData.resumo.totalEntrada - mockData.resumo.totalSaida)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gráficos - Ocultos no mobile */}
                <div className="hidden lg:block">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {/* Pie Chart Entradas */}
                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <FaChartPie className="w-5 h-5 mr-2 text-green-600" />
                                Distribuição de Entradas
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={pieDataEntrada}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={70}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieDataEntrada.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS_ENTRADA[index % COLORS_ENTRADA.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-2">
                                {pieDataEntrada.map((item, index) => (
                                    <div key={item.name} className="flex justify-between items-center p-2 bg-green-50 rounded text-sm">
                                        <div className="flex items-center">
                                            <div 
                                                className="w-3 h-3 rounded mr-2 flex-shrink-0" 
                                                style={{ backgroundColor: COLORS_ENTRADA[index % COLORS_ENTRADA.length] }}
                                            ></div>
                                            <span className="font-medium text-gray-700 truncate">{item.name}</span>
                                        </div>
                                        <span className="text-green-600 font-bold ml-2">{item.formatted}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pie Chart Saídas */}
                        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <FaChartPie className="w-5 h-5 mr-2 text-red-600" />
                                Distribuição de Saídas
                            </h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={pieDataSaida}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={70}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieDataSaida.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS_SAIDA[index % COLORS_SAIDA.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="mt-4 space-y-2">
                                {pieDataSaida.map((item, index) => (
                                    <div key={item.name} className="flex justify-between items-center p-2 bg-red-50 rounded text-sm">
                                        <div className="flex items-center">
                                            <div 
                                                className="w-3 h-3 rounded mr-2 flex-shrink-0" 
                                                style={{ backgroundColor: COLORS_SAIDA[index % COLORS_SAIDA.length] }}
                                            ></div>
                                            <span className="font-medium text-gray-700 truncate">{item.name}</span>
                                        </div>
                                        <span className="text-red-600 font-bold ml-2">{item.formatted}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Gráfico de Barras */}
                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <FaChartBar className="w-5 h-5 mr-2 text-indigo-600" />
                            Movimentação Mensal - Entradas vs Saídas
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={barData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                                <Legend />
                                <Bar dataKey="entrada" fill="#10B981" name="Entradas" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="saida" fill="#EF4444" name="Saídas" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Filtros */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FaFilter className="w-5 h-5 mr-2 text-indigo-600" />
                        Filtros
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                            <select
                                value={filtroTipo}
                                onChange={(e) => setFiltroTipo(e.target.value as any)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="todos">Todos</option>
                                <option value="entrada">Apenas Entradas</option>
                                <option value="saida">Apenas Saídas</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Data Início</label>
                            <input
                                type="date"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Data Fim</label>
                            <input
                                type="date"
                                value={dataFim}
                                onChange={(e) => setDataFim(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setFiltroTipo("todos");
                                    setDataInicio("");
                                    setDataFim("");
                                }}
                                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabela */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                            <FaTable className="w-5 h-5 mr-2 text-indigo-600" />
                            Notas Fiscais ({dadosFiltrados.length})
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origem/Destino</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {dadosFiltrados.map((item) => (
                                    <tr key={item.id} className={`hover:opacity-90 transition-opacity ${
                                        item.tipo === 'entrada' 
                                            ? 'bg-green-50 hover:bg-green-100' 
                                            : 'bg-red-50 hover:bg-red-100'
                                    }`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{item.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                item.tipo === 'entrada' 
                                                    ? 'bg-green-200 text-green-800 border border-green-300' 
                                                    : 'bg-red-200 text-red-800 border border-red-300'
                                            }`}>
                                                {item.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                                            item.tipo === 'entrada' ? 'text-green-700' : 'text-red-700'
                                        }`}>
                                            {formatCurrency(item.valor)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize font-medium">
                                            {item.categoria}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate font-medium">
                                            {item.descricao}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                                            {formatDate(item.dataRegistro)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                                            {item.responsavel}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                                            {item.origemDestino}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link
                                                href={`/contability/searchNote/${item.id}`}
                                                className="text-indigo-600 hover:text-indigo-900 inline-flex items-center font-semibold"
                                            >
                                                <FaEye className="w-4 h-4 mr-1" />
                                                Ver
                                            </Link>
                                            <a
                                                href={item.linkNota}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-900 inline-flex items-center ml-2 font-semibold"
                                            >
                                                <FaFileAlt className="w-4 h-4 mr-1" />
                                                Nota
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Botões de Exportação */}
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={handleExportPDF}
                        className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <FaDownload className="w-4 h-4 mr-2" />
                        Salvar PDF
                    </button>
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <FaDownload className="w-4 h-4 mr-2" />
                        Salvar CSV
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default Page;