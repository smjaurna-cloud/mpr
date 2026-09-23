import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เชื่อมต่อโทรศัพท์มือถือ (Android & iOS QR Code)",
  description:
    "เชื่อมต่อโทรศัพท์มือถือ Android และ iOS เข้าสู่ระบบ ERP มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย ผ่าน Wi-Fi และ QR Code",
};

export default function MobileConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
