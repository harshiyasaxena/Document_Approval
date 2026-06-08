import { Outlet } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';
import backgroundImage from "../images/bg_public.jpg";

function PublicLayout() {
  return (
     <div
          style={{
            minHeight: "100vh",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
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
    </div>
  );
}

export default PublicLayout;

