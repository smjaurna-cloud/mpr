import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบจัดการหลักสูตรการศึกษา มคอ.๒ (Academic Programs)",
  description: "ระบบบริหารจัดการและแก้ไขโครงสร้างหลักสูตรระดับบัณฑิตศึกษา พธ.ด. และ พธ.ม. พร้อมระบบนำเข้า-ส่งออก JSON",
  openGraph: {
    title: "ระบบจัดการหลักสูตรการศึกษา มคอ.๒ | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบบริหารจัดการและแก้ไขโครงสร้างหลักสูตรระดับบัณฑิตศึกษา พธ.ด. และ พธ.ม. พร้อมระบบนำเข้า-ส่งออก JSON",
  },
};

export default function AcademicProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
