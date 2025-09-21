import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Mock data - mesmo dados da página de relatórios
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
          "tipo": "entrada",
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
          "tipo": "saida",
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
          "tipo": "entrada",
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
          "tipo": "saida",
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
          "tipo": "entrada",
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

    // Função para formatar valores monetários
    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    };

    // Função para formatar datas
    const formatDate = (dateString: string): string => {
      return new Date(dateString).toLocaleDateString('pt-BR');
    };

    // Construir CSV com melhor organização
    let csvContent = '';
    
    // Cabeçalho do relatório
    csvContent += '===============================================\n';
    csvContent += 'RELATÓRIO FINANCEIRO - ARCA DASHBOARD\n';
    csvContent += '===============================================\n';
    csvContent += `Data de Geração: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}\n`;
    csvContent += `Período de Análise: Janeiro a Março 2025\n`;
    csvContent += '===============================================\n\n';

    // SEÇÃO 1: RESUMO EXECUTIVO
    csvContent += '1. RESUMO EXECUTIVO\n';
    csvContent += '-------------------\n';
    csvContent += 'Indicador,Valor,Observações\n';
    csvContent += `Total de Entradas,${formatCurrency(mockData.resumo.totalEntrada)},Receitas e investimentos recebidos\n`;
    csvContent += `Total de Saídas,${formatCurrency(mockData.resumo.totalSaida)},Despesas e gastos operacionais\n`;
    csvContent += `Saldo Líquido,${formatCurrency(mockData.resumo.totalEntrada - mockData.resumo.totalSaida)},Resultado financeiro do período\n`;
    csvContent += `Margem Operacional,${(((mockData.resumo.totalEntrada - mockData.resumo.totalSaida) / mockData.resumo.totalEntrada) * 100).toFixed(2)}%,Percentual de lucro sobre receitas\n`;
    csvContent += '\n\n';

    // SEÇÃO 2: ANÁLISE DE ENTRADAS POR CATEGORIA
    csvContent += '2. ANÁLISE DE ENTRADAS POR CATEGORIA\n';
    csvContent += '------------------------------------\n';
    csvContent += 'Categoria,Valor,Percentual do Total,Número de Transações\n';
    const totalEntradas = Object.values(mockData.pieChart.entrada).reduce((sum, val) => sum + val, 0);
    
    // Ordenar categorias por valor (maior para menor)
    const entradasOrdenadas = Object.entries(mockData.pieChart.entrada)
      .sort(([,a], [,b]) => b - a);
    
    entradasOrdenadas.forEach(([categoria, valor]) => {
      const percentual = ((valor / totalEntradas) * 100).toFixed(1);
      const transacoes = mockData.tabela.filter(item => item.tipo === 'entrada' && item.categoria === categoria).length;
      csvContent += `${categoria.charAt(0).toUpperCase() + categoria.slice(1)},${formatCurrency(valor)},${percentual}%,${transacoes}\n`;
    });
    csvContent += `TOTAL ENTRADAS,${formatCurrency(totalEntradas)},100.0%,${mockData.tabela.filter(item => item.tipo === 'entrada').length}\n`;
    csvContent += '\n\n';

    // SEÇÃO 3: ANÁLISE DE SAÍDAS POR CATEGORIA
    csvContent += '3. ANÁLISE DE SAÍDAS POR CATEGORIA\n';
    csvContent += '---------------------------------\n';
    csvContent += 'Categoria,Valor,Percentual do Total,Número de Transações\n';
    const totalSaidas = Object.values(mockData.pieChart.saida).reduce((sum, val) => sum + val, 0);
    
    // Ordenar categorias por valor (maior para menor)
    const saidasOrdenadas = Object.entries(mockData.pieChart.saida)
      .sort(([,a], [,b]) => b - a);
    
    saidasOrdenadas.forEach(([categoria, valor]) => {
      const percentual = ((valor / totalSaidas) * 100).toFixed(1);
      const transacoes = mockData.tabela.filter(item => item.tipo === 'saida' && item.categoria === categoria).length;
      csvContent += `${categoria.charAt(0).toUpperCase() + categoria.slice(1)},${formatCurrency(valor)},${percentual}%,${transacoes}\n`;
    });
    csvContent += `TOTAL SAÍDAS,${formatCurrency(totalSaidas)},100.0%,${mockData.tabela.filter(item => item.tipo === 'saida').length}\n`;
    csvContent += '\n\n';

    // SEÇÃO 4: EVOLUÇÃO MENSAL
    csvContent += '4. EVOLUÇÃO MENSAL\n';
    csvContent += '------------------\n';
    csvContent += 'Mês,Entradas,Saídas,Saldo Mensal,Crescimento Entradas,Crescimento Saídas\n';
    
    const meses = Object.keys(mockData.barChart.entrada);
    let entradaAnterior = 0;
    let saidaAnterior = 0;
    
    meses.forEach((mes, index) => {
      const entrada = mockData.barChart.entrada[mes as keyof typeof mockData.barChart.entrada];
      const saida = mockData.barChart.saida[mes as keyof typeof mockData.barChart.saida];
      const saldo = entrada - saida;
      
      let crescimentoEntrada = '';
      let crescimentoSaida = '';
      
      if (index > 0) {
        crescimentoEntrada = `${(((entrada - entradaAnterior) / entradaAnterior) * 100).toFixed(1)}%`;
        crescimentoSaida = `${(((saida - saidaAnterior) / saidaAnterior) * 100).toFixed(1)}%`;
      } else {
        crescimentoEntrada = 'Base';
        crescimentoSaida = 'Base';
      }
      
      csvContent += `${mes.charAt(0).toUpperCase() + mes.slice(1)},${formatCurrency(entrada)},${formatCurrency(saida)},${formatCurrency(saldo)},${crescimentoEntrada},${crescimentoSaida}\n`;
      
      entradaAnterior = entrada;
      saidaAnterior = saida;
    });
    csvContent += '\n\n';

    // SEÇÃO 5: DETALHAMENTO COMPLETO DAS TRANSAÇÕES
    csvContent += '5. DETALHAMENTO COMPLETO DAS TRANSAÇÕES\n';
    csvContent += '---------------------------------------\n';
    csvContent += 'ID,Data,Tipo,Categoria,Valor,Descrição,Responsável,Origem/Destino,Status Nota,Link Nota\n';
    
    // Ordenar por data
    const transacoesOrdenadas = mockData.tabela.sort((a, b) => 
      new Date(a.dataRegistro).getTime() - new Date(b.dataRegistro).getTime()
    );
    
    transacoesOrdenadas.forEach(item => {
      // Escapar aspas duplas nas descrições
      const descricaoLimpa = item.descricao.replace(/"/g, '""');
      const responsavelLimpo = item.responsavel.replace(/"/g, '""');
      const origemDestinoLimpo = item.origemDestino.replace(/"/g, '""');
      const statusNota = item.linkNota ? 'Disponível' : 'Pendente';
      
      csvContent += `${item.id},${formatDate(item.dataRegistro)},${item.tipo === 'entrada' ? 'Entrada' : 'Saída'},${item.categoria.charAt(0).toUpperCase() + item.categoria.slice(1)},${formatCurrency(item.valor)},"${descricaoLimpa}","${responsavelLimpo}","${origemDestinoLimpo}",${statusNota},${item.linkNota}\n`;
    });
    csvContent += '\n\n';

    // SEÇÃO 6: INDICADORES E ESTATÍSTICAS
    csvContent += '6. INDICADORES E ESTATÍSTICAS\n';
    csvContent += '-----------------------------\n';
    csvContent += 'Indicador,Valor,Descrição\n';
    
    // Estatísticas gerais
    const totalNotas = mockData.tabela.length;
    const notasEntrada = mockData.tabela.filter(item => item.tipo === 'entrada').length;
    const notasSaida = mockData.tabela.filter(item => item.tipo === 'saida').length;
    
    csvContent += `Total de Transações,${totalNotas},Número total de movimentações registradas\n`;
    csvContent += `Transações de Entrada,${notasEntrada},Receitas e investimentos recebidos\n`;
    csvContent += `Transações de Saída,${notasSaida},Despesas e gastos operacionais\n`;
    
    // Valores médios
    const ticketMedioEntrada = mockData.resumo.totalEntrada / notasEntrada;
    const ticketMedioSaida = mockData.resumo.totalSaida / notasSaida;
    const ticketMedioGeral = (mockData.resumo.totalEntrada + mockData.resumo.totalSaida) / totalNotas;
    
    csvContent += `Valor Médio - Entradas,${formatCurrency(ticketMedioEntrada)},Ticket médio das receitas\n`;
    csvContent += `Valor Médio - Saídas,${formatCurrency(ticketMedioSaida)},Ticket médio das despesas\n`;
    csvContent += `Valor Médio - Geral,${formatCurrency(ticketMedioGeral)},Ticket médio de todas as transações\n`;
    
    // Extremos
    const valores = mockData.tabela.map(item => item.valor);
    const maiorTransacao = Math.max(...valores);
    const menorTransacao = Math.min(...valores);
    const transacaoMaior = mockData.tabela.find(item => item.valor === maiorTransacao);
    const transacaoMenor = mockData.tabela.find(item => item.valor === menorTransacao);
    
    csvContent += `Maior Transação,${formatCurrency(maiorTransacao)},${transacaoMaior?.categoria} - ${transacaoMaior?.descricao}\n`;
    csvContent += `Menor Transação,${formatCurrency(menorTransacao)},${transacaoMenor?.categoria} - ${transacaoMenor?.descricao}\n`;
    
    // Frequência
    const frequenciaEntrada = notasEntrada / 3; // 3 meses
    const frequenciaSaida = notasSaida / 3;
    
    csvContent += `Frequência Mensal - Entradas,${frequenciaEntrada.toFixed(1)} transações/mês,Média de receitas por mês\n`;
    csvContent += `Frequência Mensal - Saídas,${frequenciaSaida.toFixed(1)} transações/mês,Média de despesas por mês\n`;
    csvContent += '\n\n';

    // SEÇÃO 7: ANÁLISE POR CATEGORIA CONSOLIDADA
    csvContent += '7. ANÁLISE POR CATEGORIA CONSOLIDADA\n';
    csvContent += '------------------------------------\n';
    csvContent += 'Categoria,Entradas,Saídas,Saldo Líquido,Impacto no Total (%)\n';
    
    // Agrupar por categoria
    const categorias = new Map<string, { entrada: number, saida: number }>();
    
    mockData.tabela.forEach(item => {
      if (!categorias.has(item.categoria)) {
        categorias.set(item.categoria, { entrada: 0, saida: 0 });
      }
      const cat = categorias.get(item.categoria)!;
      if (item.tipo === 'entrada') {
        cat.entrada += item.valor;
      } else {
        cat.saida += item.valor;
      }
    });
    
    // Ordenar por impacto no saldo (maior para menor)
    const categoriasOrdenadas = Array.from(categorias.entries())
      .sort(([,a], [,b]) => (b.entrada - b.saida) - (a.entrada - a.saida));
    
    const saldoTotal = mockData.resumo.totalEntrada - mockData.resumo.totalSaida;
    
    categoriasOrdenadas.forEach(([categoria, valores]) => {
      const saldoCategoria = valores.entrada - valores.saida;
      const impactoPercentual = ((saldoCategoria / saldoTotal) * 100).toFixed(1);
      
      csvContent += `${categoria.charAt(0).toUpperCase() + categoria.slice(1)},${formatCurrency(valores.entrada)},${formatCurrency(valores.saida)},${formatCurrency(saldoCategoria)},${impactoPercentual}%\n`;
    });
    
    csvContent += `TOTAL CONSOLIDADO,${formatCurrency(mockData.resumo.totalEntrada)},${formatCurrency(mockData.resumo.totalSaida)},${formatCurrency(saldoTotal)},100.0%\n`;
    csvContent += '\n\n';
    
    // Rodapé do relatório
    csvContent += '===============================================\n';
    csvContent += 'FIM DO RELATÓRIO\n';
    csvContent += '===============================================\n';
    csvContent += `Gerado automaticamente pelo Sistema Arca Dashboard\n`;
    csvContent += `Contato: dashboard@arca.org.br\n`;
    csvContent += '===============================================';

    // Configurar headers para download do arquivo
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv; charset=utf-8');
    headers.set('Content-Disposition', `attachment; filename="relatorio_financeiro_${new Date().toISOString().split('T')[0]}.csv"`);
    
    // Adicionar BOM para suporte a caracteres especiais no Excel
    const bom = '\uFEFF';
    const csvWithBom = bom + csvContent;

    return new NextResponse(csvWithBom, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Erro ao gerar relatório CSV:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor ao gerar relatório' },
      { status: 500 }
    );
  }
}