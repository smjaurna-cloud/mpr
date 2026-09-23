@echo off
chcp 65001 >nul
title มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย - Mobile Access Server (0.0.0.0:3001)

echo ==============================================================================
echo   มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
echo   ระบบแม่ข่ายรองรับโทรศัพท์มือถือทุกระบบปฏิบัติการ (Android ^& iOS)
echo ==============================================================================
echo.

:: Detect Local IPv4 Address
for /f "usebackq tokens=*" %%i in (`powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4) | Where-Object IPAddress -notlike '169.254*' | Where-Object IPAddress -notlike '127.*' | Select-Object -ExpandProperty IPAddress -First 1"`) do (
    set LOCAL_IP=%%i
)

if "%LOCAL_IP%"=="" (
    set LOCAL_IP=127.0.0.1
)

set MOBILE_URL=http://%LOCAL_IP%:3001
set CONNECT_URL=http://localhost:3001/mobile-connect

echo [1/3] ตรวจพบที่อยู่เครือข่ายภายใน (Local IPv4):
echo       ----------------------------------------------------
echo       IP เครื่องคอมพิวเตอร์: %LOCAL_IP%
echo       พอร์ตใช้งาน:          3001 (ผูกกับทุก Network Interface 0.0.0.0)
echo       ลิงก์เข้าจากมือถือ:   %MOBILE_URL%
echo       ----------------------------------------------------
echo.

echo [2/3] วิธีการเชื่อมต่อจากโทรศัพท์มือถือ:
echo       1. เชื่อมต่อโทรศัพท์ (Android หรือ iPhone) เข้า Wi-Fi เดียวกันกับเครื่องนี้
echo       2. เปิดกล้องโทรศัพท์สแกน QR Code จากหน้าต่างเบราว์เซอร์ที่จะเปิดขึ้นมา
echo       3. หรือพิมพ์ที่อยู่ %MOBILE_URL% ใน Google Chrome หรือ Safari
echo.

:: Launch Browser to QR Code helper page after a short delay
start "" powershell -NoProfile -Command "Start-Sleep -Seconds 2; Start-Process '%CONNECT_URL%'"

echo [3/3] กำลังเริ่มต้นเซิร์ฟเวอร์ Next.js ที่ 0.0.0.0:3001...
echo       (กด Ctrl+C ในหน้าต่างนี้เพื่อหยุดการทำงาน)
echo.

:: Check if production build exists
if exist ".next\standalone\server.js" (
    echo [โหมด Standalone Production Build]
    node .next\standalone\server.js
) else (
    echo [โหมด Next.js Standard Start]
    npx next start -H 0.0.0.0 -p 3001
)

pause
