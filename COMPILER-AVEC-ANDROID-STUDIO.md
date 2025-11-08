# 🎯 COMPILER L'APK AVEC ANDROID STUDIO

## ✅ PRÉREQUIS INSTALLÉS
- ✅ Android Studio
- ✅ Node.js
- ✅ Java JDK

---

## 📋 ÉTAPES POUR COMPILER LOCALEMENT

### **1. Ouvrir le projet Android**

1. Lancez **Android Studio**
2. Cliquez sur **"Open"**
3. Naviguez vers : `C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile\android`
4. Sélectionnez le dossier **android** et cliquez sur **"OK"**

**⏰ Première ouverture : 5-10 minutes** (Gradle sync, indexation)

---

### **2. Compiler le projet web d'abord**

**IMPORTANT** : Avant de compiler l'APK Android, il faut compiler le projet web !

Ouvrez PowerShell dans le dossier du projet :

```powershell
cd C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile

# Installer les dépendances (si pas fait)
npm install

# Compiler l'application web
npm run build

# Synchroniser avec Capacitor
npx cap sync android
```

**✅ Vérifiez** qu'un dossier `dist/` a été créé avec les fichiers compilés

---

### **3. Générer l'APK dans Android Studio**

Une fois le projet ouvert et synchronisé :

1. **Menu** → **Build** → **Build Bundle(s) / APK(s)**
2. Cliquez sur **"Build APK(s)"**
3. **Attendez** la compilation (3-5 minutes)
4. Une notification apparaîtra : **"APK(s) generated successfully"**
5. Cliquez sur **"locate"** pour ouvrir le dossier

---

### **4. Localisation de l'APK**

L'APK se trouve ici :
```
C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile\android\app\build\outputs\apk\debug\app-debug.apk
```

**Taille attendue** : 15-30 MB

---

## 🚀 INSTALLATION SUR TÉLÉPHONE

### **Méthode 1 : USB**
1. Connectez votre téléphone Android en USB
2. Activez le **Mode Développeur** et **Débogage USB**
3. Copiez `app-debug.apk` sur le téléphone
4. Ouvrez le fichier APK et installez

### **Méthode 2 : Sans câble**
1. Envoyez l'APK par email à vous-même
2. Ouvrez l'email sur le téléphone
3. Téléchargez et installez l'APK

---

## ⚡ COMPILATION RAPIDE (COMMANDE)

Vous pouvez aussi compiler directement en ligne de commande :

```powershell
cd C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile

# Build web
npm run build

# Sync Capacitor
npx cap sync android

# Compiler APK
cd android
.\gradlew assembleDebug

# L'APK sera dans : android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🔍 VÉRIFIER L'APK

Script PowerShell pour vérifier :

```powershell
.\check-apk.ps1
```

---

## ❌ DÉPANNAGE

### **Erreur : Gradle sync failed**
- Vérifiez votre connexion internet
- **File** → **Invalidate Caches / Restart**

### **Erreur : SDK not found**
- Ouvrez **Tools** → **SDK Manager**
- Installez **Android SDK Platform 33**
- Installez **Android SDK Build-Tools 33.0.0**

### **Erreur : JAVA_HOME**
- Vérifiez que Java est installé : `java -version`
- Android Studio devrait détecter automatiquement le JDK

### **Gradle téléchargement lent**
- Patience ! Premier build = téléchargement de dépendances
- Peut prendre 10-20 minutes la première fois

---

## 💡 RECOMMANDATION

**Si vous rencontrez des problèmes** → Utilisez l'APK de GitHub Actions !

GitHub compile dans le cloud sans problème de réseau local.

Vérifiez : https://github.com/franck3011/Coup2Fer-Mobile-/actions

---

## 📱 APRÈS INSTALLATION

1. Ouvrez l'app **COUP 2 FER**
2. Connectez-vous avec : `client@coup2fer.com` / `password`
3. Testez toutes les fonctionnalités !

---

## 🎊 FONCTIONNALITÉS DE L'APP

✅ 7 pages complètes
✅ 6 commandes de démonstration
✅ 4 offres d'abonnement
✅ Page Suivi en temps réel
✅ Design moderne avec animations
✅ Menu navigation 5 icônes

**Profitez de votre application mobile ! 🚀**
