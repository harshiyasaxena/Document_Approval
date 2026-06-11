import { NavLink } from 'react-router-dom';
import homeIcon from '../images/3d-house.png';
import loginIcon from '../images/login.png';
import registerIcon from '../images/verify.png';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';

function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#ffffff' : '#e2e8f0',
    background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
    padding: '10px 16px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'all 0.25s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  });

  return (
    <header
      style={{
        width: '100%',
        position:'relative',
        background: 'rgba(15,23,42,0.92)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 30px rgba(37,99,235,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Kaushan Script', cursive",
            fontSize: '34px',
            fontWeight: '700',
            letterSpacing: '1px',
            lineHeight: '1.2',

            background:
              'linear-gradient(90deg, #746bf2 0%, #b7a6f7 50%, #dcdcf2 100%)',

            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',

            animation: 'flowGradient 8s ease infinite',

            paddingRight: '8px',
            display: 'inline-block',
          }}
        >
          DocFlow
        </div>

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '28px',
            cursor: 'pointer',
          }}
        >
          <FiMenu />
        </button>

        {/* Nav Links */}
        <nav
          className={`public-nav ${menuOpen ? 'active' : ''}`}
          style={{
            gap: '10px',
          }}
        >
          <NavLink to="/" style={linkStyle}>
            <img
              src={homeIcon}
              alt=""
              style={{
                width: '20px',
                height: '20px',
              }}
            />
            Home
          </NavLink>

          <NavLink to="/login" style={linkStyle}>
            <img
              src={loginIcon}
              alt=""
              style={{
                width: '20px',
                height: '20px',
              }}
            />
            Login
          </NavLink>

          <NavLink to="/register" style={linkStyle}>
            <img
              src={registerIcon}
              alt=""
              style={{
                width: '20px',
                height: '20px',
              }}
            />
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default PublicNavbar;