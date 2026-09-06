@echo off
chcp 65001 > nul
title Backup MPR & SMST to GitHub

echo ======================================================================
echo  มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
echo  ระบบ Backup โครงการขึ้นสู่ GitHub อัตโนมัติ
echo  Repository: https://github.com/smjaurna-cloud/mpr.git
echo ======================================================================
echo.

cd /d "%~dp0"

echo [สถานะไฟล์ปัจจุบัน]
git status -s
echo.

set /p MSG="ระบุข้อความบันทึก Commit (กด Enter เพื่อใช้ข้อความอัตโนมัติ): "
if "%MSG%"=="" (
    set MSG=chore: Backup snapshot - %DATE% %TIME%
)

echo.
echo [1/3] กำลังเตรียมไฟล์ทั้งหมด (git add .)...
git add .

echo.
echo [2/3] กำลังบันทึกการเปลี่ยนแปลง (git commit)...
git commit -m "%MSG%"

echo.
echo [3/3] กำลังอัปโหลดขึ้นสู่ GitHub (git push origin main)...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================================
    echo  [สำเร็จ] สำรองข้อมูลขึ้น GitHub เรียบร้อยแล้ว!
    echo  สามารถตรวจสอบได้ที่: https://github.com/smjaurna-cloud/mpr
    echo ======================================================================
) else (
    echo.
    echo ======================================================================
    echo  [แจ้งเตือน] การส่งข้อมูลยังไม่สำเร็จ
    echo  กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต หรือสิทธิ์ของ GitHub Account
    echo ======================================================================
)

echo.
pause
