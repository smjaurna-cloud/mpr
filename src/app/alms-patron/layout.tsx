import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบภัตตาหารเพลและโยมอุปถัมภ์ (MOD-02)",
  description: "ระบบปฏิทินจองเป็นเจ้าภาพภัตตาหารเพล ถวายน้ำปานะ และระบบ e-Donation ลดหย่อนภาษี ๒ เท่า มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
  openGraph: {
    title: "ระบบภัตตาหารเพลและโยมอุปถัมภ์ (MOD-02) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบปฏิทินจองเป็นเจ้าภาพภัตตาหารเพล ถวายน้ำปานะ และระบบ e-Donation ลดหย่อนภาษี ๒ เท่า มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
