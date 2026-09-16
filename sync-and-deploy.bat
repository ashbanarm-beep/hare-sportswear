@echo off
setlocal enabledelayedexpansion
title Hare Sportswear - Sync and Deploy to Vercel

echo ========================================================
echo   Hare Sportswear - Auto Sync and Deploy to GitHub / Vercel
echo ========================================================
echo.

:: Locate Git
set "GIT_CMD=git"
where git >nul 2>nul
if %errorlevel% neq 0 (
    if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
        set "GIT_CMD=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
    ) else if exist "C:\Program Files\Git\cmd\git.exe" (
        set "GIT_CMD=C:\Program Files\Git\cmd\git.exe"
    ) else (
        echo [ERROR] Git was not found on your computer.
        echo Please ensure Git is installed.
        pause
        exit /b 1
    )
)

echo Checking for changes in your project...
"%GIT_CMD%" status --short > "%TEMP%\git_status.tmp" 2>&1
for /f %%A in ('type "%TEMP%\git_status.tmp" ^| find /c /v ""') do set CHANGE_COUNT=%%A
del "%TEMP%\git_status.tmp" >nul 2>&1

if "%CHANGE_COUNT%"=="0" (
    echo [INFO] No changes detected. Your project is already up to date with GitHub!
    echo.
    pause
    exit /b 0
)

echo Found changes in the project:
"%GIT_CMD%" status --short
echo.

set /p MSG="Enter a description for your changes (or press Enter for default): "
if "%MSG%"=="" (
    set "MSG=Update website design - %DATE% %TIME%"
)

echo.
echo [1/3] Staging changes...
"%GIT_CMD%" add -A

echo [2/3] Committing changes: "!MSG!"...
"%GIT_CMD%" commit -m "!MSG!"

echo [3/3] Pushing to GitHub (main branch)...
"%GIT_CMD%" push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] Your changes have been pushed to GitHub!
    echo   Vercel has automatically started deploying your site.
    echo   Your updates should be live in 15-30 seconds!
    echo ========================================================
) else (
    echo.
    echo [ERROR] Failed to push to GitHub. Check your internet connection or GitHub authorization.
)

echo.
pause
