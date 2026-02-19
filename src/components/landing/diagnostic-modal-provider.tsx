'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { DiagnosticFormModal } from './diagnostic-form-modal';

const DiagnosticModalContext = createContext<{ openModal: () => void }>({
  openModal: () => {},
});

export function useDiagnosticModal() {
  return useContext(DiagnosticModalContext);
}

export function DiagnosticModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <DiagnosticModalContext.Provider value={{ openModal }}>
      {children}
      <DiagnosticFormModal isOpen={isOpen} onClose={closeModal} />
    </DiagnosticModalContext.Provider>
  );
}
