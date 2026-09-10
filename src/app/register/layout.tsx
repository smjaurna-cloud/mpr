import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สมัครเป็นสมาชิกใหม่และออกบัตรดิจิทัล | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
  description:
    "ลงทะเบียนสมัครเป็นสมาชิกใหม่ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย สำหรับพระภิกษุสงฆ์ ศากยบุตรสามเณร นิสิตบัณฑิตศึกษา คณาจารย์ บุคลากร และโยมอุปถัมภ์ พร้อมออกรหัสสมาชิก MBR และบัตรสมาชิกดิจิทัล",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
