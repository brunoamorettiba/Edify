import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalido' });
  }

  try {
    // 1. Save lead to Google Sheets via Apps Script
    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK;
    if (sheetsUrl) {
      await fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'lead_magnet_guia',
          date: new Date().toISOString(),
        }),
      }).catch((err) => console.error('Sheets error:', err));
    }

    // 2. Send email with PDF guide
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Read PDF from public directory
    const pdfPath = path.join(process.cwd(), 'public', 'guia-edify.pdf');
    let attachments: any[] = [];

    if (fs.existsSync(pdfPath)) {
      attachments = [
        {
          filename: 'Guia-Edify-De-Oyentes-a-Clientes.pdf',
          path: pdfPath,
        },
      ];
    }

    await transporter.sendMail({
      from: {
        name: 'Edify - Podcast Strategy',
        address: process.env.GMAIL_FROM || 'contacto@edifyclips.com',
      },
      to: email,
      subject: 'Tu guia gratuita: De oyentes a clientes',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 24px; color: #111; margin: 0;">Edify</h1>
            <p style="color: #9CA3AF; font-size: 13px; margin: 4px 0 0;">Podcast Strategy Agency</p>
          </div>

          <p style="color: #111; font-size: 16px; line-height: 1.6;">
            Hola! 👋
          </p>

          <p style="color: #374151; font-size: 15px; line-height: 1.7;">
            Gracias por tu interes en transformar tu podcast en una maquina de autoridad y ventas.
          </p>

          <p style="color: #374151; font-size: 15px; line-height: 1.7;">
            Adjunto encontraras nuestra guia <strong>"De oyentes a clientes: La anatomia de un podcast B2B que vende"</strong>, donde vas a descubrir:
          </p>

          <ul style="color: #374151; font-size: 15px; line-height: 2;">
            <li>Como usar el podcast para posicionarte como referente de tu industria</li>
            <li>El efecto multiplicador: de 1 episodio a 15 piezas de contenido</li>
            <li>Por que el video es indispensable para tu podcast</li>
            <li>La estrategia de entrevistas planeadas que resuelve la falta de invitados</li>
          </ul>

          <div style="background: #F3F4F6; border-radius: 12px; padding: 24px; margin: 28px 0; text-align: center;">
            <p style="color: #111; font-size: 15px; margin: 0 0 16px;">
              <strong>Queres que tu podcast trabaje para vos?</strong>
            </p>
            <a href="https://edifyclips.com"
               style="display: inline-block; background: #111; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 14px;">
              Conoce mas sobre Edify
            </a>
          </div>

          <p style="color: #9CA3AF; font-size: 13px; line-height: 1.6; margin-top: 40px; border-top: 1px solid #E5E7EB; padding-top: 20px;">
            Edify - Podcast Strategy Agency<br>
            <a href="https://edifyclips.com" style="color: #9CA3AF;">edifyclips.com</a>
          </p>
        </div>
      `,
      attachments,
    });

    return res.status(200).json({ success: true, message: 'Guia enviada correctamente' });
  } catch (error: any) {
    console.error('Error sending guide:', error);
    return res.status(500).json({ error: 'Error al enviar la guia', details: error.message });
  }
}
