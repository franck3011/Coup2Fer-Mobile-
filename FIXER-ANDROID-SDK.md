# 🔧 RÉSOUDRE : Unable to continue until an Android SDK is specified

## 🎯 SOLUTION RAPIDE

### **Méthode 1 : Via Android Studio (Recommandé)**

#### **Étape 1 : Ouvrir SDK Manager**
1. Lancez **Android Studio**
2. Menu **Tools** → **SDK Manager**
   - OU cliquez sur l'icône SDK en haut à droite
   - OU **File** → **Settings** → **Appearance & Behavior** → **System Settings** → **Android SDK**

#### **Étape 2 : Installer les composants nécessaires**

**Onglet "SDK Platforms" :**
- ✅ Cochez **Android 13.0 (Tiramisu)** - API Level 33
- ✅ Cochez **Android 12.0 (S)** - API Level 31
- Cliquez sur **Apply** → **OK**

**Onglet "SDK Tools" :**
- ✅ Cochez **Android SDK Build-Tools 33**
- ✅ Cochez **Android SDK Platform-Tools**
- ✅ Cochez **Android SDK Command-line Tools**
- ✅ Cochez **Android Emulator** (optionnel)
- Cliquez sur **Apply** → **OK**

**⏰ Téléchargement : 5-10 minutes**

---

### **Méthode 2 : Configuration manuelle du chemin SDK**

#### **Étape 1 : Vérifier où est installé le SDK**

Le SDK Android Studio est généralement installé ici :
```
C:\Users\Francky\AppData\Local\Android\Sdk
```

#### **Étape 2 : Configurer la variable d'environnement**

**Via PowerShell (Administrateur) :**

```powershell
# Définir ANDROID_HOME
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\Francky\AppData\Local\Android\Sdk", "User")

# Ajouter au PATH
$currentPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
$newPath = "$currentPath;C:\Users\Francky\AppData\Local\Android\Sdk\platform-tools;C:\Users\Francky\AppData\Local\Android\Sdk\tools"
[System.Environment]::SetEnvironmentVariable("Path", $newPath, "User")

Write-Host "✅ Variables d'environnement configurées !" -ForegroundColor Green
Write-Host "⚠️ REDÉMARREZ votre terminal PowerShell" -ForegroundColor Yellow
```

#### **Étape 3 : Vérifier l'installation**

```powershell
# Redémarrez PowerShell puis testez :
echo $env:ANDROID_HOME
# Devrait afficher : C:\Users\Francky\AppData\Local\Android\Sdk

adb --version
# Devrait afficher la version d'ADB
```

---

### **Méthode 3 : Configurer dans le projet**

#### **Créer le fichier local.properties**

```powershell
cd C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile\android
```

Créez un fichier `local.properties` avec ce contenu :

```properties
sdk.dir=C:\\Users\\Francky\\AppData\\Local\\Android\\Sdk
```

**⚠️ IMPORTANT : Utilisez des double backslashes `\\`**

---

## 🚀 APRÈS CONFIGURATION

### **Tester la configuration**

```powershell
cd C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile\android
.\gradlew tasks
```

Si ça fonctionne → ✅ SDK configuré correctement !

### **Compiler l'APK**

```powershell
cd C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile
.\compiler-apk-local.ps1
```

---

## ❌ SI LE SDK N'EST PAS INSTALLÉ DU TOUT

### **Installer via Android Studio**

1. Lancez **Android Studio**
2. **Welcome Screen** → **More Actions** → **SDK Manager**
3. Notez l'emplacement du SDK (Android SDK Location)
4. Installez les composants (voir Méthode 1)

### **Ou installer via ligne de commande**

```powershell
# Télécharger Android SDK Command Line Tools
# URL : https://developer.android.com/studio#command-tools

# Extraire dans :
# C:\Users\Francky\AppData\Local\Android\Sdk\cmdline-tools\latest

# Installer les packages
cd C:\Users\Francky\AppData\Local\Android\Sdk\cmdline-tools\latest\bin
.\sdkmanager.bat "platform-tools" "platforms;android-33" "build-tools;33.0.0"
```

---

## 🔍 VÉRIFICATION COMPLÈTE

### **Script de diagnostic**

```powershell
Write-Host "=== DIAGNOSTIC ANDROID SDK ===" -ForegroundColor Cyan
Write-Host ""

# Vérifier ANDROID_HOME
if ($env:ANDROID_HOME) {
    Write-Host "✅ ANDROID_HOME défini : $env:ANDROID_HOME" -ForegroundColor Green
    
    if (Test-Path $env:ANDROID_HOME) {
        Write-Host "✅ Dossier SDK existe" -ForegroundColor Green
    } else {
        Write-Host "❌ Dossier SDK introuvable !" -ForegroundColor Red
    }
} else {
    Write-Host "❌ ANDROID_HOME non défini" -ForegroundColor Red
}

Write-Host ""

# Vérifier ADB
$adb = Get-Command adb -ErrorAction SilentlyContinue
if ($adb) {
    Write-Host "✅ ADB trouvé : $($adb.Source)" -ForegroundColor Green
} else {
    Write-Host "❌ ADB non trouvé dans PATH" -ForegroundColor Red
}

Write-Host ""

# Vérifier local.properties
$localProps = "C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile\android\local.properties"
if (Test-Path $localProps) {
    Write-Host "✅ local.properties existe" -ForegroundColor Green
    Write-Host "Contenu :" -ForegroundColor Gray
    Get-Content $localProps
} else {
    Write-Host "❌ local.properties manquant" -ForegroundColor Red
}
```

---

## 💡 SOLUTION ALTERNATIVE : GitHub Actions

**Si la configuration locale est trop complexe**, utilisez l'APK GitHub Actions :

✅ Aucune configuration nécessaire
✅ Compilation dans le cloud
✅ Toujours fonctionnel

**Vérifiez ici :** https://github.com/franck3011/Coup2Fer-Mobile-/actions

---

## 📋 RÉCAPITULATIF ORDRE DES ACTIONS

1. ✅ **Installer Android Studio** → Fait ✓
2. ⚠️ **Installer Android SDK** → À faire
3. ✅ **Configurer variables d'environnement** → À faire
4. ✅ **Créer local.properties** → À faire
5. 🚀 **Compiler APK** → Après étapes précédentes

---

## 🎯 PROCHAINE ÉTAPE

**Choisissez une méthode :**

**A. Facile** → Ouvrir Android Studio → SDK Manager → Installer SDK
**B. Moyenne** → Configurer variables d'environnement PowerShell
**C. Alternative** → Utiliser l'APK GitHub Actions (aucune config)

**Quelle méthode préférez-vous ?**
