@echo off
chcp 65001 > nul
title Backup MPR to GitHub

echo ======================================================================
echo  มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
echo  ระบบ Backup โปรเจกต์ขึ้นสู่ GitHub
echo  Repository: https://github.com/smjaurna-cloud/mpr.git
echo ======================================================================
echo.

cd /d "%~dp0"

echo [1/3] ตรวจสอบและเตรียมไฟล์โครงการ (git add)...
git add .

echo.
echo [2/3] ตรวจสอบการบันทึกสถานะ (git commit)...
git commit -m "chore: Backup project snapshot - %DATE% %TIME%" > nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo       - บันทึกการเปลี่ยนแปลงใหม่เรียบร้อย
) else (
    echo       - ข้อมูลปัจจุบันได้รับการบันทึกครบถ้วนแล้ว
)

echo.
echo [3/3] กำลังนำส่งข้อมูลขึ้นสู่ GitHub (git push origin main)...
echo       (หมายเหตุ: หากมีหน้าต่างเบราว์เซอร์เปิดขึ้นมา กรุณากด "Sign in with your browser")
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================================
    echo  [สำเร็จ] นำส่งโค้ดขึ้นสู่ GitHub เรียบร้อยแล้ว!
    echo  สามารถตรวจสอบได้ที่: https://github.com/smjaurna-cloud/mpr
    echo ======================================================================
) else (
    echo.
    echo ======================================================================
    echo  [แจ้งเตือน] การส่งข้อมูลยังไม่สำเร็จ
    echo  กรุณาตรวจสอบการยืนยันตัวตนในเบราว์เซอร์ หรือตรวจสอบสัญญาณอินเทอร์เน็ต
    echo ======================================================================
)

echo.
pause
