@echo off
setlocal
cd /d "%~dp0"

echo [1/4] Formatting source files with the repository's Prettier configuration...
call corepack yarn format > format-output.txt 2>&1
if errorlevel 1 (
  echo Prettier formatting failed. See format-output.txt
  type format-output.txt
  exit /b 1
)

echo [2/4] Applying ESLint autofixes...
call corepack yarn eslint src --ext .js,.ts --fix > eslint-fix-output.txt 2>&1
if errorlevel 1 (
  echo ESLint reported remaining issues or autofix failed. Continuing to final lint capture...
)

echo [3/4] Running full lint and saving all output to lint-output.txt...
call corepack yarn lint > lint-output.txt 2>&1
set LINT_EXIT=%ERRORLEVEL%

echo [4/4] Done.
echo Full lint output: %CD%\lint-output.txt
echo Prettier output:  %CD%\format-output.txt
echo ESLint fix log:   %CD%\eslint-fix-output.txt
echo.
echo Final yarn lint exit code: %LINT_EXIT%
echo Upload lint-output.txt here so remaining errors can be fixed.
exit /b 0
