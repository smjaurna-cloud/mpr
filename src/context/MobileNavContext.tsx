"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface MobileNavContextType {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  isMemberCardOpen: boolean;
  openMemberCard: () => void;
  closeMemberCard: () => void;
}

const MobileNavContext = createContext<MobileNavContextType | undefined>(undefined);

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMemberCardOpen, setIsMemberCardOpen] = useState(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);

  const openMemberCard = useCallback(() => setIsMemberCardOpen(true), []);
  const closeMemberCard = useCallback(() => setIsMemberCardOpen(false), []);

  return (
    <MobileNavContext.Provider
      value={{
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        isMemberCardOpen,
        openMemberCard,
        closeMemberCard,
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
}

export function useMobileNav(): MobileNavContextType {
  const context = useContext(MobileNavContext);
  if (!context) {
    throw new Error("useMobileNav must be used within a MobileNavProvider");
  }
  return context;
}
