"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { MobileNavProvider, useMobileNav } from "@/context/MobileNavContext";
import AdminGate from "@/components/AdminGate";
import MobileNavDrawer from "@/components/MobileNavDrawer";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobileInstallBanner from "@/components/MobileInstallBanner";

function MobileShell() {
  const { isDrawerOpen, closeDrawer, openMemberCard } = useMobileNav();
  return (
    <>
      <MobileNavDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onOpenMemberCard={openMemberCard}
      />
      <MobileInstallBanner />
      <MobileBottomNav />
    </>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MobileNavProvider>
        <AdminGate>
          {children}
          <MobileShell />
        </AdminGate>
      </MobileNavProvider>
    </AuthProvider>
  );
}
