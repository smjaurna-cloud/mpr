import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบเชื่อมโยงข้อมูลทะเบียนสงฆ์ MCU REG (MOD-05)",
  description: "ระบบเชื่อมโยงข้อมูลทะเบียนประวัติ ผลการศึกษา และการส่งออกข้อมูลมาตรฐาน MCU REG ไปยังส่วนกลาง มจร วังน้อย",
  openGraph: {
    title: "ระบบเชื่อมโยงข้อมูลทะเบียนสงฆ์ MCU REG (MOD-05) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบเชื่อมโยงข้อมูลทะเบียนประวัติ ผลการศึกษา และการส่งออกข้อมูลมาตรฐาน MCU REG ไปยังส่วนกลาง มจร วังน้อย",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
