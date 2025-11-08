# 🚀 COMPILER L'APK SANS ANDROID STUDIO

## 💡 SOLUTIONS ALTERNATIVES (Plus simples !)

---

## ✅ SOLUTION 1 : Android Command Line Tools (Recommandé)

### Étape 1 : Télécharger les Command Line Tools
1. Allez sur : https://developer.android.com/studio#command-line-tools-only
2. Téléchargez : **"Command line tools only"** pour Windows (~150 MB)
3. Fichier : `commandlinetools-win-*.zip`

### Étape 2 : Extraire et configurer
```powershell
# Créer le dossier SDK
New-Item -ItemType Directory -Force -Path "C:\Android\cmdline-tools"

# Extraire le ZIP téléchargé dans :
# C:\Android\cmdline-tools\latest\

# Configurer les variables d'environnement
$env:ANDROID_HOME = "C:\Android"
$env:Path = "$env:ANDROID_HOME\cmdline-tools\latest\bin;$env:Path"
```

### Étape 3 : Installer les packages nécessaires
```powershell
cd C:\Android\cmdline-tools\latest\bin
.\sdkmanager.bat "platform-tools" "platforms;android-33" "build-tools;33.0.0"
```

### Étape 4 : Compiler l'APK
```powershell
cd C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile\android
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:ANDROID_HOME = "C:\Android"
.\gradlew.bat assembleDebug
```

**APK généré dans :** `android\app\build\outputs\apk\debug\app-debug.apk`

---

## ✅ SOLUTION 2 : Compiler en ligne avec GitHub Actions (GRATUIT)

### Créer un compte GitHub (si pas déjà fait)
https://github.com/signup

### Étapes :
1. Créer un repo GitHub
2. Pousser votre code
3. Créer un workflow GitHub Actions
4. GitHub compile l'APK automatiquement
5. Télécharger l'APK depuis GitHub

**Je peux vous guider étape par étape !**

---

## ✅ SOLUTION 3 : Utiliser Appetize.io (Test uniquement)

Tester l'app en ligne sans APK :
https://appetize.io/

- Upload votre projet
- Teste dans un émulateur en ligne
- Gratuit pour tests limités

---

## ✅ SOLUTION 4 : Ionic Appflow (Service payant mais essai gratuit)

https://ionic.io/appflow

- Build APK dans le cloud
- Pas besoin d'installer quoi que ce soit
- Essai gratuit disponible

---

## 🎯 MA RECOMMANDATION

### Pour vous, je recommande **SOLUTION 1 : Command Line Tools**

**Pourquoi ?**
- ✅ Plus léger qu'Android Studio (~150 MB vs ~3 GB)
- ✅ Pas d'interface graphique compliquée
- ✅ Juste ce qu'il faut pour compiler
- ✅ Fonctionne en ligne de commande

**OU SOLUTION 2 : GitHub Actions**
- ✅ Rien à installer localement
- ✅ Gratuit
- ✅ Compilation dans le cloud
- ✅ APK téléchargeable

---

## 📋 QUELLE SOLUTION VOULEZ-VOUS ?

1. **Command Line Tools** (léger, local)
2. **GitHub Actions** (rien à installer, cloud)
3. **Autre solution ?**

Dites-moi et je vous guide pas à pas ! 🚀
