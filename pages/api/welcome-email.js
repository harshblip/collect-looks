import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST requests allowed' });
    }

    try {
        await sendgrid.send({
            to: process.env.TO_EMAIL,
            from: process.env.FROM_EMAIL,
            subject: 'Test Email from Next.js App',
            text: 'This is a test email sent using SendGrid and Next.js!',
        });

        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email send error:', error.response?.body || error.message);
        res.status(500).json({ success: false, error: 'Failed to send email' });
    }
}
