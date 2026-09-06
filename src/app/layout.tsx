import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "ระบบบริหารจัดการ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
  description: "Smart Pali Gurukula Platform - ระบบบริหารจัดการสถาบันศาสนทายาทและบาลีศากยบุตรอัจฉริยะ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen flex flex-col bg-[#faf8f5] text-slate-900 antialiased selection:bg-amber-200">
        <Navbar />
        <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
          <Sidebar />
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
