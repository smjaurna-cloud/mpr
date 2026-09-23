"use client";

import React, { useState, useEffect } from "react";
import { Download, Share, X, Smartphone, Sparkles, CheckCircle2 } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function MobileInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true); // default true until verified
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed as PWA)
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isInStandaloneMode) {
      setIsStandalone(true);
      return;
    }

    // Check if dismissed before
    const dismissed = localStorage.getItem("mvu_mobile_install_banner_dismissed");
    if (!dismissed) {
      setIsDismissed(false);
    }

    // Detect User Agent
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    const isAndroidDevice = /android/.test(ua);

    setIsIOS(isIosDevice);
    setIsAndroid(isAndroidDevice);

    // Listen for Android beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsDismissed(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("mvu_mobile_install_banner_dismissed", "true");
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstallSuccess(true);
        setTimeout(() => {
          setIsDismissed(true);
        }, 3000);
      }
      setDeferredPrompt(null);
    } catch (err) {
      console.error("Install prompt error:", err);
    }
  };

  // If running standalone, dismissed, or on a non-mobile desktop browser without install prompt, don't show
  if (isStandalone || isDismissed) {
    return null;
  }

  // Only show on iOS or Android, or if deferredPrompt is available
  if (!isIOS && !isAndroid && !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-16 inset-x-2 z-30 md:hidden animate-slideUp">
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white rounded-2xl p-3.5 shadow-2xl border border-amber-500/40 backdrop-blur-md">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
              <Smartphone className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-amber-100">
                  {isIOS ? "ติดตั้งบน iPhone / iPad" : "ติดตั้งแอป วส. มจร"}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 text-[9px] font-semibold border border-amber-400/30">
                  {isIOS ? "iOS Standalone" : "Android WebAPK"}
                </span>
              </div>

              {installSuccess ? (
                <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ติดตั้งแอปลงในโทรศัพท์เรียบร้อยแล้ว</span>
                </p>
              ) : isIOS ? (
                <p className="text-[11px] text-amber-200/90 leading-tight">
                  แตะปุ่มแชร์ <Share className="w-3 h-3 inline text-amber-300 mx-0.5" /> ที่แถบขอบล่างของ Safari แล้วเลือก{" "}
                  <strong className="text-amber-100">&quot;เพิ่มไปยังหน้าจอโฮม&quot; (Add to Home Screen)</strong> เพื่อเปิดใช้งานเต็มจอเสมือนแอปแท้
                </p>
              ) : deferredPrompt ? (
                <p className="text-[11px] text-amber-200/90 leading-tight">
                  ติดตั้งแอประบบลงโทรศัพท์ (Samsung, Xiaomi, OPPO, Vivo) เพื่อเปิดใช้งานรวดเร็วและเต็มจอ
                </p>
              ) : (
                <p className="text-[11px] text-amber-200/90 leading-tight">
                  แตะเมนูจุดสามจุด <strong className="text-white">⋮</strong> มุมบนขวา แล้วเลือก{" "}
                  <strong className="text-amber-100">&quot;ติดตั้งแอป&quot;</strong> หรือ &quot;เพิ่มลงหน้าจอหลัก&quot;
                </p>
              )}

              {deferredPrompt && !installSuccess && (
                <div className="pt-1.5">
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ติดตั้งแอปลงเครื่องทันที</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 text-amber-300/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="ปิดการแจ้งเตือนติดตั้งแอป"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
