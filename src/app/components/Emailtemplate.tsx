import React from 'react'
import { Font, CodeBlock, dracula } from '@react-email/components'

export const EmailTemplate: React.FC = ({
}) => (
    <table width="100%">
        <tr>
            <td align="center" valign="middle">
                <div style={{textAlign: 'center'}}>
                    <img src={`https://collect-aws.s3.us-east-1.amazonaws.com/mihir/collect-logo.png/collect-logo.png`} width={550} style={{ borderRadius: '12px' }} />
                    <Font
                        fallbackFontFamily="monospace"
                        fontFamily="CommitMono"
                        fontStyle="normal"
                        fontWeight={400}
                        webFont={{
                            url: 'https://react.email/fonts/commit-mono/commit-mono-regular.ttf',
                            format: 'truetype',
                        }}
                    />
                    <CodeBlock
                        code={`const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});
            
const mailOptions = {
    from: Harsh,
    to: process.env.TO_EMAIL,
    subject: 'Welcome to Collect !',
    html: htmlContent
};`}
                        fontFamily="'CommitMono', monospace"
                        language="javascript"
                        theme={dracula}
                    />
                </div>
            </td>
        </tr>
    </table>

)

export default EmailTemplate