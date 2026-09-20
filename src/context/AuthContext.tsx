"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  AuthUser, 
  initialAuthUsers, 
  IdentifierType 
} from "@/data/authData";
import { RegisterFormData } from "@/types/common";
import { getErrorMessage } from "@/lib/utils";

interface AuthContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    identifierName: string, 
    secretCode: string, 
    idType?: IdentifierType
  ) => Promise<{ success: boolean; message?: string; error?: string }>;
  loginWithGoogle: (
    email: string, 
    name?: string, 
    avatar?: string
  ) => Promise<{ success: boolean; message?: string; error?: string }>;
  register: (
    formData: RegisterFormData | Record<string, unknown>
  ) => Promise<{ success: boolean; message?: string; error?: string; user?: AuthUser }>;
  logout: () => void;
  switchPersona: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "mpr_auth_session_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Strict mode: default to null so user must log in
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) {
          setCurrentUser(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not read auth session from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save session when user changes
  const updateSessionUser = (user: AuthUser | null) => {
    setCurrentUser(user);
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn("Could not save auth session to localStorage", e);
    }
  };

  const login = async (
    identifierName: string, 
    secretCode: string, 
    idType: IdentifierType = "ALL"
  ) => {
    // Check if matching custom admin password from first-run setup
    try {
      const customPass = typeof window !== "undefined" ? localStorage.getItem("mvu_admin_custom_password") : null;
      if (customPass && secretCode === customPass) {
        const idLower = identifierName.trim().toLowerCase();
        if (
          idLower === "somboon" ||
          idLower === "smjaurna@gmail.com" ||
          idLower === "admin" ||
          identifierName.includes("สมบูรณ์") ||
          idLower === "pos-admin-001" ||
          idLower === "mbr-somboon"
        ) {
          const superAdmin = initialAuthUsers[0];
          updateSessionUser(superAdmin);
          return { success: true, message: `เข้าสู่ระบบสำเร็จในฐานะผู้ดูแลระบบหลัก (${superAdmin.fullName})` };
        }
      }
    } catch {
      // Ignore and proceed to API
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifierName, secretCode, idType }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        updateSessionUser(data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error || "ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง" };
      }
    } catch (err: unknown) {
      return { success: false, error: getErrorMessage(err, "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์") };
    }
  };

  const loginWithGoogle = async (email: string, name?: string, avatar?: string) => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, avatarUrl: avatar }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        updateSessionUser(data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error || "เกิดข้อผิดพลาดในการเข้าสู่ระบบด้วย Google" };
      }
    } catch (err: unknown) {
      return { success: false, error: getErrorMessage(err, "ไม่สามารถเชื่อมต่อกับบริการ Google Authentication ได้") };
    }
  };

  const register = async (formData: RegisterFormData | Record<string, unknown>) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success && data.user) {
        updateSessionUser(data.user);
        return { success: true, message: data.message, user: data.user };
      } else {
        return { success: false, error: data.error || "การสมัครสมาชิกไม่สำเร็จ" };
      }
    } catch (err: unknown) {
      return { success: false, error: getErrorMessage(err, "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์") };
    }
  };

  const logout = () => {
    updateSessionUser(null);
  };

  const switchPersona = (userId: string) => {
    const target = initialAuthUsers.find((u) => u.id === userId);
    if (target) {
      updateSessionUser(target);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        switchPersona,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
