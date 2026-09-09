import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบบริการการศึกษาและพันธกิจชุมชน (MOD-13)",
  description: "ตารางเรียนบาลีศากยบุตร โครงการบริการวิชาการแก่คณะสงฆ์ และหลักสูตรอบรมบาลีชุมชน",
  openGraph: {
    title: "ระบบบริการการศึกษาและพันธกิจชุมชน (MOD-13) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ตารางเรียนบาลีศากยบุตร โครงการบริการวิชาการแก่คณะสงฆ์ และหลักสูตรอบรมบาลีชุมชน",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
