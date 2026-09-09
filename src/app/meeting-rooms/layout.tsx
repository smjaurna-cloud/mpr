import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบจองห้องประชุมและสัมมนาอัจฉริยะ (MOD-07)",
  description: "ระบบจองห้องประชุมอัจฉริยะ ป้ายดิจิทัลหน้าห้อง ระบบควบคุมโสตทัศนูปกรณ์ IoT และจัดเตรียมน้ำปานะ",
  openGraph: {
    title: "ระบบจองห้องประชุมและสัมมนาอัจฉริยะ (MOD-07) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบจองห้องประชุมอัจฉริยะ ป้ายดิจิทัลหน้าห้อง ระบบควบคุมโสตทัศนูปกรณ์ IoT และจัดเตรียมน้ำปานะ",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
