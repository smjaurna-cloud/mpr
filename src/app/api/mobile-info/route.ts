import { NextResponse } from "next/server";
import os from "node:os";
import QRCode from "qrcode";
import { apiSuccess } from "@/lib/apiResponse";

export async function GET() {
  const interfaces = os.networkInterfaces();
  const addresses: { iface: string; ip: string; isWifi: boolean }[] = [];

  for (const [name, netList] of Object.entries(interfaces)) {
    if (!netList) continue;
    for (const net of netList) {
      // IPv4 only, not internal/loopback
      if (net.family === "IPv4" && !net.internal && !net.address.startsWith("169.254")) {
        const isWifi = /wi-?fi|wireless|wlan/i.test(name);
        addresses.push({
          iface: name,
          ip: net.address,
          isWifi,
        });
      }
    }
  }

  // Prioritize Wi-Fi addresses, then Ethernet
  addresses.sort((a, b) => (b.isWifi ? 1 : 0) - (a.isWifi ? 1 : 0));

  const primaryIp = addresses.length > 0 ? addresses[0].ip : "127.0.0.1";
  const port = process.env.PORT || "3001";
  const mobileUrl = `http://${primaryIp}:${port}`;

  let qrCodeDataUrl = "";
  try {
    qrCodeDataUrl = await QRCode.toDataURL(mobileUrl, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 320,
      color: {
        dark: "#78350f", // Saffron amber deep
        light: "#fffbeb", // Warm ivory background
      },
    });
  } catch (err) {
    console.error("QR Code generation error:", err);
  }

  return apiSuccess({
    primaryIp,
    port,
    mobileUrl,
    addresses,
    qrCodeDataUrl,
    instructions: {
      android: {
        os: "Android (แอนดรอยด์)",
        brands: ["Samsung", "Xiaomi", "OPPO", "Vivo", "Realme", "Google Pixel"],
        browsers: ["Google Chrome", "Samsung Internet", "Microsoft Edge"],
        steps: [
          "เชื่อมต่อโทรศัพท์มือถือเข้ากับเครือข่าย Wi-Fi เดียวกันกับคอมพิวเตอร์เครื่องนี้",
          "เปิดแอป 'กล้องถ่ายรูป' (Camera) หรือ Google Lens แล้วส่องที่ QR Code ด้านบน",
          "แตะลิงก์ที่ปรากฏเพื่อเปิดเบราว์เซอร์ Chrome หรือ Samsung Internet",
          "แตะเมนู ⋮ (จุดสามจุด) มุมขวาบน แล้วเลือก 'ติดตั้งแอป' (Install App) หรือ 'เพิ่มลงในหน้าจอหลัก'",
        ],
      },
      ios: {
        os: "iOS (ไอโอเอส)",
        devices: ["iPhone ทุกรุ่น (รวม Dynamic Island & Notch)", "iPad ทุกรุ่น"],
        browsers: ["Safari", "Google Chrome"],
        steps: [
          "เชื่อมต่อ iPhone หรือ iPad เข้ากับเครือข่าย Wi-Fi เดียวกันกับคอมพิวเตอร์",
          "เปิดแอป 'กล้อง' (Camera) ส่องที่ QR Code ด้านบน แล้วแตะแถบสีเหลืองที่ขึ้นมาเพื่อเปิดใน Safari",
          "เมื่อหน้าเว็บเปิดขึ้นมา แตะปุ่มแชร์ [Share] (ไอคอนสี่เหลี่ยมมีลูกศรชี้ขึ้น) ที่แถบล่างสุดของจอ",
          "เลื่อนลงแล้วแตะเลือก 'เพิ่มไปยังหน้าจอโฮม' (Add to Home Screen) แล้วกด 'เพิ่ม' (Add)",
          "ไอคอนสีทอง 'วส. มจร' จะปรากฏบนหน้าจอโฮม สามารถแตะเปิดใช้งานเต็มจอเสมือนแอปแท้ได้ทันที",
        ],
      },
    },
  });
}
