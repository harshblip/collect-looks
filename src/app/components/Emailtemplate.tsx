// app/components/EmailTemplate.tsx
import React from 'react'

interface EmailTemplateProps {
    firstName: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
}) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
        <p>This is a test email sent from your Next.js application using Resend.</p>
    </div>
)

export default EmailTemplate