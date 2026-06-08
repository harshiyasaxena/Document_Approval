
import { Link } from 'react-router-dom';
import homeIcon from '../images/3d-house.png';
import loginIcon from '../images/login.png';
import registerIcon from '../images/verify.png';
import twitterIcon from '../images/twitter.png';
import instagramIcon from '../images/instagram.png';
import facebookIcon from '../images/facebook.png';

function Footer() {
    return (
        <footer
            style={{
                width: '100%',
                background: '#0f172a',
                color: '#ffffff',
                marginTop: '60px',
                padding: '32px 50px',
                boxSizing: 'border-box',
                borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            {/* Left Section */}
            <div
                style={{
                    width: '100%',
                    maxWidth: '1600px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '24px',
                }}
            >
                <div>
                    <h4
                        style={{
                            marginTop: 0,
                            marginBottom: '16px',
                            color: '#ffffff',
                        }}
                    >
                        Quick Links
                    </h4>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '14px',
                        }}
                    >
                        <Link
                            className="footer-link"
                            to="/"
                            style={{
                                color: '#cbd5e1',
                                textDecoration: 'none',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <img
                                src={homeIcon}
                                alt=""
                                style={{
                                    width: '18px',
                                    height: '18px',
                                }}
                            />
                            Home
                        </Link>

                        <Link
                            className="footer-link"
                            to="/login"
                            style={{
                                color: '#cbd5e1',
                                textDecoration: 'none',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <img
                                src={loginIcon}
                                alt=""
                                style={{
                                    width: '18px',
                                    height: '18px',
                                }}
                            />
                            Login
                        </Link>

                        <Link
                            className="footer-link"
                            to="/register"
                            style={{
                                color: '#cbd5e1',
                                textDecoration: 'none',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <img
                                src={registerIcon}
                                alt=""
                                style={{
                                    width: '18px',
                                    height: '18px',
                                }}
                            />
                            Register
                        </Link>
                    </div>
                </div>
                {/* middle Section */}
                <div style={{
                    textAlign: 'center',

                }}>
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '34px',
                            fontFamily: "'Kaushan Script', cursive",
                            fontWeight: '700',
                            letterSpacing: '1px',
                            lineHeight: '1.2',
                            display: 'inline-block',
                            paddingRight: '8px',

                            background:
                                'linear-gradient(90deg, #746bf2 0%, #b7a6f7 50%, #dcdcf2 100%)',

                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',

                            animation: 'flowGradient 3s ease infinite',
                        }}
                    >
                        DocFlow
                    </h3>

                    <p
                        style={{
                            marginTop: '8px',
                            color: '#94a3b8',
                            maxWidth: '500px',
                            lineHeight: 1.6,
                        }}
                    >
                        Streamlining document submissions, approvals,
                        revisions, and workflow management through a
                        modern and secure platform.
                    </p>
                </div>

                <div>
                    <h4
                        style={{
                            marginTop: 0,
                            marginBottom: '16px',
                            color: '#ffffff',
                            textAlign: 'center',
                        }}
                    >
                        Connect
                    </h4>

                    {/* Right Section */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '18px',
                        }}
                    >
                        <a
                            className="footer-social"
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                color: '#cbd5e1',
                                fontSize: '22px',
                            }}
                        >
                            <img
                                src={twitterIcon}
                                alt="Twitter"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                        </a>

                        <a
                            className="footer-social"
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                color: '#cbd5e1',
                                fontSize: '22px',
                            }}
                        >
                            <img
                                src={instagramIcon}
                                alt="Instagram"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                        </a>

                        <a
                            className="footer-social"
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                color: '#cbd5e1',
                                fontSize: '22px',
                            }}
                        >
                            <img
                                src={facebookIcon}
                                alt="Facebook"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div
                style={{
                    marginTop: '24px',
                    paddingTop: '18px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    textAlign: 'center',
                    color: '#94a3b8',
                    fontSize: '14px',
                }}
            >
                © {new Date().getFullYear()} DocFlow. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;