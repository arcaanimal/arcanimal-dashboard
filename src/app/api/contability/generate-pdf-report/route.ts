import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  try {
    // Obter a URL base da requisição
    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    const reportUrl = `${baseUrl}/contability/reporting/print`;

    // Configurar Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Configurar viewport para uma resolução adequada
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1.5 // Para melhor qualidade
    });

    // Navegar para a página de relatórios
    await page.goto(reportUrl, {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    // Aguardar os gráficos carregarem
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Configurações do PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: '25mm',
        right: '15mm',
        bottom: '25mm',
        left: '15mm'
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 12px; padding: 10px; width: 100%; text-align: center; color: #333; border-bottom: 1px solid #ddd;">
          <h2 style="margin: 0; color: #1f2937;">Relatório Financeiro - Arca Dashboard</h2>
          <p style="margin: 5px 0 0 0; font-size: 10px; color: #666;">Sistema de Gestão Financeira</p>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; padding: 10px; width: 100%; text-align: center; color: #666; border-top: 1px solid #ddd;">
          <span>Gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')} | Página <span class="pageNumber"></span> de <span class="totalPages"></span> | Arca Dashboard © 2025</span>
        </div>
      `
    });

    await browser.close();

    // Configurar headers para download do PDF
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="relatorio_financeiro_${new Date().toISOString().split('T')[0]}.pdf"`);

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Erro ao gerar relatório PDF:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor ao gerar relatório PDF' },
      { status: 500 }
    );
  }
}