@echo off
REM Set base directory to project root
set SCRIPT_DIR=%~dp0
set POSTGRES_HOME=%SCRIPT_DIR%external-tools\postgres\postgresql-18.0-2-windows-x64-binaries\pgsql
set DATADIR=%POSTGRES_HOME%\data

REM Convert to absolute path
for %%I in ("%DATADIR%") do set ABS_DATADIR=%%~fI

cd /d %POSTGRES_HOME%

REM Initialize data directory if not exists
if not exist "%ABS_DATADIR%" (
    echo Initializing PostgreSQL data directory...
    bin\initdb.exe -D "%ABS_DATADIR%" -U postgres --encoding=UTF8 --locale=en_US.UTF-8
)

REM Launch PostgreSQL Server in a new window (in the foreground)
echo Launching PostgreSQL Server in a new window...
start "PostgreSQL Server" bin\postgres.exe -D "%ABS_DATADIR%"

REM Wait for PostgreSQL to start, then create database
echo Waiting for PostgreSQL to start before creating database...
timeout /t 5 /nobreak >nul

:WAIT_LOOP
bin\pg_isready.exe -U postgres >nul 2>&1
if errorlevel 1 (
    echo Waiting for PostgreSQL to be ready...
    timeout /t 2 /nobreak >nul
    goto WAIT_LOOP
)

echo PostgreSQL is ready. Checking/creating database...
bin\psql.exe -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'schoolbus'" | findstr "1" >nul
if errorlevel 1 (
    echo Creating database schoolbus...
    bin\psql.exe -U postgres -c "CREATE DATABASE schoolbus ENCODING 'UTF8';"
) else (
    echo Database schoolbus already exists.
)

echo Setup complete. Press any key to exit (PostgreSQL will continue running in its window)...
pause >nul