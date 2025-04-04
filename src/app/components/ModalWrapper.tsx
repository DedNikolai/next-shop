// src/app/ModalWrapper.tsx
'use client';

import LoginModal from "./LoginModal";
import { useLoginModal } from "./LoginModalContext";



export default function ModalWrapper() {
  const { isOpen, close } = useLoginModal();

  return isOpen ? <LoginModal /> : null;
}
