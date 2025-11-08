# Script pour pousser le code sur GitHub
# REMPLACEZ "VOTRE-NOM" par votre username GitHub

param(
    [Parameter(Mandatory=$true)]
    [string]$GithubUsername
)

Write-Host "=== PUSH VERS GITHUB ===" -ForegroundColor Cyan
Write-Host ""

$repoUrl = "https://github.com/$GithubUsername/Coup2Fer-Mobile.git"

Write-Host "📡 Repository : $repoUrl" -ForegroundColor Yellow
Write-Host ""

# Ajouter le remote
Write-Host "🔗 Ajout du repository distant..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" remote add origin $repoUrl 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Remote déjà existant, mise à jour..." -ForegroundColor Yellow
    & "C:\Program Files\Git\bin\git.exe" remote set-url origin $repoUrl
}

# Renommer la branche en main
Write-Host "🔄 Renommage de la branche en 'main'..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" branch -M main

# Push le code
Write-Host ""
Write-Host "🚀 Push du code vers GitHub..." -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  GitHub va vous demander de vous authentifier :" -ForegroundColor Yellow
Write-Host "   - Username : votre nom d'utilisateur GitHub" -ForegroundColor White
Write-Host "   - Password : utilisez un Personal Access Token (PAS votre mot de passe !)" -ForegroundColor White
Write-Host ""
Write-Host "📝 Pour créer un token : https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host ""

& "C:\Program Files\Git\bin\git.exe" push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ CODE POUSSÉ AVEC SUCCÈS !" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 GitHub Actions compile maintenant votre APK !" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📍 Vérifiez la progression :" -ForegroundColor Yellow
    Write-Host "   https://github.com/$GithubUsername/Coup2Fer-Mobile/actions" -ForegroundColor White
    Write-Host ""
    Write-Host "⏰ Temps estimé : 8-10 minutes" -ForegroundColor Yellow
    Write-Host ""
    Start-Process "https://github.com/$GithubUsername/Coup2Fer-Mobile/actions"
} else {
    Write-Host ""
    Write-Host "❌ ERREUR lors du push" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Solutions :" -ForegroundColor Yellow
    Write-Host "   1. Vérifiez votre connexion internet" -ForegroundColor White
    Write-Host "   2. Vérifiez vos identifiants GitHub" -ForegroundColor White
    Write-Host "   3. Créez un Personal Access Token si nécessaire" -ForegroundColor White
}

Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
