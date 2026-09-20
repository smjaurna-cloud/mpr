"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import AdminGate from "@/components/AdminGate";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminGate>{children}</AdminGate>
    </AuthProvider>
  );
}
