import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบสมาชิกและบุคลากร | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
  description:
    "เข้าสู่ระบบสารสนเทศมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัยด้วย ชื่อ และรหัสสมาชิก/รหัสนิสิต/รหัสตำแหน่ง/เลขประจำตัวประชาชน หรือเข้าสู่ระบบด้วย Google",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
