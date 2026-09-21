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
import FabricGlossaryPage from './pages/FabricGlossaryPage';
import ToolsHubPage from './pages/ToolsHubPage';
import PantoneMatcherPage from './pages/PantoneMatcherPage';
import PaletteGeneratorPage from './pages/PaletteGeneratorPage';
import CostEstimatorPage from './pages/CostEstimatorPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
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
          
          <div className="flex flex-col min-h-screen bg-[#F5F1E8] text-[#1A1A1A] font-sans">
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
                  {/* Digital Manufacturing & Color Tools */}
                  <Route path="/tools" element={<ToolsHubPage />} />
                  <Route path="/tools/pantone-matcher" element={<PantoneMatcherPage />} />
                  <Route path="/pantone-matcher" element={<Navigate to="/tools/pantone-matcher" replace />} />
                  <Route path="/tools/palette-generator" element={<PaletteGeneratorPage />} />
                  <Route path="/palette-generator" element={<Navigate to="/tools/palette-generator" replace />} />
                  <Route path="/tools/cost-estimator" element={<CostEstimatorPage />} />
                  <Route path="/cost-estimator" element={<Navigate to="/tools/cost-estimator" replace />} />

                  {/* Fabric Glossary Hub & Aliases */}
                  <Route path="/fabric-glossary" element={<FabricGlossaryPage />} />
                  <Route path="/resources/fabric-glossary" element={<Navigate to="/fabric-glossary" replace />} />
                  <Route path="/glossary" element={<Navigate to="/fabric-glossary" replace />} />
                  <Route path="/materials" element={<Navigate to="/fabric-glossary" replace />} />
                  <Route path="/fabrics" element={<Navigate to="/fabric-glossary" replace />} />
                  <Route path="/meet-hare" element={<MeetHarePage />} />
                  <Route path="/mascot" element={<Navigate to="/meet-hare" replace />} />
                  <Route path="/hurry" element={<Navigate to="/meet-hare" replace />} />

                  {/* Dedicated Target Country Service Pages */}
                  <Route path="/sports-wear-manufacturer-usa" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-us" element={<Navigate to="/sports-wear-manufacturer-usa" replace />} />
                  <Route path="/global-reach/usa" element={<Navigate to="/sports-wear-manufacturer-usa" replace />} />
                  <Route path="/usa" element={<Navigate to="/sports-wear-manufacturer-usa" replace />} />
                  <Route path="/global-reach/:countryCode" element={<CountryServicePage />} />

                  <Route path="/sports-wear-manufacturer-uk" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-australia" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-germany" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-canada" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-uae" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-france" element={<CountryServicePage />} />
                  <Route path="/sports-wear-manufacturer-netherlands" element={<CountryServicePage />} />
                  
                  {/* Dedicated Legal Pages */}
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />

                  {/* Catch-all dynamic route for any other country code or alias */}
                  <Route path="/sports-wear-manufacturer-:countryCode" element={<CountryServicePage />} />

                  {/* High-traffic standard B2B Aliases & Route Redirects */}
                  <Route path="/sports-wear-manufacturer" element={<Navigate to="/sports-wear-manufacturer-usa" replace />} />
                  <Route path="/sports-wear-manufacturers" element={<Navigate to="/sports-wear-manufacturer-usa" replace />} />
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
