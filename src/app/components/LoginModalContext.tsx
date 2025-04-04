// src/context/LoginModalContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type LoginModalContextType = {
  isOpen: boolean;
  open: () => void;
  onClose: () => void;
};

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export function LoginModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider value={{ isOpen, open, onClose }}>
      {children}
    </LoginModalContext.Provider>
  );
}

export function useLoginModal() {
  const context = useContext(LoginModalContext);
  if (!context) throw new Error('useLoginModal must be used within LoginModalProvider');
  return context;
}
