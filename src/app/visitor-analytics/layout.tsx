import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบสถิติข้อมูลผู้เข้าเยี่ยมชมและทราฟฟิก (MOD-18)",
  description: "แดชบอร์ดสถิติผู้เข้าชมสด Real-time สถิติรายวัน รายเดือน สัดส่วนอุปกรณ์ และสถิติตามภูมิภาค",
  openGraph: {
    title: "ระบบสถิติข้อมูลผู้เข้าเยี่ยมชมและทราฟฟิก (MOD-18) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "แดชบอร์ดสถิติผู้เข้าชมสด Real-time สถิติรายวัน รายเดือน สัดส่วนอุปกรณ์ และสถิติตามภูมิภาค",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
