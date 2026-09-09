import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบสารบรรณและการเกษียณหนังสืออิเล็กทรอนิกส์ (MOD-04)",
  description: "ระบบสารบรรณด่วน ลงนามดิจิทัล และเกษียณหนังสือราชการผ่านมือถือสำหรับผู้บริหารและคณาจารย์",
  openGraph: {
    title: "ระบบสารบรรณและการเกษียณหนังสืออิเล็กทรอนิกส์ (MOD-04) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบสารบรรณด่วน ลงนามดิจิทัล และเกษียณหนังสือราชการผ่านมือถือสำหรับผู้บริหารและคณาจารย์",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
