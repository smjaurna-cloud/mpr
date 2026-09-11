@echo off
chcp 65001 > nul
echo ==============================================================================
echo มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
echo กำลังสลับฐานข้อมูลไปเป็น: SQLite (dev.db)
echo ==============================================================================
node scripts\switch-db.mjs sqlite
echo.
echo กำลังรัน npx prisma generate...
call npx prisma generate
echo.
echo สลับกลับมาใช้ SQLite สำเร็จแล้ว!
pause
