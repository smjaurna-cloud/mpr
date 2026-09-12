@echo off
chcp 65001 >nul
title ตรวจสอบความปลอดภัยเซิร์ฟเวอร์ (Windows Hardening Check) - มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย

echo ==============================================================================
echo   MAHAVAJIRALONGKORN PALI COLLEGE - WINDOWS PRODUCTION HARDENING AUDIT
echo   มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
echo ==============================================================================
echo.

echo [1/4] ตรวจสอบพอร์ต SMB 445 (WannaCry / EternalBlue Vector)...
netstat -ano | findstr ":445 " >nul
if %errorlevel% equ 0 (
    echo   [!] คำเตือน: พบว่าพอร์ต SMB 445 กำลังเปิดอยู่บนเครื่องนี้
    echo       - แนะนำ: หากนำเซิร์ฟเวอร์ขึ้น Production ต้องปิดการเข้าถึงพอร์ต 445 จาก Public Internet
    echo       - แนะนำ: ปิด SMBv1 Protocol ด้วยคำสั่ง PowerShell:
    echo         Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol
) else (
    echo   [OK] ไม่พบการเปิดพอร์ต 445 สู่ภายนอก หรือพอร์ตถูกควบคุมเรียบร้อยแล้ว
)
echo.

echo [2/4] ตรวจสอบพอร์ต PostgreSQL 5432 (Crypto Mining & Botnet Vector)...
netstat -ano | findstr ":5432 " | findstr "0.0.0.0" >nul
if %errorlevel% equ 0 (
    echo   [!] คำเตือน: PostgreSQL กำลัง Bind อยู่ที่ 0.0.0.0 (เสี่ยงต่อการโดนสแกนจากภายนอก)
    echo       - แนะนำ: ใน postgresql.conf ให้ตั้งค่า listen_addresses = 'localhost' หรือ '127.0.0.1'
) else (
    echo   [OK] PostgreSQL กำลังฟังเฉพาะ Localhost หรือพอร์ตถูกจำกัดอย่างปลอดภัย
)
echo.

echo [3/4] ตรวจสอบพอร์ต Remote Desktop (RDP 3389)...
netstat -ano | findstr ":3389 " >nul
if %errorlevel% equ 0 (
    echo   [!] แจ้งเตือน: พบพอร์ต RDP 3389 เปิดอยู่
    echo       - แนะนำ: ห้ามเปิด RDP ออกสู่ Public IP ตรงๆ ให้เข้าถึงผ่าน VPN ภายในวิทยาลัยเท่านั้น
) else (
    echo   [OK] ไม่พบพอร์ต RDP 3389 เปิดค้างอยู่
)
echo.

echo [4/4] ตรวจสอบสถานะไฟร์วอลล์ (Windows Firewall)...
netsh advfirewall show allprofiles state | findstr "State"
echo.

echo ==============================================================================
echo   สรุปคำแนะนำการป้องกัน WannaCry และ Crypto Mining สำหรับ Production:
echo   1. อัปเดตแพตช์ Windows Security Update ให้เป็นเวอร์ชันล่าสุดเสมอ
echo   2. ปิดพอร์ต 445 (SMB) และ 139 (NetBIOS) ใน Windows Firewall ขาเข้า (Inbound Rules)
echo   3. รหัสผ่าน Superuser ของ PostgreSQL ต้องไม่ใช้ค่าเริ่มต้น ('postgres')
echo   4. ให้รัน Node.js Application ภายใต้สิทธิ์ผู้ใช้จำกัด (Non-Administrator Service)
echo ==============================================================================
pause
