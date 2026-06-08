import { Outlet } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';

function PublicLayout() {
  return (
    <>
      <PublicNavbar />

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
    </>
  );
}

export default PublicLayout;