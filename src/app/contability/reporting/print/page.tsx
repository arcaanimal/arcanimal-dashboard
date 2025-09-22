"use client";

import React, { useState, useMemo, useEffect } from "react";
import { FaChartPie, FaChartBar, FaTable } from "react-icons/fa";
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

function PrintPage() {
    // Estado para controlar renderização dos gráficos (evita problemas de hidratação)
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

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
            },            {
                "id": "5",
                "tipo": "entrada" as const,
                "valor": 3000,
                "categoria": "outros",
                "linkNota": "https://exemplo.com/notas/5.pdf",
                "descricao": "Contribuição avulsa via Pix",
                "dataRegistro": "2025-03-05",
                "responsavel": "Equipe Financeira",
                "origemDestino": "PIX Anônimo"
            },            {
                "id": "5",
                "tipo": "entrada" as const,
                "valor": 3000,
                "categoria": "outros",
                "linkNota": "https://exemplo.com/notas/5.pdf",
                "descricao": "Contribuição avulsa via Pix",
                "dataRegistro": "2025-03-05",
                "responsavel": "Equipe Financeira",
                "origemDestino": "PIX Anônimo"
            },            {
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

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
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
        if (percent < 0.05) return null;
        
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
        <div className="min-h-screen bg-white p-8" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Título do Relatório */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Relatório Financeiro - Arca Dashboard
                </h1>
                <p className="text-gray-600">
                    Período: Janeiro a Março 2025 | Gerado em {new Date().toLocaleDateString('pt-BR')}
                </p>
            </div>

            {/* Cards de Resumo */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Total Entradas</h3>
                    <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(mockData.resumo.totalEntrada)}
                    </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Total Saídas</h3>
                    <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(mockData.resumo.totalSaida)}
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Saldo Atual</h3>
                    <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(mockData.resumo.totalEntrada - mockData.resumo.totalSaida)}
                    </p>
                </div>
            </div>

            {/* Gráficos */}
            {isClient && (
                <div className="space-y-8">
                    {/* Gráficos de Pizza */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Pie Chart Entradas */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <FaChartPie className="w-5 h-5 mr-2 text-green-600" />
                                Distribuição de Entradas
                            </h3>
                            <div style={{ width: '100%', height: '300px' }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={pieDataEntrada}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={80}
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
                            </div>
                        </div>

                        {/* Pie Chart Saídas */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <FaChartPie className="w-5 h-5 mr-2 text-red-600" />
                                Distribuição de Saídas
                            </h3>
                            <div style={{ width: '100%', height: '300px' }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={pieDataSaida}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={80}
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
                            </div>
                        </div>
                    </div>

                    {/* Gráfico de Barras */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <FaChartBar className="w-5 h-5 mr-2 text-indigo-600" />
                            Movimentação Mensal - Entradas vs Saídas
                        </h3>
                        <div style={{ width: '100%', height: '400px' }}>
                            <ResponsiveContainer>
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
                </div>
            )}

            {/* Tabela de Transações */}
            <div className="mt-8 bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <FaTable className="w-5 h-5 mr-2 text-indigo-600" />
                        Detalhamento das Transações
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockData.tabela.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        #{item.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {formatDate(item.dataRegistro)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            item.tipo === 'entrada' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {item.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                                        item.tipo === 'entrada' ? 'text-green-700' : 'text-red-700'
                                    }`}>
                                        {formatCurrency(item.valor)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 capitalize">
                                        {item.categoria}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 max-w-xs">
                                        {item.descricao}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {item.responsavel}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PrintPage;