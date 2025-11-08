# Script de vérification APK
Write-Host "=== VÉRIFICATION APK COUP 2 FER ===" -ForegroundColor Cyan
Write-Host ""

$apkPath = ".\android\app\build\outputs\apk\debug\app-debug.apk"

if (Test-Path $apkPath) {
    Write-Host "✅ APK TROUVÉ !" -ForegroundColor Green
    Write-Host ""
    $apk = Get-Item $apkPath
    Write-Host "📍 Emplacement: $($apk.FullName)" -ForegroundColor Yellow
    Write-Host "📦 Taille: $([math]::Round($apk.Length / 1MB, 2)) MB" -ForegroundColor Yellow
    Write-Host "📅 Date: $($apk.LastWriteTime)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🎉 Votre APK est prêt à être installé !" -ForegroundColor Green
    Write-Host ""
    Write-Host "Pour installer sur téléphone :" -ForegroundColor Cyan
    Write-Host "1. Copiez ce fichier sur votre téléphone Android"
    Write-Host "2. Ouvrez le fichier sur le téléphone"
    Write-Host "3. Autorisez 'Sources inconnues' si demandé"
    Write-Host "4. Installez et lancez Coup 2 Fer !"
} else {
    Write-Host "❌ APK NON TROUVÉ" -ForegroundColor Red
    Write-Host ""
    Write-Host "Le build n'est pas encore terminé." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Vérifiez que la compilation Gradle est en cours..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
