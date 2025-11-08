# Script d'installation Gradle pour Coup 2 Fer Mobile

Write-Host "=== INSTALLATION GRADLE 8.11.1 ===" -ForegroundColor Cyan
Write-Host ""

# Chemin où Gradle doit être placé
$gradleDir = "$env:USERPROFILE\.gradle\wrapper\dists\gradle-8.11.1-all\2qik7nd48slq1ooc2496ixf4i"
$gradleZip = "$gradleDir\gradle-8.11.1-all.zip"
$downloadFolder = "$env:USERPROFILE\Downloads"

Write-Host "📁 Création du dossier Gradle..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $gradleDir | Out-Null

Write-Host "✅ Dossier créé : $gradleDir" -ForegroundColor Green
Write-Host ""

# Vérifier si le fichier existe dans Téléchargements
$downloadedFile = "$downloadFolder\gradle-8.11.1-all.zip"

if (Test-Path $downloadedFile) {
    Write-Host "📦 Fichier Gradle trouvé dans Téléchargements !" -ForegroundColor Green
    Write-Host "📋 Copie vers le dossier Gradle..." -ForegroundColor Yellow
    
    Copy-Item $downloadedFile -Destination $gradleZip -Force
    
    Write-Host "✅ Gradle copié avec succès !" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Vous pouvez maintenant lancer le build :" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "cd C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile\android" -ForegroundColor White
    Write-Host "`$env:JAVA_HOME = 'C:\Program Files\Java\jdk-22'" -ForegroundColor White
    Write-Host "`$env:Path = `"`$env:JAVA_HOME\bin;`$env:Path`"" -ForegroundColor White
    Write-Host ".\gradlew.bat assembleDebug" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "❌ Fichier Gradle non trouvé dans Téléchargements" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 TÉLÉCHARGEZ D'ABORD GRADLE :" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Allez sur : https://gradle.org/next-steps/?version=8.11.1&format=all" -ForegroundColor Cyan
    Write-Host "2. Le téléchargement démarre automatiquement (~140 MB)" -ForegroundColor Cyan
    Write-Host "3. Attendez la fin du téléchargement" -ForegroundColor Cyan
    Write-Host "4. Relancez ce script" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "OU copiez manuellement le fichier :" -ForegroundColor Yellow
    Write-Host "De : $downloadedFile" -ForegroundColor White
    Write-Host "Vers : $gradleZip" -ForegroundColor White
    Write-Host ""
    
    # Ouvrir la page de téléchargement
    $response = Read-Host "Voulez-vous ouvrir la page de téléchargement maintenant ? (O/N)"
    if ($response -eq 'O' -or $response -eq 'o') {
        Start-Process "https://gradle.org/next-steps/?version=8.11.1&format=all"
        Write-Host "✅ Page ouverte dans le navigateur" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
