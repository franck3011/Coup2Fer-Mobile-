# Script de compilation APK locale avec Android Studio
Write-Host "=== COMPILATION APK COUP 2 FER ===" -ForegroundColor Cyan
Write-Host ""

# Étape 1 : Build web
Write-Host "📦 Étape 1/4 : Compilation du projet web..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la compilation web" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Projet web compilé avec succès" -ForegroundColor Green
Write-Host ""

# Étape 2 : Sync Capacitor
Write-Host "🔄 Étape 2/4 : Synchronisation avec Capacitor..." -ForegroundColor Yellow
npx cap sync android

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la synchronisation Capacitor" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Capacitor synchronisé avec succès" -ForegroundColor Green
Write-Host ""

# Étape 3 : Compilation Android
Write-Host "🤖 Étape 3/4 : Compilation de l'APK Android..." -ForegroundColor Yellow
Write-Host "⏰ Cela peut prendre 3-5 minutes..." -ForegroundColor Gray
Write-Host ""

cd android
.\gradlew assembleDebug --no-daemon

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la compilation Android" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Solutions :" -ForegroundColor Yellow
    Write-Host "   1. Vérifiez qu'Android Studio est installé" -ForegroundColor White
    Write-Host "   2. Utilisez l'APK de GitHub Actions à la place" -ForegroundColor White
    Write-Host "   3. Vérifiez les guides : COMPILER-AVEC-ANDROID-STUDIO.md" -ForegroundColor White
    cd ..
    exit 1
}

cd ..

Write-Host "✅ APK compilé avec succès !" -ForegroundColor Green
Write-Host ""

# Étape 4 : Vérification
Write-Host "🔍 Étape 4/4 : Vérification de l'APK..." -ForegroundColor Yellow

$apkPath = ".\android\app\build\outputs\apk\debug\app-debug.apk"

if (Test-Path $apkPath) {
    $apk = Get-Item $apkPath
    Write-Host ""
    Write-Host "🎉 APK GÉNÉRÉ AVEC SUCCÈS !" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 Emplacement : $($apk.FullName)" -ForegroundColor Yellow
    Write-Host "📦 Taille : $([math]::Round($apk.Length / 1MB, 2)) MB" -ForegroundColor Yellow
    Write-Host "📅 Date : $($apk.LastWriteTime)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📱 PROCHAINES ÉTAPES :" -ForegroundColor Cyan
    Write-Host "   1. Copiez l'APK sur votre téléphone Android" -ForegroundColor White
    Write-Host "   2. Ouvrez le fichier APK sur le téléphone" -ForegroundColor White
    Write-Host "   3. Autorisez l'installation depuis sources inconnues" -ForegroundColor White
    Write-Host "   4. Installez l'application COUP 2 FER" -ForegroundColor White
    Write-Host "   5. Lancez et profitez ! 🚀" -ForegroundColor White
    Write-Host ""
    
    # Ouvrir le dossier
    Write-Host "📂 Ouverture du dossier contenant l'APK..." -ForegroundColor Yellow
    Start-Process explorer.exe -ArgumentList "/select,`"$($apk.FullName)`""
} else {
    Write-Host "❌ APK introuvable !" -ForegroundColor Red
    Write-Host "   Chemin attendu : $apkPath" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
