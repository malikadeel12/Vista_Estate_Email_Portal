# Vista Estate Email Portal

A Next.js email portal for sending marketing emails via Hostinger SMTP.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy your email template to `public/vista-estate-info-email.html`

3. Update SMTP credentials in `.env.local`:
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@vistaestate.shop
SMTP_PASS=your_password
```

## Run

```bash
npm run dev
```

Open http://localhost:3000

## Features

- Email preview in iframe
- Send form with client name, email, subject
- SMTP sending via nodemailer
- Personalized "Dear [Name]" greeting