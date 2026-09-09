import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ศูนย์รับเรื่องร้องเรียน QR Code และระบบติดตามภารกิจ (MOD-17)",
  description: "ศูนย์รับเรื่องร้องเรียน e-Complaint Center ระบบสร้าง QR Code ติดบอร์ด และระบบติดตามภารกิจราชการรวมศูนย์ ๗ ระบบ",
  openGraph: {
    title: "ศูนย์รับเรื่องร้องเรียน QR Code และระบบติดตามภารกิจ (MOD-17) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ศูนย์รับเรื่องร้องเรียน e-Complaint Center ระบบสร้าง QR Code ติดบอร์ด และระบบติดตามภารกิจราชการรวมศูนย์ ๗ ระบบ",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
