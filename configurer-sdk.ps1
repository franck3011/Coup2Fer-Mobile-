# Script de configuration automatique Android SDK
Write-Host "=== CONFIGURATION ANDROID SDK ===" -ForegroundColor Cyan
Write-Host ""

# Détecter l'emplacement du SDK
$sdkPath = "C:\Users\Francky\AppData\Local\Android\Sdk"
$alternativeSdkPath = "$env:LOCALAPPDATA\Android\Sdk"

Write-Host "🔍 Recherche du SDK Android..." -ForegroundColor Yellow

if (Test-Path $sdkPath) {
    Write-Host "✅ SDK trouvé : $sdkPath" -ForegroundColor Green
} elseif (Test-Path $alternativeSdkPath) {
    $sdkPath = $alternativeSdkPath
    Write-Host "✅ SDK trouvé : $sdkPath" -ForegroundColor Green
} else {
    Write-Host "❌ SDK Android non trouvé !" -ForegroundColor Red
    Write-Host ""
    Write-Host "📋 ACTIONS REQUISES :" -ForegroundColor Yellow
    Write-Host "   1. Lancez Android Studio" -ForegroundColor White
    Write-Host "   2. Tools → SDK Manager" -ForegroundColor White
    Write-Host "   3. Installez Android SDK Platform 33" -ForegroundColor White
    Write-Host "   4. Installez Android SDK Build-Tools 33" -ForegroundColor White
    Write-Host "   5. Relancez ce script" -ForegroundColor White
    Write-Host ""
    Write-Host "Appuyez sur une touche pour quitter..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host ""
Write-Host "⚙️ Configuration des variables d'environnement..." -ForegroundColor Yellow

# Configurer ANDROID_HOME
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdkPath, "User")
Write-Host "✅ ANDROID_HOME = $sdkPath" -ForegroundColor Green

# Configurer ANDROID_SDK_ROOT (pour compatibilité)
[System.Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $sdkPath, "User")
Write-Host "✅ ANDROID_SDK_ROOT = $sdkPath" -ForegroundColor Green

# Ajouter au PATH
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
$platformTools = "$sdkPath\platform-tools"
$tools = "$sdkPath\tools"
$cmdlineTools = "$sdkPath\cmdline-tools\latest\bin"

$pathsToAdd = @($platformTools, $tools, $cmdlineTools)
$pathUpdated = $false

foreach ($pathToAdd in $pathsToAdd) {
    if ($currentPath -notlike "*$pathToAdd*") {
        $currentPath += ";$pathToAdd"
        $pathUpdated = $true
        Write-Host "✅ Ajouté au PATH : $pathToAdd" -ForegroundColor Green
    }
}

if ($pathUpdated) {
    [System.Environment]::SetEnvironmentVariable("Path", $currentPath, "User")
}

Write-Host ""
Write-Host "📝 Création du fichier local.properties..." -ForegroundColor Yellow

# Créer local.properties
$localPropsPath = ".\android\local.properties"
$sdkPathEscaped = $sdkPath -replace '\\', '\\'

if (Test-Path $localPropsPath) {
    Write-Host "⚠️ local.properties existe déjà, mise à jour..." -ForegroundColor Yellow
}

$localPropsContent = "sdk.dir=$sdkPathEscaped"
Set-Content -Path $localPropsPath -Value $localPropsContent -Encoding UTF8

Write-Host "✅ local.properties créé" -ForegroundColor Green
Write-Host ""

# Afficher le contenu
Write-Host "📄 Contenu de local.properties :" -ForegroundColor Yellow
Get-Content $localPropsPath
Write-Host ""

# Vérification
Write-Host "🔍 Vérification de la configuration..." -ForegroundColor Yellow
Write-Host ""

# Recharger les variables d'environnement dans la session actuelle
$env:ANDROID_HOME = $sdkPath
$env:ANDROID_SDK_ROOT = $sdkPath

if (Test-Path "$sdkPath\platform-tools\adb.exe") {
    Write-Host "✅ ADB trouvé : $sdkPath\platform-tools\adb.exe" -ForegroundColor Green
} else {
    Write-Host "⚠️ ADB non trouvé. Installez Platform-Tools via SDK Manager" -ForegroundColor Yellow
}

if (Test-Path "$sdkPath\platforms\android-33") {
    Write-Host "✅ Android Platform 33 trouvé" -ForegroundColor Green
} else {
    Write-Host "⚠️ Android Platform 33 non trouvé" -ForegroundColor Yellow
    Write-Host "   → Installez-le via SDK Manager dans Android Studio" -ForegroundColor Gray
}

if (Test-Path "$sdkPath\build-tools") {
    $buildTools = Get-ChildItem "$sdkPath\build-tools" -Directory | Select-Object -First 1
    if ($buildTools) {
        Write-Host "✅ Build-Tools trouvé : $($buildTools.Name)" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️ Build-Tools non trouvé" -ForegroundColor Yellow
    Write-Host "   → Installez-le via SDK Manager dans Android Studio" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🎉 CONFIGURATION TERMINÉE !" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️ IMPORTANT : REDÉMARREZ votre terminal PowerShell" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 PROCHAINES ÉTAPES :" -ForegroundColor Cyan
Write-Host "   1. Fermez ce terminal" -ForegroundColor White
Write-Host "   2. Ouvrez un NOUVEAU terminal PowerShell" -ForegroundColor White
Write-Host "   3. Lancez : .\compiler-apk-local.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
