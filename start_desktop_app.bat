@echo off
chcp 65001 > nul
title มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร) - Windows Desktop App

echo ==============================================================================
echo    มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
echo    ระบบบริหารจัดการสารสนเทศองค์กรสงฆ์ (Enterprise Buddhist College ERP)
echo    Windows Native Desktop App Launcher
echo ==============================================================================
echo.

set TARGET_PORT=3001
set APP_URL=http://localhost:%TARGET_PORT%

:: 1. ตรวจสอบว่าเซิร์ฟเวอร์รันอยู่หรือไม่
echo [*] กำลังตรวจสอบสถานะระบบที่ %APP_URL% ...
netstat -ano | findstr ":%TARGET_PORT% " | findstr "LISTENING" > nul
if %ERRORLEVEL% equ 0 (
    echo [OK] ตรวจพบเซิร์ฟเวอร์กำลังทำงานอยู่แล้ว!
    goto LAUNCH_APP
)

:: 2. เริ่มเซิร์ฟเวอร์ในโหมด Background หากยังไม่รัน
echo [*] กำลังสตาร์ตเซิร์ฟเวอร์ระบบในเบื้องหลัง...
start /b cmd /c "npm run start" > nul 2>&1

:: รอเซิร์ฟเวอร์พร้อมทำงาน
echo [*] กำลังรอให้ระบบพร้อมใช้งาน (ประมาณ 3-5 วินาที)...
timeout /t 3 /nobreak > nul

:WAIT_LOOP
curl -s -o NUL -w "%%{http_code}" %APP_URL% | findstr "200" > nul
if %ERRORLEVEL% equ 0 (
    echo [OK] ระบบพร้อมใช้งานสมบูรณ์!
    goto LAUNCH_APP
)
timeout /t 1 /nobreak > nul
goto WAIT_LOOP

:LAUNCH_APP
echo.
echo [*] กำลังเปิดหน้าต่างแอปพลิเคชันเดสก์ท็อป (Windows Native App Mode)...

:: ค้นหาโปรแกรมเบราว์เซอร์สำหรับรันโหมด Application Window (ไร้ URL bar)
set EDGE_PATH="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not exist %EDGE_PATH% set EDGE_PATH="C:\Program Files\Microsoft\Edge\Application\msedge.exe"

set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist %CHROME_PATH% set CHROME_PATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

if exist %EDGE_PATH% (
    start "" %EDGE_PATH% --app=%APP_URL% --window-size=1280,850 --window-position=50,50
    goto DONE
)

if exist %CHROME_PATH% (
    start "" %CHROME_PATH% --app=%APP_URL% --window-size=1280,850 --window-position=50,50
    goto DONE
)

:: หากไม่มี Edge หรือ Chrome ให้เปิดผ่าน Default Browser
start %APP_URL%

:DONE
echo [OK] หน้าต่างระบบเปิดขึ้นเรียบร้อยแล้วครับ!
echo     (สามารถย่อหน้านี้ลงได้ หรือกดปิดหน้าต่างนี้เมื่อเลิกใช้งาน)
echo.
timeout /t 4 > nul
exit
