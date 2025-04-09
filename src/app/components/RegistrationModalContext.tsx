'use client';
import { createContext, useContext, useState } from 'react';

const RegistrationModalContext = createContext<{
  isRegisterModalOpen: boolean;
  onRegisterOpen: () => void;
  onRegisterClose: () => void;
}>({
  isRegisterModalOpen: false,
  onRegisterOpen: () => {},
  onRegisterClose: () => {},
});

export const RegistrationModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const onRegisterOpen = () => setIsRegisterModalOpen(true);
  const onRegisterClose = () => setIsRegisterModalOpen(false);

  return (
    <RegistrationModalContext.Provider value={{ isRegisterModalOpen, onRegisterOpen, onRegisterClose }}>
      {children}
    </RegistrationModalContext.Provider>
  );
};

export const useRegistrationModal = () => useContext(RegistrationModalContext);
