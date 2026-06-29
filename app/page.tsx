'use client'

import { useState } from 'react'
import EmailPreview from '@/components/EmailPreview'
import SendEmailForm from '@/components/SendEmailForm'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleSendSuccess = (clientEmail: string) => {
    setShowForm(false)
    setMessage({
      text: `Email sent successfully to ${clientEmail}!`,
      type: 'success'
    })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleSendError = (error: string) => {
    setMessage({ text: error, type: 'error' })
  }

  return (
    <div className="portal-container">
      <div className="portal-header">
        <div className="header-content">
          <img 
            src="https://i.ibb.co/yBBgBKSP/logo-official.png" 
            alt="Vista Estate" 
            className="header-logo"
          />
          <div className="header-text">
            <h1>Vista Estate Email Portal</h1>
            <p>Send personalized marketing emails to your clients</p>
          </div>
        </div>
      </div>

      <div className="portal-card">
        <div className="smtp-bar">
          <div className="smtp-info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <span>SMTP:</span>
            <code>smtp.hostinger.com:465</code>
            <span>|</span>
            <code>info@vistaestate.shop</code>
          </div>
          <div className="status-badge">
            <span className="status-dot"></span>
            Connected
          </div>
        </div>

        {message && (
          <div className={`message ${message.type}`}>
            <span className="message-icon">{message.type === 'success' ? '✓' : '✗'}</span>
            {message.text}
          </div>
        )}

        <div className="preview-section">
          <div className="preview-header">
            <div className="preview-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
              Email Preview
            </div>
            <button className="send-btn" onClick={() => setShowForm(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Send Email
            </button>
          </div>
          {!showForm ? (
            <EmailPreview />
          ) : (
            <SendEmailForm
              onCancel={() => setShowForm(false)}
              onSuccess={handleSendSuccess}
              onError={handleSendError}
            />
          )}
        </div>
      </div>

      <div className="portal-footer">
        Powered by <a href="https://vistaestate.shop">Vista Estate</a>
      </div>
    </div>
  )
}