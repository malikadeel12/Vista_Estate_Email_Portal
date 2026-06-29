import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vista Estate - Email Portal',
  description: 'Send emails to clients via Hostinger SMTP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}