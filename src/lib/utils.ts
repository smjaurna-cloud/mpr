import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatThaiCurrency(amount: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}

const thaiDigits = ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"];

export function toThaiDigits(num: number | string): string {
  return String(num).replace(/[0-9]/g, (digit) => thaiDigits[parseInt(digit, 10)]);
}

const thaiMonths = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

const thaiShortMonths = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];

export function formatThaiDate(
  dateInput: string | Date,
  options?: { useThaiDigits?: boolean; shortMonth?: boolean }
): string {
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return String(dateInput);

  const day = d.getDate();
  const month = options?.shortMonth ? thaiShortMonths[d.getMonth()] : thaiMonths[d.getMonth()];
  const year = d.getFullYear() + 543;

  const result = `${day} ${month} ${year}`;
  return options?.useThaiDigits ? toThaiDigits(result) : result;
}

export function maskPhone(phone: string): string {
  if (!phone || phone.length < 8) return phone;
  const clean = phone.replace(/[^0-9]/g, "");
  if (clean.length === 10) {
    return `${clean.slice(0, 3)}-xxx-${clean.slice(6)}`;
  } else if (clean.length === 9) {
    return `${clean.slice(0, 2)}-xxx-${clean.slice(5)}`;
  }
  return phone.replace(/(\d{3})\d{3}(\d+)/, "$1-xxx-$2");
}

export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return email;
  const [user, domain] = email.split("@");
  if (user.length <= 2) return `${user[0]}*@${domain}`;
  return `${user.slice(0, 2)}***@${domain}`;
}

