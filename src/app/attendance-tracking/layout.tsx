import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบบันทึกเวลาปฏิบัติศาสนกิจและภารกิจราชการ",
  description: "ระบบบันทึกเวลาทำวัตร สวดมนต์ กิจวัตรสงฆ์ และการปฏิบัติหน้าที่ของคณาจารย์และเจ้าหน้าที่",
  openGraph: {
    title: "ระบบบันทึกเวลาปฏิบัติศาสนกิจและภารกิจราชการ | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบบันทึกเวลาทำวัตร สวดมนต์ กิจวัตรสงฆ์ และการปฏิบัติหน้าที่ของคณาจารย์และเจ้าหน้าที่",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
