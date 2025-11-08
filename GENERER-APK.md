# 📱 GÉNÉRATION APK - COUP 2 FER MOBILE

## ✅ ÉTAPES COMPLÉTÉES

- ✅ **Build production** → `dist/` créé avec succès
- ✅ **Capacitor initialisé** → Configuration créée
- ✅ **Plateforme Android ajoutée** → Dossier `android/` créé
- ✅ **Synchronisation** → Fichiers copiés vers Android

---

## 🎯 PROCHAINES ÉTAPES POUR GÉNÉRER L'APK

### **OPTION 1 : Avec Android Studio (Recommandé)**

#### 1. Ouvrir le projet dans Android Studio
```powershell
npx cap open android
```

#### 2. Dans Android Studio
1. Attendre que Gradle finisse de synchroniser (barre en bas)
2. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Attendre la compilation (3-5 minutes)
4. Cliquer sur **locate** dans la notification
5. L'APK sera dans : `android/app/build/outputs/apk/debug/app-debug.apk`

---

### **OPTION 2 : En ligne de commande (Sans Android Studio)**

#### Prérequis
- Java JDK 17+ installé
- Android SDK installé

#### Commande
```powershell
cd android
.\gradlew assembleDebug
```

L'APK sera généré dans :
```
android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📦 FICHIER APK GÉNÉRÉ

### Où le trouver ?
```
C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile\android\app\build\outputs\apk\debug\app-debug.apk
```

### Comment l'installer ?

#### Sur un téléphone Android :
1. Transférer l'APK sur le téléphone (USB, email, cloud)
2. Ouvrir le fichier APK sur le téléphone
3. Autoriser l'installation depuis "Sources inconnues"
4. Installer l'application
5. Lancer **Coup 2 Fer** !

#### Tester sur émulateur :
```powershell
npx cap run android
```

---

## 🔧 SI ANDROID STUDIO N'EST PAS INSTALLÉ

### Télécharger Android Studio
https://developer.android.com/studio

### Installation minimale requise
1. Android Studio
2. Android SDK (API 33 ou supérieur)
3. Java JDK 17

---

## 🚀 APK DE PRODUCTION (Pour Play Store)

### Générer un APK signé
1. Créer une clé de signature
2. Configurer `android/app/build.gradle`
3. Build en mode release :
```powershell
cd android
.\gradlew assembleRelease
```

---

## 📊 INFORMATIONS APK

- **Nom de l'app** : Coup 2 Fer
- **Package** : com.coup2fer.mobile
- **Version** : 1.0.0
- **Taille** : ~10-15 MB
- **Min Android** : 5.0 (Lollipop)

---

## ⚠️ PROBLÈMES COURANTS

### "Android SDK not found"
Installer Android Studio et configurer le SDK

### "Java not found"
Installer Java JDK 17 :
```powershell
winget install Oracle.JDK.17
```

### "Gradle sync failed"
Dans Android Studio :
- **File** → **Invalidate Caches / Restart**

---

## 📱 TESTER L'APK

### Sur émulateur
```powershell
# Lancer l'émulateur et installer l'APK
npx cap run android
```

### Sur téléphone physique
1. Activer le **mode développeur**
2. Activer le **débogage USB**
3. Connecter le téléphone
4. `npx cap run android`

---

## 🎉 FÉLICITATIONS !

Votre application mobile **Coup 2 Fer** est prête à être compilée en APK !

**Prochaines étapes suggérées :**
1. ✅ Générer l'APK
2. ✅ Tester sur téléphone
3. ⏳ Connecter Firebase pour sync temps réel
4. ⏳ Ajouter paiement réel
5. ⏳ Publier sur Google Play Store
