# Start all for Olaventos (Windows PowerShell)
# - Verifica Node/npm
# - Instala dependencias si faltan en backend y frontend-react
# - Abre dos ventanas PowerShell y levanta backend (Nest) y frontend (Vite)

function Check-Command($cmd) {
    $proc = Get-Command $cmd -ErrorAction SilentlyContinue
    return $null -ne $proc
}

Write-Host "== Olaventos - start-all.ps1 ==" -ForegroundColor Cyan

if (-not (Check-Command node) -or -not (Check-Command npm)) {
    Write-Host "Node.js o npm no encontrado. Por favor instala Node.js LTS desde https://nodejs.org y vuelve a ejecutar este script." -ForegroundColor Red
    exit 1
}

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$backend = Join-Path $root "backend"
$frontend = Join-Path $root "frontend-react"

Write-Host "Directorio raíz: $root"

# Instalar dependencias si node_modules no existe
if (-not (Test-Path (Join-Path $backend 'node_modules'))) {
    Write-Host "Instalando dependencias en backend..." -ForegroundColor Yellow
    Push-Location $backend
    npm install
    Pop-Location
} else {
    Write-Host "Dependencias backend ya instaladas." -ForegroundColor Green
}

if (-not (Test-Path (Join-Path $frontend 'node_modules'))) {
    Write-Host "Instalando dependencias en frontend-react..." -ForegroundColor Yellow
    Push-Location $frontend
    npm install
    Pop-Location
} else {
    Write-Host "Dependencias frontend ya instaladas." -ForegroundColor Green
}

# Abrir backend en nueva ventana
$backendCmd = "cd `"$backend`"; npm run start:dev"
Write-Host "Abriendo backend en nueva ventana PowerShell..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit","-Command","$backendCmd"

# Abrir frontend en nueva ventana
$frontendCmd = "cd `"$frontend`"; npm run dev"
Write-Host "Abriendo frontend en nueva ventana PowerShell..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit","-Command","$frontendCmd"

Write-Host "Hecho. Backend => http://localhost:3000  Frontend => http://localhost:5173" -ForegroundColor Green
