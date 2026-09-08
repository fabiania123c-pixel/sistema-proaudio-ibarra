@echo off
title Prototipo PROAUDIO
cd /d "%~dp0"

cls
echo.
echo   ===========================================================
echo                  P R O T O T I P O   P R O A U D I O
echo                  Datos ficticios - version de prueba
echo   ===========================================================
echo.

REM --- 1. Comprobar que Node.js esta instalado ---
where node >nul 2>nul
if errorlevel 1 goto SIN_NODE

REM --- 2. Instalar dependencias solo si faltan ---
if not exist "node_modules\" goto INSTALAR
goto ENCENDER

:INSTALAR
echo   Es la primera vez. Preparando el proyecto...
echo   Esto puede tardar entre 2 y 5 minutos. No cierre esta ventana.
echo.
call npm install
if errorlevel 1 goto ERROR_INSTALL
echo.
echo   Listo.
echo.
goto ENCENDER

:ENCENDER
echo   Encendiendo el prototipo. Espere unos segundos...
echo.
echo   -----------------------------------------------------------
echo    Se abrira solo en su navegador.
echo    Si no se abre, escriba esta direccion en el navegador:
echo.
echo         http://localhost:3000
echo   -----------------------------------------------------------
echo.
echo    PARA CERRARLO: cierre esta ventana negra.
echo.
echo   -----------------------------------------------------------
echo.

REM Abre el navegador en segundo plano tras dar tiempo a que arranque
start "" /b cmd /c "timeout /t 15 /nobreak >nul & start """" http://localhost:3000"

call npm run dev

echo.
echo   El prototipo se detuvo.
pause
exit /b 0

:SIN_NODE
echo   [ ! ]  No se encontro Node.js en este equipo.
echo.
echo   Que hacer:
echo     1. Entre a  https://nodejs.org
echo     2. Descargue la opcion que dice "LTS"
echo     3. Instalela aceptando todas las opciones por defecto
echo     4. Reinicie el equipo
echo     5. Vuelva a hacer doble clic en este archivo
echo.
pause
exit /b 1

:ERROR_INSTALL
echo.
echo   [ ! ]  Hubo un problema preparando el proyecto.
echo.
echo   Puede deberse a falta de conexion a internet.
echo   Revise su conexion y vuelva a intentarlo.
echo.
pause
exit /b 1
