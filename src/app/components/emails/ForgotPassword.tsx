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
    Img,
    Hr,
    Link,
} from '@react-email/components';

type ForgotPasswordEmailProps = {
    username?: string;
    resetLink: string;
};

// Base URL for your assets (logo, etc.)
const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

export const ForgotPassword = ({
    username = 'there',
    resetLink = 'http://localhost:3000/reset-password',
}: ForgotPasswordEmailProps) => (
    <Html>
        <Head />
        <Preview>Reset your Collect password</Preview>
        <Body style={styles.main}>
            <Container style={styles.container}>
                {/* Logo Section */}
                <Section style={styles.logoContainer}>
                    <Img
                        src={`https://collect-aws.s3.us-east-1.amazonaws.com/mihir/logo2.png/logo2.png`} // Replace with your actual logo URL
                        width="40"
                        height="40"
                        alt="Collect"
                        style={styles.logo}
                    />
                </Section>

                <Section>
                    <Heading style={styles.h1}>
                        Reset your password
                    </Heading>

                    <Text style={styles.text}>
                        Hi {username},
                    </Text>
                    
                    <Text style={styles.text}>
                        Someone recently requested a password change for your Collect account. 
                        If this was you, you can set a new password here:
                    </Text>

                    <Section style={styles.buttonContainer}>
                        <Button
                            href={resetLink}
                            style={styles.button}
                        >
                            Reset password
                        </Button>
                    </Section>

                    <Text style={styles.text}>
                        If you don't want to change your password or didn't request this, 
                        just ignore and delete this message.
                    </Text>

                    <Text style={styles.text}>
                        To keep your account secure, please don't forward this email to anyone.
                    </Text>
                </Section>

                <Hr style={styles.hr} />

                {/* Footer Section */}
                <Section>
                    <Text style={styles.footerText}>
                        This email was intended for {username}. If you have any questions, 
                        please contact our <Link href="mailto:support@collect.com" style={styles.link}>support team</Link>.
                    </Text>
                    <Text style={styles.footerText}>
                        © {new Date().getFullYear()} Collect Inc. 123 Startup Ave, San Francisco, CA
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default ForgotPassword;

// --- Styles ---

const fontFamily = 
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

const styles = {
    main: {
        backgroundColor: '#f6f6f6',
        fontFamily,
        padding: '40px 0',
    },
    container: {
        backgroundColor: '#ffffff',
        border: '1px solid #eaeaea', // Subtle border is more modern than a drop shadow
        borderRadius: '8px',
        padding: '40px',
        width: '465px',
        margin: '0 auto',
    },
    logoContainer: {
        marginTop: '8px',
        marginBottom: '32px',
    },
    logo: {
        borderRadius: '8px',
        backgroundColor: '#111', // Placeholder dark background if no image
    },
    h1: {
        color: '#111111',
        fontSize: '24px',
        fontWeight: '600',
        lineHeight: '1.25',
        margin: '0 0 24px 0',
        padding: '0',
    },
    text: {
        color: '#444444',
        fontSize: '15px',
        lineHeight: '24px',
        margin: '0 0 16px 0',
    },
    buttonContainer: {
        padding: '8px 0 24px 0',
    },
    button: {
        backgroundColor: '#111111', // Stark black feels very modern/premium
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: '600',
        textDecoration: 'none',
        textAlign: 'center' as const,
        padding: '12px 24px',
        display: 'inline-block',
    },
    hr: {
        borderColor: '#eaeaea',
        margin: '32px 0 24px 0',
        borderWidth: '1px',
    },
    footerText: {
        color: '#8898aa',
        fontSize: '12px',
        lineHeight: '20px',
        margin: '0 0 8px 0',
    },
    link: {
        color: '#8898aa',
        textDecoration: 'underline',
    },
};