import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบจัดการบัญชีผู้ใช้งานและสิทธิ์สงฆ์ (MOD-06)",
  description: "ระบบบริหารจัดการบัญชีผู้ใช้ บทบาทสิทธิ์การเข้าถึง (RBAC) สมณศักดิ์ ฉายาบาลี และบันทึกการลาสิกขาตามพระวินัย",
  openGraph: {
    title: "ระบบจัดการบัญชีผู้ใช้งานและสิทธิ์สงฆ์ (MOD-06) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบบริหารจัดการบัญชีผู้ใช้ บทบาทสิทธิ์การเข้าถึง (RBAC) สมณศักดิ์ ฉายาบาลี และบันทึกการลาสิกขาตามพระวินัย",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
