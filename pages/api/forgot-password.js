import nodemailer from 'nodemailer'
import ReactDOMServer from 'react-dom/server'
import ForgotPassword from '../../src/app/components/emails/ForgotPassword'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body

    const htmlContent = ReactDOMServer.renderToStaticMarkup(
        <ForgotPassword />
    );

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `Harsh  ${process.env.FROM_EMAIL}`,
        to: email,
        subject: 'Welcome to Collect !',
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(201).json({ success: true, info });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}
