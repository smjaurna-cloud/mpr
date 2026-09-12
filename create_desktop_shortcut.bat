@echo off
chcp 65001 > nul
title สร้างช็อตคัตหน้าจอ Desktop - มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย

echo [*] กำลังสร้าง Desktop Shortcut สำหรับเปิดใช้งานระบบ...
cscript //nologo "%~dp0scripts\create-windows-shortcut.vbs"
echo.
echo [OK] เสร็จสิ้น! สามารถเปิดใช้งานระบบจากไอคอนบนหน้าจอ Desktop ได้ทันทีครับ
timeout /t 3 > nul
exit
