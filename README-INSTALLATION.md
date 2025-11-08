# 📱 COUP 2 FER - Application Mobile

## ✅ CE QUI A ÉTÉ CRÉÉ

### Structure du projet
```
Coup2Fer-Mobile/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # Navigation bas de page
│   ├── pages/
│   │   ├── Login.tsx           # Connexion
│   │   ├── Register.tsx        # Inscription
│   │   ├── Dashboard.tsx       # Accueil client
│   │   ├── NewOrder.tsx        # Nouvelle commande
│   │   ├── Orders.tsx          # Mes commandes
│   │   ├── OrderDetails.tsx    # Détails commande
│   │   └── Profile.tsx         # Profil utilisateur
│   ├── store/
│   │   ├── authStore.ts        # Gestion authentification
│   │   └── orderStore.ts       # Gestion commandes
│   ├── types/
│   │   └── index.ts            # Types TypeScript
│   ├── lib/
│   │   └── firebase.ts         # Configuration Firebase
│   ├── App.tsx                 # Routage principal
│   ├── main.tsx                # Point d'entrée
│   └── index.css               # Styles Tailwind
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

### Fonctionnalités
- ✅ **Connexion/Inscription** avec formulaires complets
- ✅ **Dashboard** avec statistiques et commandes actives
- ✅ **Nouvelle commande** avec sélection d'articles
- ✅ **Mes commandes** avec onglets (En cours / Historique)
- ✅ **Détails commande** avec suivi en temps réel
- ✅ **Profil** utilisateur
- ✅ **Navigation mobile** optimisée

---

## 🚀 POUR DÉMARRER L'APPLICATION

### Étape 1 : Nettoyer et réinstaller
Ouvrez PowerShell dans le dossier `Coup2Fer-Mobile` et exécutez :

```powershell
# Fermer tous les processus Node
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

# Attendre 3 secondes
Start-Sleep -Seconds 3

# Supprimer node_modules
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# Installer patch-package globalement
npm install -g patch-package

# Réinstaller les dépendances
npm install --force
```

### Étape 2 : Lancer l'application
```powershell
npm run dev
```

L'application devrait se lancer sur **http://localhost:3001**

---

## 📊 TESTER L'APPLICATION

### Compte de démo
- **Email** : client@coup2fer.com
- **Mot de passe** : (n'importe quoi pour le démo)

### Pages disponibles
- **/** → Dashboard avec statistiques
- **/new-order** → Créer une nouvelle commande
- **/orders** → Voir toutes les commandes
- **/orders/:id** → Détails d'une commande
- **/profile** → Profil utilisateur

---

## 🔗 PARTAGER LA BASE DE DONNÉES AVEC LE SITE WEB

### Configuration Firebase à faire
1. Ouvrir `src/lib/firebase.ts`
2. Remplacer les valeurs par votre config Firebase :

```typescript
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_AUTH_DOMAIN",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_STORAGE_BUCKET",
  messagingSenderId: "VOTRE_MESSAGING_ID",
  appId: "VOTRE_APP_ID"
}
```

### Copier depuis le site web
Utilisez la **même configuration** que dans :
`Coup2Fer/src/lib/firebase.ts`

---

## 📱 GÉNÉRER L'APK ANDROID

### Prérequis
1. **Android Studio** installé
2. **Java JDK 11+** installé

### Étapes pour générer l'APK

#### 1. Initialiser Capacitor
```powershell
npx cap init "Coup2Fer" "com.coup2fer.mobile"
```

#### 2. Ajouter la plateforme Android
```powershell
npx cap add android
```

#### 3. Build de l'application
```powershell
npm run build
npx cap sync
```

#### 4. Ouvrir dans Android Studio
```powershell
npx cap open android
```

#### 5. Générer l'APK dans Android Studio
1. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Attendre la compilation
3. L'APK sera dans : `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔄 SYNCHRONISATION TEMPS RÉEL

### Comment ça marche
1. **Site Web** (Coup2Fer) → Admin gère les commandes
2. **App Mobile** (Coup2Fer-Mobile) → Client passe/suit les commandes
3. **Firebase** → Base de données commune en temps réel

### Mise à jour des stores
Les stores Zustand (`authStore`, `orderStore`) doivent être connectés à Firebase pour la sync temps réel :

```typescript
// Exemple dans orderStore.ts
import { db } from '../lib/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

// Écouter les changements en temps réel
onSnapshot(collection(db, 'orders'), (snapshot) => {
  const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  setOrders(orders)
})
```

---

## 🎨 PERSONNALISATION

### Couleurs principales
Dans `tailwind.config.js` :
```javascript
primary: {
  500: '#0ea5e9',  // Bleu principal
  600: '#0284c7',  // Bleu foncé
  700: '#0369a1',  // Bleu très foncé
}
```

### Logo
Remplacer le logo dans `index.html` et créer les icônes dans `public/`

---

## 🐛 PROBLÈMES COURANTS

### "Cannot find module 'vite'"
```powershell
npm install -D vite --force
```

### "lucide-react not found"
```powershell
npm install lucide-react --force
```

### Port déjà utilisé
Changer le port dans `vite.config.ts` :
```typescript
server: {
  port: 3002, // Changer ici
}
```

### Erreur Capacitor
```powershell
npm install @capacitor/core @capacitor/cli --force
```

---

## 📞 PROCHAINES ÉTAPES

1. ✅ Tester l'application web mobile
2. ⏳ Connecter Firebase pour la sync temps réel
3. ⏳ Générer l'APK Android
4. ⏳ Tester l'APK sur téléphone
5. ⏳ Publier sur Google Play Store (optionnel)

---

## 💡 NOTES IMPORTANTES

- **Mode démo** : L'application fonctionne actuellement avec des données de démo
- **Firebase** : À configurer pour la production
- **Paiements** : À intégrer (Stripe, PayPal, etc.)
- **Notifications push** : À configurer avec Firebase Cloud Messaging
- **Photos** : À implémenter la prise de photo avec Capacitor Camera

---

## 📚 DOCUMENTATION UTILE

- **Vite** : https://vitejs.dev/
- **React Router** : https://reactrouter.com/
- **Capacitor** : https://capacitorjs.com/
- **Firebase** : https://firebase.google.com/docs
- **Tailwind CSS** : https://tailwindcss.com/
- **Lucide Icons** : https://lucide.dev/

---

🎉 **Votre application mobile est prête à être testée !**
