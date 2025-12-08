// lib/createPortfolioPdf.ts
import puppeteer from 'puppeteer'
import type { PortfolioDocument } from '@/types/portfolio'
import { renderPortfolioHtml } from './renderPortfolioHtml'

export async function createPortfolioPdf(doc: PortfolioDocument): Promise<Buffer> {
  const html = renderPortfolioHtml(doc)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()

    await page.setContent(html, {
      waitUntil: 'networkidle0',
    })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
    })

    return pdfBuffer
  } finally {
    await browser.close()
  }
}
