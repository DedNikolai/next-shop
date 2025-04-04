// src/app/ModalWrapper.tsx
'use client';

import LoginModal from "./LoginModal";
import { useLoginModal } from "./LoginModalContext";



export default function ModalWrapper() {
  const { isOpen } = useLoginModal();

  return isOpen ? <LoginModal /> : null;
}
