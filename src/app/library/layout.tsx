import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "หอสมุดพระไตรปิฎกและคลังสารสนเทศบาลี (MOD-11)",
  description: "คลังพระไตรปิฎกสยามรัฐ ๔๕ เล่ม คัมภีร์สัททาวิเสสโบราณ หนังสือวิชาการ และคลังเอกสารทางการสถาบัน",
  openGraph: {
    title: "หอสมุดพระไตรปิฎกและคลังสารสนเทศบาลี (MOD-11) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "คลังพระไตรปิฎกสยามรัฐ ๔๕ เล่ม คัมภีร์สัททาวิเสสโบราณ หนังสือวิชาการ และคลังเอกสารทางการสถาบัน",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
