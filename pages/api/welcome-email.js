import sgMail from '@sendgrid/mail'
import EmailTemplate from '../../src/app/components/Emailtemplate'; // adjust path as needed
import ReactDOMServer from 'react-dom/server'

const nodemailer = require('nodemailer')

const htmlContent = ReactDOMServer.renderToStaticMarkup(<EmailTemplate />)

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { useremail } = req.body;
    console.log(useremail)
    try {
        const data = {
            to: 'harsh.jipkate2020@vitbhopal.ac.in',
            from: 'jipkateharsh@gmail.com',
            subject: 'Welcome to Collect!',
            html: htmlContent,
        }

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jipkateharsh@gmail.com',
                pass: process.env.PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        })

       await sgMail
            .send(data)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })

        console.log(data)
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
