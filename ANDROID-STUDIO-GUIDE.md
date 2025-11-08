# 🤖 GUIDE INSTALLATION ANDROID STUDIO

## ⚠️ POURQUOI ANDROID STUDIO EST NÉCESSAIRE

Le SDK Android (obligatoire pour compiler l'APK) n'est pas installé.

**Android Studio contient TOUT :**
- ✅ SDK Android
- ✅ Outils de compilation
- ✅ Gradle pré-configuré
- ✅ Émulateurs Android
- ✅ Interface graphique facile

---

## 📥 ÉTAPE 1 : TÉLÉCHARGER

**Page ouverte dans votre navigateur**
https://developer.android.com/studio

1. Cliquez sur **"Download Android Studio"**
2. Acceptez les conditions
3. Téléchargement : ~1 GB
4. Attendez la fin du téléchargement

---

## 🔧 ÉTAPE 2 : INSTALLER

1. **Ouvrez le fichier téléchargé** (`android-studio-*.exe`)
2. Suivez l'assistant d'installation
3. **Cochez toutes les cases** (Android SDK, Android Virtual Device)
4. Choisissez l'emplacement d'installation (défaut recommandé)
5. Cliquez **Next** → **Next** → **Install**
6. ⏳ **Patience** : Installation ~10-15 minutes

---

## ⚙️ ÉTAPE 3 : PREMIÈRE CONFIGURATION

1. **Lancez Android Studio**
2. **Import Settings** → Choisissez "Do not import settings"
3. **Welcome** → Cliquez **Next**
4. **Install Type** → Choisissez **Standard**
5. **Theme** → Choisissez votre préférence
6. **Verify Settings** → Cliquez **Finish**
7. ⏳ **Téléchargement SDK** : 5-10 minutes

---

## 🚀 ÉTAPE 4 : OUVRIR VOTRE PROJET

1. Dans Android Studio, cliquez **Open**
2. Naviguez vers : 
   ```
   C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile\android
   ```
3. Cliquez **OK**
4. ⏳ **Gradle Sync** : Attendez 2-5 minutes (barre en bas)
5. Attendez le message : ✓ **"Gradle Build Finished"**

---

## 📦 ÉTAPE 5 : GÉNÉRER L'APK

1. Menu **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. ⏳ **Compilation** : 3-5 minutes
3. Notification apparaît : **"APK(s) generated successfully"**
4. Cliquez sur **locate**
5. 🎉 **Votre APK est là !**

**Emplacement :**
```
android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 📱 ÉTAPE 6 : INSTALLER SUR TÉLÉPHONE

### **Option A : Transfert USB**
1. Copiez `app-debug.apk` sur votre téléphone
2. Ouvrez le fichier sur le téléphone
3. Autorisez "Sources inconnues"
4. Installez
5. Lancez **Coup 2 Fer** !

### **Option B : Directement depuis Android Studio**
1. Connectez téléphone en USB
2. Activez **mode développeur** et **débogage USB** sur le téléphone
3. Dans Android Studio : **Run** → **Run 'app'**
4. L'app s'installe automatiquement !

---

## ⏱️ TEMPS TOTAL ESTIMÉ

| Étape | Durée |
|-------|-------|
| Téléchargement | 5-10 min |
| Installation | 10-15 min |
| Config SDK | 5-10 min |
| Ouvrir projet | 2-5 min |
| Build APK | 3-5 min |
| **TOTAL** | **25-45 min** |

---

## 💾 ESPACE DISQUE REQUIS

- Android Studio : ~3 GB
- SDK Android : ~2 GB
- **Total : ~5 GB**

---

## 🎉 RÉSULTAT FINAL

Après ces étapes, vous aurez :

✅ **APK installable** : `app-debug.apk`
✅ **Application fonctionnelle** sur téléphone Android
✅ **Android Studio** pour futurs développements
✅ **Émulateur** pour tester sans téléphone

---

## 🆘 PROBLÈMES COURANTS

### "Gradle sync failed"
- **Solution** : File → Invalidate Caches / Restart

### "SDK not found"
- **Solution** : File → Project Structure → SDK Location → Vérifier le chemin

### "Build failed"
- **Solution** : Build → Clean Project, puis re-build

---

## 🎯 ALTERNATIVE SI VOUS NE VOULEZ PAS ANDROID STUDIO

**Uniquement si vous avez déjà un téléphone Android :**

1. Téléchargez le SDK Android manuellement (~2 GB)
2. Configurez ANDROID_HOME
3. Installez les build-tools
4. Compilez en ligne de commande

**⚠️ C'est BEAUCOUP plus compliqué !**

**Je recommande vraiment Android Studio, c'est plus simple et plus fiable ! 🚀**
