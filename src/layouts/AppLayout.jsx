import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../components/ScrollToTop';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-main font-body text-text-primary">
      <Navbar />
      <ScrollToTop />
      
      <main className="flex-grow min-h-screen w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
