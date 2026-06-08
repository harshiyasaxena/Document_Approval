import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiHome, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { FiBell } from 'react-icons/fi';
import Footer from './Footer';

function Layout() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [notificationOpen, setNotificationOpen] = useState(false);

    const notifications = [
        {
            title: 'Project Proposal',
            message: 'New document assigned',
        },
        {
            title: 'Budget Request',
            message: 'Pending review',
        },
        {
            title: 'Policy Document',
            message: 'Pending review',
        },
    ];

    const logout = () => {
        navigate('/login');
    };

    const linkStyle = ({ isActive }) => ({
        color: isActive ? '#ffffff' : '#e2e8f0',
        background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
        padding: '10px 14px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
    });

    return (
        <div style={{ minHeight: '100vh' }}>
            <header
                style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.92)',
                    backdropFilter: 'blur(14px)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 10px 40px rgba(15, 23, 42, 0.18)',
                    position: 'relative',
                    zIndex: 9999,
                }}
            >
                <div
                    style={{
                        width: '100%',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '16px',
                        boxSizing: 'border-box',
                    }}
                >
                    {/* Desktop nav */}
                    <nav
                        className="desktop-nav"
                        style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        <NavLink to="/approver-dashboard" style={linkStyle}>
                            <FiHome />
                            <span>Dashboard</span>
                        </NavLink>

                        <div style={{ position: 'relative', zIndex: 1000, }}>
                            <button
                                onClick={() => setNotificationOpen(!notificationOpen)}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    background: 'rgba(255,255,255,0.06)',
                                    color: '#fff',
                                    fontWeight: 600,
                                    position: 'relative',
                                }}
                            >
                                <FiBell />

                                

                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '-6px',
                                        right: '-6px',
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        background: '#dc2626',
                                        color: '#fff',
                                        fontSize: '11px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {notifications.length}
                                </span>
                            </button>

                            {notificationOpen && (
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: '75px',
                                        right: '20px',
                                        width: '320px',
                                        background: 'white',
                                        borderRadius: '18px',
                                        border: '1px solid var(--border)',
                                        boxShadow: '0 20px 50px rgba(0,0,0,.12)',
                                        overflow: 'hidden',
                                        zIndex: 99999,
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: '16px',
                                            borderBottom: '1px solid var(--border)',
                                            fontWeight: 700,
                                        }}
                                    >
                                        Notifications
                                    </div>

                                    {notifications.map((item, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                padding: '14px 16px',
                                                borderBottom:
                                                    index !== notifications.length - 1
                                                        ? '1px solid var(--border)'
                                                        : 'none',
                                            }}
                                        >
                                            <div style={{ fontWeight: 600 }}>
                                                {item.title}
                                            </div>

                                            <div
                                                style={{
                                                    fontSize: '14px',
                                                    color: 'var(--muted)',
                                                }}
                                            >
                                                {item.message}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        <button
                            onClick={logout}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 14px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'rgba(255,255,255,0.06)',
                                color: '#fff',
                                fontWeight: 600,
                            }}
                        >
                            <FiLogOut />
                            Logout
                        </button>
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="hamburger-btn"
                        style={{
                            background: 'rgba(255,255,255,0.08)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '14px',
                            padding: '10px 12px',
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            marginLeft: 'auto',
                        }}
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div
                        className="mobile-nav"
                        style={{
                            width: '100%',
                            padding: '0 20px 18px',
                            display: 'grid',
                            gap: '10px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <NavLink
                            to="/submitter-dashboard"
                            onClick={() => setMenuOpen(false)}
                            style={linkStyle}
                        >
                            <FiHome />
                            <span>Dashboard</span>
                        </NavLink>



                        <button
                            onClick={logout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                padding: '12px 14px',
                                borderRadius: '14px',
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'rgba(255,255,255,0.06)',
                                color: '#fff',
                                fontWeight: 700,
                            }}
                        >
                            <FiLogOut />
                            Logout
                        </button>
                    </div>
                )}
            </header>

            <main
                style={{
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '28px 20px 40px',
                }}
            >
                <Outlet />
               
            </main>
             <Footer />
        </div>
    );
}

export default Layout;