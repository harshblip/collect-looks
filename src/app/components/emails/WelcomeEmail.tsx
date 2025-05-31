import React from 'react'
import { Font, CodeBlock, Section, Img, Text, Heading, Row, Hr, Column, oneLight } from '@react-email/components'

export const EmailTemplate: React.FC = ({
}) => (
    <table width="100%" style={{ fontFamily: "'CommitMono', monospace" }}>
        <tr>
            <td align="center" valign="middle">
                <div style={{ textAlign: 'center' }}>
                    <Section
                        style={{ marginBlock: '16px', }}
                    >
                        <img
                            src="small-logo.png"
                            alt="collect"
                            height="250"
                            width="550"
                            style={{ borderRadius: '12px', objectFit: 'cover' }}
                        />
                        <Section
                            style={{ marginTop: '32px', textAlign: 'center' }}>
                            <Text
                                style={{ marginBlock: '16px', fontSize: '18px', fontWeight: '600 ', color: '#4f39f6' }}>
                                Your Cloud, Reimagined Right
                            </Text>
                            <Heading
                                as="h1"
                                style={{ margin: '0px', marginTop: '8px', fontSize: '36px', fontWeight: '600', color: '#f679aa', fontFamily: 'sans-serif' }}
                            >
                                Collect
                            </Heading>
                            <Text
                                style={{ fontSize: '16px', color: '#6a7282' }}>
                                Welcome to the most thoughtfully crafted platform you didn’t even know you needed.
                                Collect isn’t just another file-sharing tool. It’s your personal cloud vault, collaboration hub, and digital memory palace — engineered with precision, designed for scale, and wrapped in a clean, intuitive UI that’s actually fun to use. Secure? Of course. Fast? Ridiculously. Professional? To the core.
                            </Text>
                        </Section>
                    </Section>
                    <Section style={{ marginBlock: '16px', fontFamily: 'sans-serif' }}>
                        <Section>
                            <Row>
                                <Text
                                    style={{ fontSize: '20px', fontWeight: '600', color: '#101828' }}>
                                    Functional Style
                                </Text>
                                <Text
                                    style={{ marginTop: '8px', fontSize: '14px', color: '#6a7282' }}>
                                    Combine practicality and style effortlessly with our furniture,
                                    offering functional designs that enhance your living space.
                                </Text>
                            </Row>
                        </Section>
                        <Section style={{ textAlign: 'left' }}>
                            <Hr className="mx-0 my-[32px] w-full border border-solid !border-gray-300" />
                            <Section>
                                <Row>
                                    <Column className="align-baseline">
                                        <Img
                                            alt="heart icon"
                                            height="48"
                                            src="https://react.email/static/rocket-icon.png"
                                            width="48"
                                        />
                                    </Column>
                                    <Column className="w-[85%]"
                                        style={{ marginLeft: '2rem' }}
                                    >
                                        <Text
                                            style={{ fontWeight: '600', fontSize: '14px', color: '#101828' }}>
                                            🚀 Blazing Fast Uploads
                                        </Text>
                                        <Text style={{ marginTop: '8px', fontSize: '12px', color: '#6a7282' }}>
                                            Upload dozens of files in seconds — yes, even the large ones <br /> with smart compression and multi-part S3 integration.
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>
                            <Section>
                                <Row>
                                    <Column className="align-baseline">
                                        <Img
                                            alt="heart icon"
                                            height="48"
                                            src="https://react.email/static/heart-icon.png"
                                            width="48"
                                        />
                                    </Column>
                                    <Column className="w-[85%]">
                                        <Text style={{ fontWeight: '600', fontSize: '14px', color: '#101828' }}>
                                            🧾 Folder Sharing, but Actually Useful
                                        </Text>
                                        <Text style={{ marginTop: '8px', fontSize: '12px', color: '#6a7282' }}>
                                            Invite others to view, comment, or collaborate — in real time <br /> with live folder syncing and role-based access.
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>
                            <Section>
                                <Row>
                                    <Column className="align-baseline">
                                        <Img
                                            alt="heart icon"
                                            height="48"
                                            src="https://react.email/static/heart-icon.png"
                                            width="48"
                                        />
                                    </Column>
                                    <Column className="w-[85%]">
                                        <Text style={{ fontWeight: '600', fontSize: '14px', color: '#101828' }}>
                                            🎯 Clean UX With Zero Noise
                                        </Text>
                                        <Text style={{ marginTop: '8px', fontSize: '12px', color: '#6a7282' }}>
                                            No clutter, no ads, no confusing buttons.  Just you, <br />your data, and a peaceful modern UI.
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>
                            <Section>
                                <Row>
                                    <Column className="align-baseline">
                                        <Img
                                            alt="heart icon"
                                            height="48"
                                            src="https://react.email/static/rocket-icon.png"
                                            width="48"
                                        />
                                    </Column>
                                    <Column className="w-[85%]">
                                        <Text style={{ fontWeight: '600', fontSize: '14px', color: '#101828' }}>
                                            🔐 Security at Core
                                        </Text>
                                        <Text
                                            style={{ marginTop: '8px', fontSize: '12px', color: '#6a7282' }}>
                                            256-bit encryption, token-based access, <br /> and strict isolation. Not just promises — real implementation.
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>
                            <Hr className="mx-0 my-[32px] w-full border border-solid !border-gray-300" />
                        </Section>
                    </Section>
                    <>
                        <Text
                            style={{ fontSize: '18px', fontWeight: '600', color: '#7c86ff' }}>
                            Your Cloud, Finally Done Right
                        </Text>
                        <Text
                            style={{ fontSize: '16px' }}
                        >
                            We didn’t want to build another “meh” storage tool. So we didn’t.
                            We built Collect — a performance-driven, design-conscious, developer-approved platform that feels like a productivity upgrade, not just another app on your tab list.
                            While others chase cricket coins and referral hacks (looking at you, DamnPlay 👀), we decided to ship real tech with real impact.
                        </Text>
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
                            code={`function startCompany() {
                                const idea = "Make money by watching ads and tapping buttons";
                                const ui = loadUI("copied-from-dream11-but-worse");
                                const backend = new Promise((resolve, reject) => reject("500 Internal Server Error"));

                                if (userIQ > 60) {
                                    return console.warn("Please reconsider your life choices");
                                }

                                return "🔥 Let's burn some investor money!";
                                }
                                ' }),
                                });`
                            }
                            fontFamily="'CommitMono', monospace"
                            language="javascript"
                            theme={oneLight}
                        />
                    </>
                    <Section style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <table
                            style={{ width: '100%' }}>
                            <tr style={{ width: '100%' }}>
                                <td align="center" valign='middle'>
                                    <img
                                        alt="React Email logo"
                                        width="170"
                                        style={{ borderRadius: '12px' }}
                                        src="https://collect-aws.s3.us-east-1.amazonaws.com/mihir/collect-logo.png/small-logo.png"
                                    />
                                </td>
                            </tr>
                            <tr className="w-full">
                                <td align="center">
                                    <Text
                                        style={{ marginBlock: '8px', fontSize: '22px', fontWeight: '600', color: '#f679aa', fontFamily: 'sans-serif', marginTop: '1rem' }}>
                                        Collect
                                    </Text>
                                    <Text
                                        style={{ color: "#6a7282", marginTop: '4px', marginBottom: '0px', fontSize: '10px' }}>
                                        Think different
                                    </Text>
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-500">
                                        Blue Lock, Tokyo, Japan
                                    </Text>
                                    <Text className="mb-0 mt-[4px] text-[16px] font-semibold leading-[24px] text-gray-500">
                                        jipkateharsh@gmail.com
                                    </Text>
                                </td>
                            </tr>
                        </table>
                    </Section>
                </div>
            </td>
        </tr>
    </table >

)

export default EmailTemplate