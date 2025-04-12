import { Resend } from 'resend';
import EmailTemplate from '../../src/app/components/Emailtemplate'; // adjust path as needed

const resend = new Resend(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { useremail } = req.body;
    console.log(useremail)
    try {
        const data = await resend.emails.send({
            from: 'Harsh <jipkateharsh@gmail.com>',
            to: ['harsh.jipkate2020@vitbhopal.ac.in'],
            subject: 'Welcome to Collect!',
            react: <EmailTemplate />,
        });
        console.log(data)
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
