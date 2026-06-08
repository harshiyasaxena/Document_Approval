import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import Footer from './Footer';
import dashboardIcon from '../images/home-button.png';
import uploadIcon from '../images/file.png';
import logoutIcon from '../images/user-logout.png';

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
        }}
      >
        <div
          style={{
            width: '100%',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontFamily: "'Kaushan Script', cursive",
              fontSize: '30px',
              fontWeight: '700',

              background:
                'linear-gradient(90deg, #746bf2 0%, #b7a6f7 50%, #dcdcf2 100%)',

              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',

              animation: 'flowGradient 8s linear infinite',
            }}
          >
            DocFlow
          </div>
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
            <NavLink to="/submitter-dashboard" style={linkStyle}  className="nav-link">
              <img
                src={dashboardIcon}
                alt=""
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/upload" style={linkStyle} className="nav-link">
              <img
                src={uploadIcon}
                alt=""
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
              <span>Upload</span>
            </NavLink>

            <button
              onClick={logout}
              className="nav-link logout-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '12px',
                border: 'none',
                background: 'transparent',
                color: '#fff',
                fontWeight: 600,
              }}
            >
              <img
                src={logoutIcon}
                alt=""
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
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
              <img
                src={dashboardIcon}
                alt=""
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/upload"
              onClick={() => setMenuOpen(false)}
              style={linkStyle}
            >
              <img
                src={uploadIcon}
                alt=""
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
              <span>Upload</span>
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
              <img
                src={logoutIcon}
                alt=""
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
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