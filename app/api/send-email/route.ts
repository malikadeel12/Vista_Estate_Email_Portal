import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { clientName, clientEmail, subject } = await request.json()

    if (!clientName || !clientEmail || !subject) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(clientEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Read the email template
    const templatePath = path.join(process.cwd(), 'public', 'vista-estate-info-email.html')
    let emailHtml = fs.readFileSync(templatePath, 'utf-8')

    // Replace placeholders
    emailHtml = emailHtml.replace(/{{client_name}}/g, clientName)
    emailHtml = emailHtml.replace(/Dear Client,/g, `Dear ${clientName},`)

    // SMTP Configuration (Hostinger)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const fromName = 'Vista Estate'
    const fromEmail = process.env.SMTP_USER

    const messageId = `vista-${Date.now()}@vistaestate.shop`

    const headers = {
      from: `"${fromName}" <${fromEmail}>`,
      to: clientEmail,
      subject: subject,
      html: emailHtml,
      headers: {
        'X-Mailer': 'Apple Mail (2.0.0)',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Return-Path': fromEmail,
        'Reply-To': fromEmail,
        'List-Unsubscribe': `<mailto:unsubscribe@vistaestate.shop?subject=Unsubscribe>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        'Message-ID': messageId,
      },
    }

    // Send email
    await transporter.sendMail(headers)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please check configuration.' },
      { status: 500 }
    )
  }
}