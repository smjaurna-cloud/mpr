import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import QuickContactSpeedDial from "@/components/QuickContactSpeedDial";

export const metadata: Metadata = {
  title: {
    default: "ระบบบริหารจัดการ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
    template: "%s | มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
  },
  description:
    "Smart Pali Gurukula ERP - แพลตฟอร์มบริหารจัดการสถาบันศาสนทายาท บาลีศากยบุตร และวิทยาลัยสงฆ์อัจฉริยะ ๒๒ โมดูล มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
  applicationName: "Pali Gurukula ERP",
  keywords: [
    "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
    "วส. มจร",
    "บาลีเถรวาท",
    "ศากยบุตรสามเณรสีหะ",
    "กำแพงแสน นครปฐม",
    "วัดบาลีเถรวาทสังฆาราม",
    "พระไตรปิฎก",
    "มคอ.๒",
    "พธ.ด. พระไตรปิฎกเถรวาท",
    "พุทธปัญญาประดิษฐ์",
    "Buddhist AI",
    "ระบบบริหารวิทยาลัยสงฆ์"
  ],
  authors: [{ name: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย" }],
  creator: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
  publisher: "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร)",
  metadataBase: new URL("https://palitheravada.mcu.ac.th"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://palitheravada.mcu.ac.th",
    siteName: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
    title: "ระบบบริหารจัดการ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
    description:
      "Smart Pali Gurukula ERP - แพลตฟอร์มบริหารจัดการสถาบันศาสนทายาทและบาลีศากยบุตรอัจฉริยะ ๒๒ โมดูล",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ระบบบริหารจัดการ มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
    description:
      "Smart Pali Gurukula ERP - แพลตฟอร์มบริหารจัดการสถาบันศาสนทายาทและบาลีศากยบุตรอัจฉริยะ ๒๒ โมดูล",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://palitheravada.mcu.ac.th/#organization",
      name: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย",
      alternateName: "วส. มจร",
      url: "https://palitheravada.mcu.ac.th",
      logo: "https://palitheravada.mcu.ac.th/favicon.ico",
      description:
        "โครงการสร้างศาสนทายาท ศากยบุตรสามเณรสีหะ ผู้สืบทอดและทรงจำพระไตรปิฎกบาลีเถรวาท สังกัดมหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
      address: {
        "@type": "PostalAddress",
        streetAddress: "เลขที่ ๑๐๑ หมู่ ๕ วัดบาลีเถรวาทสังฆาราม ตำบลรางพิกุล",
        addressLocality: "อำเภอกำแพงแสน",
        addressRegion: "จังหวัดนครปฐม",
        postalCode: "73140",
        addressCountry: "TH",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+66-34-351-899",
        contactType: "Admissions and General Inquiries",
        availableLanguage: ["Thai", "Pali", "English"],
      },
      sameAs: [
        "https://www.facebook.com/MahavajiralongkornPaliTheravada",
        "https://palitheravada.mcu.ac.th",
        "https://mcu.ac.th",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://palitheravada.mcu.ac.th/#website",
      url: "https://palitheravada.mcu.ac.th",
      name: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
      publisher: {
        "@id": "https://palitheravada.mcu.ac.th/#organization",
      },
      inLanguage: "th-TH",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#faf8f5] text-slate-900 antialiased selection:bg-amber-200">
        <Navbar />
        <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
          <Sidebar />
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
        <Footer />
        <QuickContactSpeedDial />
      </body>
    </html>
  );
}
