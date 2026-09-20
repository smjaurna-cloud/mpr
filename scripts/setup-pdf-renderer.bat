@echo off
chcp 65001 >nul
echo.
echo ================================================================
echo   ตรวจสอบและติดตั้ง PDF Renderer สำหรับระบบ DOCX Preview
echo   มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
echo ================================================================
echo.

REM ─── ตรวจสอบ Microsoft Word ──────────────────────────────────────
echo [1/3] ตรวจสอบ Microsoft Word...
powershell -NoProfile -NonInteractive -Command ^
  "try { $w = New-Object -ComObject 'Word.Application'; Write-Host '  ✓ Microsoft Word พร้อมใช้งาน (v' + $w.Version + ')' -ForegroundColor Green; $w.Quit() } catch { Write-Host '  ✗ ไม่พบ Microsoft Word' -ForegroundColor Red }"
echo.

REM ─── ตรวจสอบ pdftoppm (Poppler) ─────────────────────────────────
echo [2/3] ตรวจสอบ pdftoppm (Poppler)...
where pdftoppm >nul 2>&1
if %ERRORLEVEL% EQU 0 (
  echo   ✓ pdftoppm พร้อมใช้งานแล้ว
) else (
  echo   ✗ ไม่พบ pdftoppm
  echo.
  echo   วิธีติดตั้ง Poppler for Windows:
  echo   1. ดาวน์โหลดจาก: https://github.com/oschwartz10612/poppler-windows/releases
  echo      (เลือกไฟล์ล่าสุด เช่น Release-24.xx.0-0.zip)
  echo   2. แตกไฟล์ ZIP ไปที่ C:\poppler\
  echo   3. เพิ่ม C:\poppler\Library\bin ใน System PATH:
  echo      - คลิกขวา This PC → Properties → Advanced → Environment Variables
  echo      - เลือก Path ใน System Variables → Edit → New
  echo      - พิมพ์: C:\poppler\Library\bin
  echo      - กด OK ทุกหน้าต่าง แล้วเปิด Command Prompt ใหม่
)
echo.

REM ─── ตรวจสอบ mutool (MuPDF) — ตัวเลือกสำรอง ──────────────────────
echo [3/3] ตรวจสอบ mutool (MuPDF) [ตัวเลือกสำรอง]...
where mutool >nul 2>&1
if %ERRORLEVEL% EQU 0 (
  echo   ✓ mutool พร้อมใช้งานแล้ว (ตัวเลือกสำรอง)
) else (
  echo   - ไม่พบ mutool (ไม่จำเป็นถ้ามี pdftoppm แล้ว)
  echo     ดาวน์โหลดทางเลือก: https://mupdf.com/releases/
)
echo.

REM ─── รัน check script ─────────────────────────────────────────────
echo ================================================================
echo   สรุปผลการตรวจสอบ (JSON):
echo ================================================================
powershell -NoProfile -NonInteractive -ExecutionPolicy Bypass ^
  -File "%~dp0check-word-available.ps1"
echo.

echo ================================================================
echo   หากพร้อมแล้ว: เปิดระบบและเข้าหน้า /file-viewer
echo   แล้วคลิก "ดูตัวอย่าง" บนไฟล์ .docx ใดก็ได้
echo ================================================================
pause
