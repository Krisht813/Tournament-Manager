@echo off
echo ========================================
echo   Quick Deploy to Vercel
echo ========================================
echo.

git add .
git commit -m "Quick deploy: %date% %time%"
git push origin main

if errorlevel 1 (
    echo.
    echo ❌ Deployment failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✓ Successfully deployed!
echo ========================================
echo.
echo Vercel is now building your app...
echo Check: https://vercel.com/dashboard
echo.
