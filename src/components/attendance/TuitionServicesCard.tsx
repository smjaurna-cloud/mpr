"use client";

import React from "react";

export default function TuitionServicesCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            ข้อมูลการชำระค่าธรรมเนียมการศึกษา (Tuition Services)
          </h3>
          <p className="text-xs text-slate-500">
            สแกนผ่าน PromptPay Biller ID หรือธนาคารกรุงไทย บัญชีมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full w-fit">
          PromptPay: 0-9940-00165-43-2
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-200 space-y-2 text-xs">
          <div className="font-bold text-amber-950">ช่องทางโอนชำระเงินทางการ:</div>
          <p className="text-slate-700 leading-relaxed">
            • <strong>ธนาคาร:</strong> ธนาคารกรุงไทย สาขากำแพงแสน<br />
            • <strong>เลขที่บัญชี:</strong> 726-0-45892-1<br />
            • <strong>ชื่อบัญชี:</strong> มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (กองทุนการศึกษา)<br />
            • <strong>เบอร์ติดต่อการเงิน:</strong> 034-352-253, สายด่วน 099-445-4256
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
          <div className="font-bold text-slate-900">การออกใบเสร็จรับเงินทางการ (A4):</div>
          <p className="text-slate-600 leading-relaxed">
            เมื่อชำระเงินเรียบร้อยแล้ว นิสิตสามารถแจ้งผ่านระบบ SMST เพื่อรับใบเสร็จรับเงินดิจิทัลมาตรฐาน A4 ที่มีตราประทับทางการและสามารถใช้เบิกจ่ายต้นสังกัดได้ทันที
          </p>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700"
          >
            ไปที่หน้าออกใบเสร็จรับเงิน &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
