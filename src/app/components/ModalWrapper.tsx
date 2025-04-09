// src/app/ModalWrapper.tsx
'use client';

import LoginModal from "./LoginModal";
import { useLoginModal } from "./LoginModalContext";
import RegisterModal from "./RegisterModal";
import { useRegistrationModal } from "./RegistrationModalContext";



export default function ModalWrapper() {
  const { isOpen } = useLoginModal();
  const {isRegisterModalOpen} = useRegistrationModal();

  return (
    <>
      {isOpen ? <LoginModal /> : null}
      {isRegisterModalOpen ? <RegisterModal /> : null}
    </>
  );
}
