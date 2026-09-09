import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบบริหารยานพาหนะและขอใช้รถส่วนกลาง (MOD-16)",
  description: "ระบบจองรถส่วนกลาง ๑๐ คัน ตารางการเดินทาง การจัดสัดส่วนที่นั่งตามพระวินัย และใบขอใช้รถราชการ A4 ทางการ",
  openGraph: {
    title: "ระบบบริหารยานพาหนะและขอใช้รถส่วนกลาง (MOD-16) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบจองรถส่วนกลาง ๑๐ คัน ตารางการเดินทาง การจัดสัดส่วนที่นั่งตามพระวินัย และใบขอใช้รถราชการ A4 ทางการ",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
