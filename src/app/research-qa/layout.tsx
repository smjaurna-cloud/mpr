import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบงานวิจัยและประกันคุณภาพการศึกษา (MOD-12)",
  description: "คลังผลงานวิจัยพุทธศาสตร์ บันทึกข้อตกลงพุทธปัญญาประดิษฐ์ (MOU BAI สจล.) และระบบประกันคุณภาพ AUN-QA / EdPEx",
  openGraph: {
    title: "ระบบงานวิจัยและประกันคุณภาพการศึกษา (MOD-12) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "คลังผลงานวิจัยพุทธศาสตร์ บันทึกข้อตกลงพุทธปัญญาประดิษฐ์ (MOU BAI สจล.) และระบบประกันคุณภาพ AUN-QA / EdPEx",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
