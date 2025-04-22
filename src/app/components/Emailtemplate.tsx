import React from 'react'

export const EmailTemplate: React.FC = ({
}) => (
    <div className='w-full flex justify-center items-center flex-col'>
        <img src = {`https://collect-aws.s3.us-east-1.amazonaws.com/mihir/collect-logo.png/collect-logo.png`} width={550}/>
        <h1 className='flex justify-center align-middle mt-2 space-x-2'><h1><span className="h1">Welcome to</span></h1> <h1><span className="collect">Collect</span></h1></h1>
        <div className="paragraph">
            <p>This is a test email sent from your Next.js application using Resend.</p>
        </div>
    </div>
)

export default EmailTemplate