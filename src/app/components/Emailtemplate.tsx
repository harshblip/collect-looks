import React from 'react';

const EmailTemplate: React.FC = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
            <h1 style={{ color: '#4CAF50' }}>Welcome to Our Service!</h1>
            <p>Hi there,</p>
            <p>
                Thank you for signing up for our service. We're excited to have you on board. If you have any questions, feel free to reach out to our support team.
            </p>
            <p>Best regards,</p>
            <p>The Team</p>
        </div>
    );
};

export default EmailTemplate;