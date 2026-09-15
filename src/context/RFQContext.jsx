import React, { createContext, useContext, useState } from 'react';

const RFQContext = createContext();

export function RFQProvider({ children }) {
  const [inquiryBasket, setInquiryBasket] = useState([]);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState(null);
  const [isTechPackModalOpen, setIsTechPackModalOpen] = useState(false);

  const addToBasket = (product) => {
    if (!inquiryBasket.some(item => item.id === product.id)) {
      setInquiryBasket(prev => [...prev, product]);
    }
  };

  const removeFromBasket = (productId) => {
    setInquiryBasket(prev => prev.filter(item => item.id !== productId));
  };

  const clearBasket = () => {
    setInquiryBasket([]);
  };

  return (
    <RFQContext.Provider value={{
      inquiryBasket,
      addToBasket,
      removeFromBasket,
      clearBasket,
      selectedProductForInquiry,
      setSelectedProductForInquiry,
      isTechPackModalOpen,
      setIsTechPackModalOpen
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
