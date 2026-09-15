import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import TechPackModal from './components/common/TechPackModal';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CustomManufacturingPage from './pages/CustomManufacturingPage';
import QualityPage from './pages/QualityPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import { RFQProvider } from './context/RFQContext';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <RFQProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#F5F1E8] text-[#1A1A1A] font-sans selection:bg-[#FF751F] selection:text-white">
          <Navbar />
          
          <main className="flex-1 bg-[#F5F1E8]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/custom-manufacturing" element={<CustomManufacturingPage />} />
              <Route path="/quality" element={<QualityPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          <Footer />
          <WhatsAppFloat />
          <TechPackModal />
        </div>
      </BrowserRouter>
    </RFQProvider>
  );
}
