"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Copy, Check, Download, QrCode as QrIcon } from "lucide-react";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  colorDark?: string;
  colorLight?: string;
  title?: string;
  subtitle?: string;
  showDownload?: boolean;
  showCopy?: boolean;
  className?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 180,
  colorDark = "#1e293b",
  colorLight = "#ffffff",
  title,
  subtitle,
  showDownload = true,
  showCopy = true,
  className = "",
}) => {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    QRCode.toDataURL(value, {
      width: size * 2, // 2x resolution for crispness
      margin: 1.5,
      color: {
        dark: colorDark,
        light: colorLight,
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (isMounted) {
          setDataUrl(url);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("QR Code generation error:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [value, size, colorDark, colorLight]);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `qrcode-${(title || value).replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-amber-200/80 shadow-sm ${className}`}>
      {/* Title & Subtitle */}
      {title && (
        <h4 className="text-sm font-semibold text-slate-800 text-center line-clamp-1 mb-0.5">
          {title}
        </h4>
      )}
      {subtitle && (
        <p className="text-[11px] text-slate-500 text-center mb-2 font-mono">
          {subtitle}
        </p>
      )}

      {/* QR Code Container */}
      <div 
        className="relative flex items-center justify-center bg-white p-1 rounded-lg border border-slate-100 shadow-inner"
        style={{ width: size, height: size }}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
            <QrIcon className="w-8 h-8 animate-pulse text-amber-500" />
            <span className="text-[10px]">กำลังสร้าง QR Code...</span>
          </div>
        ) : dataUrl ? (
          <img 
            src={dataUrl} 
            alt={title || "QR Code"} 
            className="w-full h-full object-contain rounded"
            style={{ width: size - 8, height: size - 8 }}
          />
        ) : (
          <span className="text-xs text-rose-500">สร้าง QR ไม่สำเร็จ</span>
        )}
      </div>

      {/* Action Buttons */}
      {(showCopy || showDownload) && (
        <div className="flex items-center gap-1.5 mt-2.5 w-full justify-center">
          {showCopy && (
            <button
              onClick={handleCopy}
              type="button"
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
              title="คัดลอกข้อความ/ลิงก์"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-600">คัดลอกแล้ว</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-500" />
                  <span>คัดลอก</span>
                </>
              )}
            </button>
          )}

          {showDownload && (
            <button
              onClick={handleDownload}
              type="button"
              disabled={!dataUrl}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors disabled:opacity-50"
              title="ดาวน์โหลดรูปภาพ QR Code (PNG)"
            >
              <Download className="w-3 h-3 text-amber-600" />
              <span>ดาวน์โหลด</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
