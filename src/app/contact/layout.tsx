import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ศูนย์บริการข้อมูลและช่องทางติดต่อราชการ (MOD-21)",
  description: "ช่องทางติดต่อทางการ วัดบาลีเถรวาทสังฆาราม แผนผังอาคาร ๗ อาคาร หมายเลขภายใน ๘ ฝ่ายงาน แผนที่ดาวเทียม และแบบฟอร์ม Q&A ITA",
  openGraph: {
    title: "ศูนย์บริการข้อมูลและช่องทางติดต่อราชการ (MOD-21) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ช่องทางติดต่อทางการ วัดบาลีเถรวาทสังฆาราม แผนผังอาคาร ๗ อาคาร หมายเลขภายใน ๘ ฝ่ายงาน แผนที่ดาวเทียม และแบบฟอร์ม Q&A ITA",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
