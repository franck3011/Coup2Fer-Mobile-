# Script simple pour compiler l'APK localement
Write-Host "=== BUILD APK COUP 2 FER ===" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Stop"

try {
    # 1. Build web
    Write-Host "[1/3] Build web app..." -ForegroundColor Yellow
    npm run build
    
    if (-not (Test-Path "dist")) {
        throw "Dossier dist/ non cree"
    }
    
    Write-Host "OK - Build web termine" -ForegroundColor Green
    Write-Host ""
    
    # 2. Sync Capacitor
    Write-Host "[2/3] Sync Capacitor..." -ForegroundColor Yellow
    npx cap sync android
    
    Write-Host "OK - Sync termine" -ForegroundColor Green
    Write-Host ""
    
    # 3. Build APK
    Write-Host "[3/3] Build APK (cela prend 5 min)..." -ForegroundColor Yellow
    cd android
    .\gradlew.bat assembleDebug
    cd ..
    
    # Verifier APK
    $apk = "android\app\build\outputs\apk\debug\app-debug.apk"
    if (Test-Path $apk) {
        $size = (Get-Item $apk).Length / 1MB
        Write-Host ""
        Write-Host "SUCCESS - APK CREE AVEC SUCCES !" -ForegroundColor Green
        Write-Host ""
        Write-Host "Emplacement : $((Get-Item $apk).FullName)" -ForegroundColor Yellow
        Write-Host "Taille : $([math]::Round($size, 2)) MB" -ForegroundColor Yellow
        Write-Host ""
        
        # Ouvrir dossier
        explorer.exe "/select,$(Resolve-Path $apk)"
    } else {
        throw "APK non trouve"
    }
    
} catch {
    Write-Host ""
    Write-Host "ERREUR : $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "SOLUTIONS :" -ForegroundColor Yellow
    Write-Host "   1. Verifiez que Node.js est installe : node --version" -ForegroundColor White
    Write-Host "   2. Installez les dependances : npm install" -ForegroundColor White
    Write-Host "   3. Utilisez l APK GitHub Actions a la place" -ForegroundColor White
    exit 1
}
