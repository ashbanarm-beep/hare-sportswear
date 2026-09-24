import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import TechPackModal from './components/common/TechPackModal';
import ScissorCursor from './components/common/ScissorCursor';
import ErrorBoundary from './components/common/ErrorBoundary';
import SEOHead from './components/seo/SEOHead';
import { RFQProvider } from './context/RFQContext';
import { CMSProvider } from './context/CMSContext';

// Primary Pages
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
import AIMockupGeneratorPage from './pages/AIMockupGeneratorPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

// Admin CMS & Page Editor Suite
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardOverview from './pages/admin/AdminDashboardOverview';
import AdminPageEditor from './pages/admin/AdminPageEditor';
import AdminBlogManager from './pages/admin/AdminBlogManager';
import AdminSEOManager from './pages/admin/AdminSEOManager';
import AdminFAQManager from './pages/admin/AdminFAQManager';

// Instant scroll to top on route change without blocking animations
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainAppShell() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className={`flex flex-col min-h-screen ${isAdmin ? 'bg-[#FAF8F5]' : 'bg-[#F5F1E8]'} text-[#1A1A1A] font-sans`}>
      <SEOHead />
      <ScrollToTop />
      <ScissorCursor />

      {/* Conditionally render public customer navbar */}
      {!isAdmin && (
        <ErrorBoundary name="Navbar">
          <Navbar />
        </ErrorBoundary>
      )}

      <main className="flex-1">
        <ErrorBoundary name="MainContent">
          <Routes>
            {/* Primary Customer Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/custom-manufacturing" element={<CustomManufacturingPage />} />
            <Route path="/quality" element={<QualityPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />

            {/* Admin CMS & Elementor-Style Page Builder Routes */}
            <Route path="/admin" element={<AdminLayout activeTab="overview"><AdminDashboardOverview /></AdminLayout>} />
            <Route path="/admin/" element={<AdminLayout activeTab="overview"><AdminDashboardOverview /></AdminLayout>} />
            <Route path="/admin/pages" element={<AdminLayout activeTab="pages"><AdminPageEditor /></AdminLayout>} />
            <Route path="/admin/pages/" element={<Navigate to="/admin/pages" replace />} />
            <Route path="/admin/blog" element={<AdminLayout activeTab="blog"><AdminBlogManager /></AdminLayout>} />
            <Route path="/admin/blog/" element={<Navigate to="/admin/blog" replace />} />
            <Route path="/admin/seo" element={<AdminLayout activeTab="seo"><AdminSEOManager /></AdminLayout>} />
            <Route path="/admin/seo/" element={<Navigate to="/admin/seo" replace />} />
            <Route path="/admin/faqs" element={<AdminLayout activeTab="faqs"><AdminFAQManager /></AdminLayout>} />
            <Route path="/admin/faqs/" element={<Navigate to="/admin/faqs" replace />} />
            <Route path="/admin/settings" element={<AdminLayout activeTab="settings"><AdminDashboardOverview /></AdminLayout>} />
            <Route path="/admin/settings/" element={<Navigate to="/admin/settings" replace />} />

            {/* Digital Manufacturing & Color Tools */}
            <Route path="/tools" element={<ToolsHubPage />} />
            <Route path="/tools/ai-mockup-generator" element={<AIMockupGeneratorPage />} />
            <Route path="/ai-mockup-generator" element={<Navigate to="/tools/ai-mockup-generator" replace />} />
            <Route path="/tools/pantone-matcher" element={<PantoneMatcherPage />} />
            <Route path="/pantone-matcher" element={<Navigate to="/tools/pantone-matcher" replace />} />
            <Route path="/tools/palette-generator" element={<PaletteGeneratorPage />} />
            <Route path="/palette-generator" element={<Navigate to="/tools/palette-generator" replace />} />
            <Route path="/tools/cost-estimator" element={<CostEstimatorPage />} />
            <Route path="/cost-estimator" element={<Navigate to="/tools/cost-estimator" replace />} />
            <Route path="/tools/manufacturing-cost-calculator" element={<CostEstimatorPage />} />
            <Route path="/manufacturing-cost-calculator" element={<Navigate to="/tools/cost-estimator" replace />} />

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

      {/* Conditionally render public customer footer and floats */}
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
      <TechPackModal />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary name="RootApplication">
      <CMSProvider>
        <RFQProvider>
          <BrowserRouter>
            <MainAppShell />
          </BrowserRouter>
        </RFQProvider>
      </CMSProvider>
    </ErrorBoundary>
  );
}
