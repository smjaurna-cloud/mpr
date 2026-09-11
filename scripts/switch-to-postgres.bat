@echo off
chcp 65001 > nul
echo ==============================================================================
echo มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
echo กำลังสลับฐานข้อมูลไปเป็น: PostgreSQL
echo ==============================================================================
node scripts\switch-db.mjs postgres
echo.
echo กำลังรัน npx prisma generate...
call npx prisma generate
echo.
echo หากต้องการ Push โครงสร้างเข้าสู่ PostgreSQL ให้รัน: npx prisma db push
pause
