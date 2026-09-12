@echo off
chcp 65001 > nul
title วส. มจร ERP Portal - Presentation Launcher
color 0E

echo ======================================================================
echo   มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
echo   ระบบสารสนเทศเพื่อการบริหาร ERP Portal - Presentation Mode
echo ======================================================================
echo.
echo [1/3] กำลังเตรียมความพร้อมโฟลเดอร์โครงการ...
cd /d "%~dp0"

echo [2/3] กำลังเปิดการทำงานของ Server (Next.js)...
start "วส. มจร Server" cmd /k "npm run dev"

echo กำลังรอระบบเตรียมพร้อม 5 วินาที...
timeout /t 5 /nobreak > nul

echo [3/3] กำลังเปิดหน้าต่างเบราว์เซอร์ 5 แท็บสำหรับการนำเสนอ...
start http://localhost:3000/
timeout /t 1 /nobreak > nul
start http://localhost:3000/login
timeout /t 1 /nobreak > nul
start http://localhost:3000/alms-patron
timeout /t 1 /nobreak > nul
start http://localhost:3000/graduate-progress
timeout /t 1 /nobreak > nul
start http://localhost:3000/file-viewer

echo.
echo ======================================================================
echo   [สำเร็จ] ระบบเปิดหน้าต่างเบราว์เซอร์ 5 แท็บสำหรับการนำเสนอเรียบร้อยแล้ว!
echo.
echo   คำแนะนำในการนำเสนอ:
echo   - กดปุ่ม F11 บนคีย์บอร์ด เพื่อแสดงผลแบบเต็มจอ (Full Screen)
echo   - กดปุ่ม Ctrl + Tab เพื่อสลับไปยังแท็บถัดไปอย่างราบรื่น
echo   - กดปุ่ม Ctrl + Plus (+) หรือ (-) เพื่อปรับขนาดตัวอักษรให้พอดีกับจอโปรเจกเตอร์
echo ======================================================================
echo.
pause
