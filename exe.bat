@echo off
echo Installing Node.js version 18.19.0
echo.
nvm install 18.19.0

echo Changing directory to your project
echo.
cd "./src/server.js"

echo Running npm run start
echo.
npm run start

echo Finished
pause
