@echo off
title Hare Sportswear - Local Development Server
echo ========================================================
echo   Hare Sportswear - Starting Local Dev Server
echo ========================================================
echo.
echo Local URL: http://localhost:5173/
echo Fabric Glossary: http://localhost:5173/fabric-glossary
echo.
start http://localhost:5173/
npm run dev -- --host
pause
