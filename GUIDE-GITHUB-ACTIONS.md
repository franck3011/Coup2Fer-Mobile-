# 🌐 COMPILER L'APK AVEC GITHUB ACTIONS

## 🎯 POURQUOI CETTE SOLUTION ?

Votre connexion internet bloque les téléchargements de Google (Gradle, SDK Android).

**GitHub Actions compile tout dans le cloud !**
- ✅ Rien à installer localement
- ✅ Pas de problème réseau
- ✅ Gratuit
- ✅ APK prêt en 10 minutes

---

## 📋 ÉTAPES À SUIVRE

### **ÉTAPE 1 : Créer un compte GitHub (si pas déjà fait)**

1. Allez sur : https://github.com/signup
2. Créez un compte gratuit
3. Confirmez votre email

---

### **ÉTAPE 2 : Créer un repository**

1. Allez sur : https://github.com/new
2. **Repository name** : `Coup2Fer-Mobile`
3. **Description** : Application mobile Coup 2 Fer
4. Sélectionnez **Public** (ou Private si vous préférez)
5. Cliquez **Create repository**

---

### **ÉTAPE 3 : Initialiser Git localement**

Dans PowerShell :

```powershell
cd C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile

# Initialiser Git
git init

# Configurer votre identité
git config user.name "VotreNom"
git config user.email "votre.email@example.com"

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Application mobile Coup 2 Fer"
```

---

### **ÉTAPE 4 : Pousser le code sur GitHub**

GitHub va vous donner des commandes après création du repo.

**OU utilisez ces commandes :**

```powershell
# Ajouter le repository distant (remplacez VOTRE-NOM par votre username GitHub)
git remote add origin https://github.com/VOTRE-NOM/Coup2Fer-Mobile.git

# Renommer la branche en main
git branch -M main

# Pousser le code
git push -u origin main
```

**GitHub va vous demander :**
- Username : votre nom d'utilisateur GitHub
- Password : utilisez un **Personal Access Token** (pas votre mot de passe)

---

### **ÉTAPE 5 : Créer un Personal Access Token**

1. Allez sur : https://github.com/settings/tokens
2. Cliquez **Generate new token** → **Generate new token (classic)**
3. **Note** : `Coup2Fer Mobile Build`
4. **Expiration** : 90 days
5. **Cochez** : `repo` (toutes les cases sous repo)
6. Cliquez **Generate token**
7. **COPIEZ LE TOKEN** (vous ne le verrez qu'une fois !)
8. Utilisez ce token comme mot de passe dans PowerShell

---

### **ÉTAPE 6 : Vérifier le workflow**

1. Allez sur votre repository GitHub
2. Cliquez sur l'onglet **Actions**
3. Vous verrez le workflow "Build Android APK" se lancer
4. ⏳ Attendez 8-10 minutes

---

### **ÉTAPE 7 : Télécharger l'APK**

1. Une fois le workflow terminé (✅ vert)
2. Cliquez sur le workflow
3. En bas, section **Artifacts**
4. Téléchargez **app-debug.zip**
5. Décompressez → **app-debug.apk** est dedans !

---

## 🎉 RÉSULTAT

Vous avez votre APK **sans rien installer** sur votre PC !

---

## 🔄 POUR REBUILDER PLUS TARD

Chaque fois que vous modifiez le code :

```powershell
cd C:\Users\Francky\CascadeProjects\Coup2Fer-Mobile
git add .
git commit -m "Description des changements"
git push
```

Le workflow se relance automatiquement !

---

## 💡 ALTERNATIVE : CLI GitHub

Si Git en ligne de commande est compliqué :

1. Téléchargez **GitHub Desktop** : https://desktop.github.com/
2. Interface graphique facile
3. Drag & drop vos fichiers
4. Cliquez "Commit" puis "Push"

---

## ⏱️ TEMPS TOTAL

| Étape | Durée |
|-------|-------|
| Créer compte GitHub | 5 min |
| Créer repository | 2 min |
| Pousser code | 5 min |
| Build APK (GitHub) | 8-10 min |
| **TOTAL** | **20-25 min** |

---

## 🆘 BESOIN D'AIDE ?

Si vous rencontrez un problème :
- Vérifiez que le fichier `.github/workflows/build-apk.yml` existe
- Vérifiez les logs dans l'onglet Actions
- Demandez-moi de l'aide !

**C'est la solution la plus fiable pour votre situation ! 🚀**
