import React from 'react';
import {
    Html,
    Head,
    Preview,
    Body,
    Heading,
    Text,
    Section,
    Button,
    Container,
} from '@react-email/components';

type ForgotPasswordEmailProps = {
    username?: string;
    resetLink: string;
};

export const ForgotPassword = ({
    username = 'there',
    resetLink = 'http://localhost:3000/reset-password',
}: ForgotPasswordEmailProps) => (
    <Html>
        <Head />
        <Preview>Reset your Collect password</Preview>
        <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f6f9fc', padding: '40px' }}>
            <Container
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    padding: '40px',
                    maxWidth: '520px',
                    margin: '0 auto',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}
            >
                <Section>
                    <Heading
                        as="h1"
                        style={{
                            fontSize: '28px',
                            fontWeight: 600,
                            color: '#333333',
                            margin: 0,
                            marginBottom: '16px',
                        }}
                    >
                        Forgot your password?
                    </Heading>

                    <Text
                        style={{
                            fontSize: '16px',
                            color: '#4f4f4f',
                            lineHeight: '1.5',
                            marginBottom: '24px',
                        }}
                    >
                        Hey {username}, we received a request to reset your password for your Collect account.
                    </Text>

                    <Button
                        href={resetLink}
                        style={{
                            backgroundColor: '#4f39f6',
                            color: '#ffffff',
                            fontSize: '16px',
                            padding: '12px 20px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            display: 'inline-block',
                        }}
                    >
                        Reset Password
                    </Button>

                    <Text
                        style={{
                            fontSize: '14px',
                            color: '#6a7282',
                            marginTop: '24px',
                        }}
                    >
                        If you didn’t request a password reset, you can safely ignore this email.
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default ForgotPassword