import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบหลักสูตรระดับบัณฑิตศึกษา มคอ.๒ (MOD-15)",
  description: "หลักสูตรระดับบัณฑิตศึกษา พธ.ด. และ พธ.ม. พระไตรปิฎกเถรวาท พระอภิธรรมปิฎก ๕๓ รายวิชา และประวัติคณาจารย์ผู้รับผิดชอบ",
  openGraph: {
    title: "ระบบหลักสูตรระดับบัณฑิตศึกษา มคอ.๒ (MOD-15) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "หลักสูตรระดับบัณฑิตศึกษา พธ.ด. และ พธ.ม. พระไตรปิฎกเถรวาท พระอภิธรรมปิฎก ๕๓ รายวิชา และประวัติคณาจารย์ผู้รับผิดชอบ",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
