import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)",
    short_name: "วส. มจร ERP",
    description: "ระบบบริหารจัดการสถาบันศาสนทายาท บาลีศากยบุตร และวิทยาลัยสงฆ์อัจฉริยะ ๒๓ โมดูล",
    start_url: "/",
    display: "standalone",
    background_color: "#fffbeb",
    theme_color: "#d97706",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
