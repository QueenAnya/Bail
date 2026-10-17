@echo off
setlocal
cd /d "%~dp0"
echo Running Yarn lint. Full output will be saved to lint-output.txt...
call corepack yarn lint > lint-output.txt 2>&1
set "LINT_EXIT=%ERRORLEVEL%"
echo.
echo Lint finished with exit code %LINT_EXIT%.
echo Output file: %CD%\lint-output.txt
echo Send lint-output.txt back for the remaining fixes.
pause
exit /b %LINT_EXIT%
