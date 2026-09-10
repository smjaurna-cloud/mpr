import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ศูนย์กลางอัปเดตและจัดการข้อมูลทุกระบบ (MOD-23)",
  description:
    "ช่องทางบริหารจัดการ ปรับปรุง เพิ่มเติม และซิงค์ข้อมูลให้เป็นปัจจุบันครบทั้ง ๒๒ โมดูล โดย Super Admin และแอดมินประจำระบบ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
  openGraph: {
    title: "ศูนย์กลางอัปเดตและจัดการข้อมูลทุกระบบ (MOD-23) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description:
      "ช่องทางบริหารจัดการ ปรับปรุง เพิ่มเติม และซิงค์ข้อมูลให้เป็นปัจจุบันครบทั้ง ๒๒ โมดูล โดย Super Admin และแอดมินประจำระบบ",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
