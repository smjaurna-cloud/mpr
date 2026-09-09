import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบเปิดอ่านเอกสารราชการและพรีวิวไฟล์งาน (MOD-22)",
  description: "ระบบแปลงและเปิดอ่านเอกสาร Word (DOCX), Excel (XLSX), PDF ออนไลน์ พร้อมแถบเครื่องมือ ย่อ-ขยาย พิมพ์ และส่งออกข้อความ",
  openGraph: {
    title: "ระบบเปิดอ่านเอกสารราชการและพรีวิวไฟล์งาน (MOD-22) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบแปลงและเปิดอ่านเอกสาร Word (DOCX), Excel (XLSX), PDF ออนไลน์ พร้อมแถบเครื่องมือ ย่อ-ขยาย พิมพ์ และส่งออกข้อความ",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
