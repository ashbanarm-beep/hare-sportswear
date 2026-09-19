import React, { createContext, useContext, useState } from 'react';

const RFQContext = createContext();

export function RFQProvider({ children }) {
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState(null);
  const [isTechPackModalOpen, setIsTechPackModalOpen] = useState(false);

  // Safe no-ops to eliminate e-commerce cart/basket states entirely
  const inquiryBasket = [];
  const addToBasket = () => {};
  const removeFromBasket = () => {};
  const clearBasket = () => {};

  const openTechPackModal = () => setIsTechPackModalOpen(true);
  const closeTechPackModal = () => setIsTechPackModalOpen(false);

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
      closeTechPackModal
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
