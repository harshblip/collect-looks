// pages/api/send-welcome-email.js
import { Resend } from 'resend';
import EmailTemplate from '@/components/EmailTemplate'; // adjust path as needed

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { useremail } = req.body;

    try {
        const data = await resend.emails.send({
            from: 'Harsh <jipkateh@gmail.com>',
            to: [useremail],
            subject: 'Welcome to Collect!',
            react: EmailTemplate(),
        });

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
