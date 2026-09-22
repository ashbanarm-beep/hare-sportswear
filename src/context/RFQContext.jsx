import React, { createContext, useContext, useState } from 'react';

const RFQContext = createContext();

export function RFQProvider({ children }) {
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState(null);
  const [isTechPackModalOpen, setIsTechPackModalOpen] = useState(false);
  
  // Digital Tools State (Pantone, Cost Estimator & AI Mockup Generator)
  const [attachedColors, setAttachedColors] = useState([]);
  const [attachedEstimate, setAttachedEstimate] = useState(null);
  const [attachedMockup, setAttachedMockup] = useState(null);

  // Safe no-ops to eliminate e-commerce cart/basket states entirely
  const inquiryBasket = [];
  const addToBasket = () => {};
  const removeFromBasket = () => {};
  const clearBasket = () => {};

  const openTechPackModal = () => setIsTechPackModalOpen(true);
  const closeTechPackModal = () => setIsTechPackModalOpen(false);

  // Attach Pantone colors to RFQ
  const attachColorsToRFQ = (colors) => {
    // Array of { name, pms, hex, role } or single color
    if (Array.isArray(colors)) {
      setAttachedColors(colors);
    } else if (colors) {
      setAttachedColors([colors]);
    }
  };

  const clearAttachedColors = () => setAttachedColors([]);

  // Attach Cost Estimate to RFQ
  const attachEstimateToRFQ = (estimate) => {
    setAttachedEstimate(estimate);
  };

  const clearAttachedEstimate = () => setAttachedEstimate(null);

  // Attach AI Mockup Prototype to RFQ
  const attachMockupToRFQ = (mockup) => {
    setAttachedMockup(mockup);
  };

  const clearAttachedMockup = () => setAttachedMockup(null);

  return (
    <RFQContext.Provider value={{
      inquiryBasket,
      addToBasket,
      removeFromBasket,
      clearBasket,
      selectedProductForInquiry,
      setSelectedProductForInquiry,
      isTechPackModalOpen,
      setIsTechPackModalOpen,
      openTechPackModal,
      closeTechPackModal,
      // Tools state
      attachedColors,
      attachColorsToRFQ,
      clearAttachedColors,
      attachedEstimate,
      attachEstimateToRFQ,
      clearAttachedEstimate,
      attachedMockup,
      attachMockupToRFQ,
      clearAttachedMockup
    }}>
      {children}
    </RFQContext.Provider>
  );
}

export function useRFQ() {
  const context = useContext(RFQContext);
  if (!context) {
    throw new Error('useRFQ must be used within an RFQProvider');
  }
  return context;
}
