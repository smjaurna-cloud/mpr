import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ระบบการเงิน บัญชีกองทุน และพัสดุสงฆ์ (MOD-09)",
  description: "ระบบบัญชี ๓ กองทุนสงฆ์ บัญชีรายรับรายจ่าย คลังสังฆภัณฑ์ และการจัดซื้อจัดจ้างตามระเบียบพัสดุ มจร",
  openGraph: {
    title: "ระบบการเงิน บัญชีกองทุน และพัสดุสงฆ์ (MOD-09) | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    description: "ระบบบัญชี ๓ กองทุนสงฆ์ บัญชีรายรับรายจ่าย คลังสังฆภัณฑ์ และการจัดซื้อจัดจ้างตามระเบียบพัสดุ มจร",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
