'use client'

import { useState } from 'react'

interface SendEmailFormProps {
  onCancel: () => void
  onSuccess: (clientEmail: string) => void
  onError: (error: string) => void
}

export default function SendEmailForm({ onCancel, onSuccess, onError }: SendEmailFormProps) {
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [subject, setSubject] = useState('Vista Estate - Premium Real Estate Leads for You')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientName || !clientEmail || !subject) {
      onError('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, clientEmail, subject }),
      })

      const data = await response.json()

      if (response.ok) {
        onSuccess(clientEmail)
        setClientName('')
        setClientEmail('')
        setSubject('Vista Estate - Premium Real Estate Leads for You')
      } else {
        onError(data.error || 'Failed to send email')
      }
    } catch {
      onError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-section">
      <h3>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        Send Email to Client
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="clientName">Client Name <span>*</span></label>
            <input
              type="text"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="clientEmail">Client Email <span>*</span></label>
            <input
              type="email"
              id="clientEmail"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="client@example.com"
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="subject">Subject <span>*</span></label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
              required
            />
          </div>
        </div>

        <div className="btn-row">
          <button type="button" className="back-btn" onClick={onCancel}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
          <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
            <span className="btn-text">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Send Email
            </span>
            <span className="spinner"></span>
          </button>
        </div>
      </form>
    </div>
  )
}