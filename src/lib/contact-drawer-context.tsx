"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ContactDrawerContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  returnFocus: () => void;
}

const ContactDrawerContext = createContext<ContactDrawerContextValue | null>(
  null
);

export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const returnFocus = useCallback(() => {
    triggerRef.current?.focus?.();
    triggerRef.current = null;
  }, []);

  const value = useMemo(
    () => ({ isOpen, open, close, returnFocus }),
    [isOpen, open, close, returnFocus]
  );

  return (
    <ContactDrawerContext.Provider value={value}>
      {children}
    </ContactDrawerContext.Provider>
  );
}

export function useContactDrawer() {
  const ctx = useContext(ContactDrawerContext);
  if (!ctx) {
    throw new Error(
      "useContactDrawer debe usarse dentro de ContactDrawerProvider"
    );
  }
  return ctx;
}
