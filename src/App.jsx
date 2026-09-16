import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import TechPackModal from './components/common/TechPackModal';
import ScissorCursor from './components/common/ScissorCursor';
import ErrorBoundary from './components/common/ErrorBoundary';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CustomManufacturingPage from './pages/CustomManufacturingPage';
import QualityPage from './pages/QualityPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CountryServicePage from './pages/CountryServicePage';
import MeetHarePage from './pages/MeetHarePage';
import { RFQProvider } from './context/RFQContext';

// Instant scroll to top on route change without blocking animations
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary name="RootApplication">
      <RFQProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ScissorCursor />
          
          <div className="flex flex-col min-h-screen bg-[#F5F1E8] text-[#1A1A1A] font-sans selection:bg-[#FF751F] selection:text-white">
            <ErrorBoundary name="Navbar">
              <Navbar />
            </ErrorBoundary>
            
            <main className="flex-1 bg-[#F5F1E8]">
              <ErrorBoundary name="MainContent">
                <Routes>
                  {/* Primary Pages */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/custom-manufacturing" element={<CustomManufacturingPage />} />
                  <Route path="/quality" element={<QualityPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/meet-hare" element={<MeetHarePage />} />
                  <Route path="/mascot" element={<Navigate to="/meet-hare" replace />} />
                  <Route path="/hurry" element={<Navigate to="/meet-hare" replace />} />

                  {/* Dedicated Target Country Service Pages */}
                  <Route path="/sports-wear-manufacturer-us" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-uk" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-australia" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-germany" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-canada" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-uae" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-france" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-netherlands" element={<CountryServicePage />} />
                  
                  {/* Catch-all dynamic route for any other country code or alias */}
                  <Route path="/sports-wear-manufacturer-:countryCode" element={<CountryServicePage />} />

                  {/* High-traffic standard B2B Aliases & Route Redirects */}
                  <Route path="/sports-wear-manufacturer" element={<Navigate to="/sports-wear-manufacturer-us" replace />} />
                  <Route path="/sports-wear-manufacturers" element={<Navigate to="/sports-wear-manufacturer-us" replace />} />
                  <Route path="/services" element={<Navigate to="/custom-manufacturing" replace />} />
                  <Route path="/oem" element={<Navigate to="/custom-manufacturing" replace />} />
                  <Route path="/manufacturing" element={<Navigate to="/custom-manufacturing" replace />} />
                  <Route path="/factory" element={<Navigate to="/quality" replace />} />
                  <Route path="/catalog" element={<Navigate to="/products" replace />} />
                  <Route path="/rfq" element={<Navigate to="/contact" replace />} />
                  <Route path="/quote" element={<Navigate to="/contact" replace />} />
                  <Route path="/inquiry" element={<Navigate to="/contact" replace />} />

                  {/* Fallback 404 to Homepage */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ErrorBoundary>
            </main>

            <Footer />
            <WhatsAppFloat />
            <TechPackModal />
          </div>
        </BrowserRouter>
      </RFQProvider>
    </ErrorBoundary>
  );
}
