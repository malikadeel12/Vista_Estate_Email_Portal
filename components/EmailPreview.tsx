'use client'

import { useState } from 'react'

const TEMPLATES = [
  { id: 'vista-estate-info-email.html', name: 'Vista Estate Info' },
  { id: 'follow-up-email.html', name: 'Follow Up Email' },
]

export default function EmailPreview() {
  const [selectedTemplate, setSelectedTemplate] = useState('vista-estate-info-email.html')

  return (
    <div className="preview-wrapper">
      <div className="preview-selector">
        <label htmlFor="previewTemplate">Preview Template:</label>
        <select
          id="previewTemplate"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          {TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
      <iframe
        className="preview-frame"
        src={`/${selectedTemplate}`}
        title="Email Preview"
      />
    </div>
  )
}