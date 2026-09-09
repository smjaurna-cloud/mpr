import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "วิถีชีวิตและสุขภาวะสามเณร ๒๔ ชม. (MOD-01)",
  description: "ระบบติดตามกิจวัตร ๒๔ ชม. สุขภาวะศากยบุตรสามเณรสีหะ บันทึกการทำวัตรสวดมนต์ บิณฑบาต กัมมัฏฐาน และเวชระเบียนสงฆ์",
  openGraph: {
    title: "วิถีชีวิตและสุขภาวะสามเณร ๒๔ ชม. (MOD-01) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบติดตามกิจวัตร ๒๔ ชม. สุขภาวะศากยบุตรสามเณรสีหะ บันทึกการทำวัตรสวดมนต์ บิณฑบาต กัมมัฏฐาน และเวชระเบียนสงฆ์",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
