"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck,
  Globe,
  Building,
  MessageCircle,
  BookOpen,
  ChevronRight,
  HeartHandshake,
  QrCode,
  Sparkles,
} from "lucide-react";
import { mainCollegeContact } from "@/data/contactDirectoryData";

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t border-amber-500/30">
      {/* Top Banner: Monastic Alms & Sacred Notice */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-amber-50 py-2.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-200 shrink-0" />
            <span className="font-semibold tracking-wide">
              {mainCollegeContact.monasticVisitingHours}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-amber-100">
            <span>สายด่วนฝ่ายปกครอง & พระพี่เลี้ยง: <strong>{mainCollegeContact.phones.emergency24h}</strong> (๒๔ ชม.)</span>
            <Link
              href="/contact"
              className="underline underline-offset-2 hover:text-white font-medium"
            >
              แผนที่ & ติดต่อเรา →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Institutional Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-600/30">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm leading-tight">
                  {mainCollegeContact.institutionNameThai}
                </h3>
                <p className="text-[11px] text-amber-400 font-medium">
                  {mainCollegeContact.affiliation}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              สถาบันการศึกษาพระปริยัติธรรมบาลีเถรวาทและโรงเรียนศากยบุตรสามเณรสีหะ มุ่งสร้างศาสนทายาทผู้ทรงจำพระไตรปิฎกภาษาบาลีตามแนวพระพุทธศิลป์ดั้งเดิม
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{mainCollegeContact.sanghaTemple}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Official Contact Info */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>ช่องทางติดต่อทางการ (O4)</span>
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px] text-slate-300">
                  {mainCollegeContact.address.fullAddressThai}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-slate-400">เบอร์กลาง: </span>
                  <a href={`tel:${mainCollegeContact.phones.centralSwitchboard.replace(/[^0-9]/g, "")}`} className="hover:text-amber-300 font-medium text-slate-200">
                    {mainCollegeContact.phones.centralSwitchboard}
                  </a>
                  <span className="text-slate-400 text-[10px] ml-1.5">(ฝ่ายอำนวยการ ต่อ 101)</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-slate-400">อีเมลกลาง: </span>
                  <a href={`mailto:${mainCollegeContact.emails.primary}`} className="hover:text-amber-300 text-slate-200">
                    {mainCollegeContact.emails.primary}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-400">
                  <p><strong>เวลาทำการราชการ:</strong> {mainCollegeContact.officeHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Key Portals & Digital Links */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>ระบบบริการและสารสนเทศ</span>
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>
                <Link href="/contact" className="hover:text-amber-300 flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>ทำเนียบหมายเลขภายใน ๘ ฝ่ายงาน</span>
                </Link>
              </li>
              <li>
                <Link href="/alms-patron" className="hover:text-amber-300 flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>จองภัตตาหารเพล & e-Donation สรรพากร</span>
                </Link>
              </li>
              <li>
                <Link href="/complaints-tracking" className="hover:text-amber-300 flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>ศูนย์รับเรื่องร้องเรียน QR Code & ติดตามงาน</span>
                </Link>
              </li>
              <li>
                <Link href="/graduate-curriculum" className="hover:text-amber-300 flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>หลักสูตรบัณฑิตศึกษา พธ.ด. / พธ.ม. (มคอ.๒)</span>
                </Link>
              </li>
              <li>
                <Link href="/chat-board" className="hover:text-amber-300 flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>แชตบอร์ด & สนทนาธรรมออนไลน์</span>
                </Link>
              </li>
              <li>
                <Link href="/vehicle-booking" className="hover:text-amber-300 flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>ยานพาหนะ & ขอใช้รถส่วนกลาง ๑๐ คัน</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Transparency, ITA & Social */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>มาตรฐานความโปร่งใส (ITA/OIT)</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              สอดคล้องตามเกณฑ์การประเมินคุณธรรมและความโปร่งใส (ITA O1–O5) และพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. ๒๕๖๒ (PDPA)
            </p>

            <div className="pt-1 space-y-2">
              <a
                href={mainCollegeContact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span className="font-medium text-[11px]">palitheravada.mcu.ac.th</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href="https://line.me/R/ti/p/@palitheravada"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-[11px]">LINE: @palitheravada</span>
                </div>
                <span className="text-[10px] text-emerald-300 bg-emerald-900/80 px-1.5 py-0.5 rounded">เพิ่มเพื่อน</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Divider & Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © พ.ศ. ๒๕๖๗–๒๕๖๙ <strong>มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย</strong> วิทยาลัยสงฆ์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PDPA Compliant</span>
            </span>
            <span>•</span>
            <span>ระบบนำร่องใช้งานจริง (Production Pilot v1.2)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
