import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "กระดานสนทนาธรรมและห้องแชตสดรวม (MOD-19)",
  description: "กระดานสนทนาธรรม ๔ หมวดหมู่ บอทตอบคำถามอัตโนมัติ MCU Pali Bot ห้องแชตสด และระบบตรวจสอบความสุภาพตามพระวินัย",
  openGraph: {
    title: "กระดานสนทนาธรรมและห้องแชตสดรวม (MOD-19) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "กระดานสนทนาธรรม ๔ หมวดหมู่ บอทตอบคำถามอัตโนมัติ MCU Pali Bot ห้องแชตสด และระบบตรวจสอบความสุภาพตามพระวินัย",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
