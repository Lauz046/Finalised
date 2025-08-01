import React, { createContext, useContext, useState, useCallback } from 'react';

export interface EnquiryProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
}

interface EnquiryPanelContextType {
  isOpen: boolean;
  product: EnquiryProduct | null;
  chatActive: boolean;
  openPanel: (product: EnquiryProduct) => void;
  closePanel: () => void;
  startChat: () => void;
  endChat: () => void;
}

const EnquiryPanelContext = createContext<EnquiryPanelContextType | undefined>(undefined);

export const EnquiryPanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<EnquiryProduct | null>(null);
  const [chatActive, setChatActive] = useState(false);

  const openPanel = useCallback((product: EnquiryProduct) => {
    setProduct(product);
    setIsOpen(true);
    setChatActive(false);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
    setChatActive(false);
    setTimeout(() => setProduct(null), 400); // allow panel to animate out
  }, []);

  const startChat = useCallback(() => setChatActive(true), []);
  const endChat = useCallback(() => setChatActive(false), []);

  return (
    <EnquiryPanelContext.Provider value={{ isOpen, product, chatActive, openPanel, closePanel, startChat, endChat }}>
      {children}
    </EnquiryPanelContext.Provider>
  );
};

export function useEnquiryPanel() {
  const ctx = useContext(EnquiryPanelContext);
  if (!ctx) throw new Error('useEnquiryPanel must be used within an EnquiryPanelProvider');
  return ctx;
} 