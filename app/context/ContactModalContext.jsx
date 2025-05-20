"use client";
import React, { createContext, useContext, useState } from 'react';
import ContactModal from '../components/ContactModal';

const ContactModalContext = createContext({
  isModalOpen: false,
  openModal: () => {},
  closeModal: () => {}
});

// Hook personalizado para acceder al contexto
export const useContactModal = () => useContext(ContactModalContext);

// Proveedor del contexto
export const ContactModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ContactModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </ContactModalContext.Provider>
  );
};

export default ContactModalProvider; 