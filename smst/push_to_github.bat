@echo off
chcp 65001 > nul
title Backup SMST & MPR to GitHub

echo ======================================================================
echo  มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
echo  ระบบ Backup โครงการขึ้นสู่ GitHub อัตโนมัติ (SMST)
echo  Repository: https://github.com/smjaurna-cloud/mpr.git
echo ======================================================================
echo.

cd /d "%~dp0\.."

call push_to_github.bat
