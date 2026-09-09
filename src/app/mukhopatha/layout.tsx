import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบทดสอบมุขปาฐะบาลีและคลังคัมภีร์ (MOD-03)",
  description: "ระบบบันทึกและประเมินผลการสาธยายมุขปาฐะพระไตรปิฎก คัมภีร์ปทรูปสิทธิ และสัททนีติปกรณ์ โดยพระคัมภีราจารย์",
  openGraph: {
    title: "ระบบทดสอบมุขปาฐะบาลีและคลังคัมภีร์ (MOD-03) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบบันทึกและประเมินผลการสาธยายมุขปาฐะพระไตรปิฎก คัมภีร์ปทรูปสิทธิ และสัททนีติปกรณ์ โดยพระคัมภีราจารย์",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
