import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบบริหารงานบุคคลและอัตรากำลังสงฆ์ (MOD-08)",
  description: "ทำเนียบอัตรากำลัง ๓๖ อัตราทางการ คณาจารย์บรรพชิตและบุคลากรคฤหัสถ์ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
  openGraph: {
    title: "ระบบบริหารงานบุคคลและอัตรากำลังสงฆ์ (MOD-08) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ทำเนียบอัตรากำลัง ๓๖ อัตราทางการ คณาจารย์บรรพชิตและบุคลากรคฤหัสถ์ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
