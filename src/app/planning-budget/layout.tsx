import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบแผนงานและกรอบงบประมาณประจำปี ๒๕๖๙ (MOD-10)",
  description: "กรอบงบประมาณแผ่นดินและรายได้ ๘๑.๓๙ ล้านบาท แผนยุทธศาสตร์ ๕ ปี และตัวชี้วัด KPI มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
  openGraph: {
    title: "ระบบแผนงานและกรอบงบประมาณประจำปี ๒๕๖๙ (MOD-10) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "กรอบงบประมาณแผ่นดินและรายได้ ๘๑.๓๙ ล้านบาท แผนยุทธศาสตร์ ๕ ปี และตัวชี้วัด KPI มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
