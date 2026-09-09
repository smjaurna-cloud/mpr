import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบผังห้องเรียนและจัดชั้นเรียนบาลีสนามหลวง (MOD-14)",
  description: "ผังห้องเรียน A1-A6 การจัดชั้นเรียนบาลีสนามหลวงและนักธรรม อาจารย์ผู้สอน และมาตรการคุ้มครองข้อมูลส่วนบุคคล (PDPA)",
  openGraph: {
    title: "ระบบผังห้องเรียนและจัดชั้นเรียนบาลีสนามหลวง (MOD-14) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ผังห้องเรียน A1-A6 การจัดชั้นเรียนบาลีสนามหลวงและนักธรรม อาจารย์ผู้สอน และมาตรการคุ้มครองข้อมูลส่วนบุคคล (PDPA)",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
