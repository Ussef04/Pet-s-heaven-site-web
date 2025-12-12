# Pet's Heaven — Plateforme de gestion pour animaux de compagnie 🐾

Une plateforme web moderne et complète pour gérer la santé, l'alimentation, les rendez-vous vétérinaires et découvrir une communauté passionnée autour des chats au Maroc.

## 🎯 Fonctionnalités Principales

### 📱 Pages Disponibles

1. **Accueil (index.html)** ⭐
   - Présentation élégante de la plateforme
   - Menu d'accès aux sections principales
   - Plans d'abonnement (Découverte, Plus, Pro, Premium)
   - Authentification intégrée (login/signup)

2. **Catalogue Produits (products.html)** 🛍️
   - Affichage dynamique de produits pour animaux
   - Filtrage par catégorie (Alimentation, Jouets, Hygiène, Accessoires)
   - Design responsive et interactif

3. **Répertoire Vétérinaires (vets.html)** 🏥
   - Liste complète des vétérinaires au Maroc
   - Filtrage avancé par ville et spécialité
   - Informations de contact détaillées
   - Prise de RDV directe

4. **Prise de Rendez-vous (rdv.html)** 📅
   - Formulaire intuitif de réservation
   - Sélection du vétérinaire, date et heure
   - Validation des dates
   - Confirmation et rappels via localStorage

5. **Suivi des Chats (pets.html)** 🐱
   - Gestion complète des profils de chats
   - Enregistrement des données (nom, âge, race, poids)
   - Suppression et modification de profils
   - Accès rapide aux services

6. **Blog & Conseils (blog.html)** 📖
   - Articles d'experts sur la santé féline
   - Filtrage par catégorie (Santé, Nutrition, Comportement, Soins)
   - Recherche dynamique
   - Contenu riche et éducatif

7. **Galerie Communautaire (gallery.html)** 📸
   - Partage de photos des chats
   - Filtrage par thème (Mignon, Drôle, Nature, Selfie)
   - Système de likes interactif
   - Upload simplifié

8. **Forum Communautaire (forum.html)** 💬
   - Discussions entre utilisateurs
   - Catégories de discussions
   - Création de nouveaux sujets
   - Statistiques (réponses, vues)

9. **Services Premium (services.html)** ✨
   - Consultation vétérinaire virtuelle
   - Carnet de santé numérique
   - Plans nutritionnels personnalisés
   - Assurance santé pour chats
   - Formation comportement
   - Grooming à domicile

10. **Dashboard Personnel (dashboard.html)** 📊
    - Vue d'ensemble personnalisée
    - Statistiques (chats, RDV, vaccins)
    - Gestion des profils de chats
    - Historique des rendez-vous
    - Gestion d'abonnement
    - Paramètres utilisateur

## 🎨 Design & Animations

- ✨ **Animations fluides** : fadeInUp, slideInLeft, pulse, bounce, glow
- 🌈 **Gradients dynamiques** : Dégradés modernes et attrayants
- 🎯 **Interactions fluides** : Hover effects, transitions smoothes
- 📱 **Responsive Design** : Parfait sur mobile, tablette et desktop
- ♿ **Accessibilité** : Attributs ARIA, navigation au clavier

## 📋 Stack technique

- **Frontend:**
  - HTML5 sémantique
  - CSS3 avancé (gradients, animations, flexbox)
  - JavaScript vanilla (ES6+)
  - Bootstrap 5.3.3 CDN
  - Bootstrap Icons 1.11.3

- **Stockage:**
  - LocalStorage (données client)
  - JSON pour sérialisation

- **Aucune dépendance backend** — Application entièrement côté client

## 🚀 Comment démarrer

### Option 1 : Avec Python ⭐ (Recommandé)
```powershell
cd "C:\Users\HP EliteBook 840 G6\Downloads\WebPet's"
python -m http.server 8000
Start-Process "http://localhost:8000"
```

### Option 2 : Avec Node.js
```powershell
npx serve . -l 8000
Start-Process "http://localhost:8000"
```

### Option 3 : VS Code Live Server
- Installer l'extension "Live Server"
- Clic droit sur `index.html` → "Open with Live Server"

## 📁 Structure du projet

```
WebPet's/
├── index.html                 # Page d'accueil
├── products.html              # Catalogue produits
├── vets.html                  # Répertoire vétérinaires
├── rdv.html                   # Prise de RDV
├── pets.html                  # Suivi des chats
├── blog.html                  # Blog & conseils
├── gallery.html               # Galerie photos
├── forum.html                 # Forum communautaire
├── services.html              # Services premium
├── dashboard.html             # Dashboard personnel
├── README.md                  # Ce fichier
└── assets/
    ├── css/
    │   └── styles.css         # Styles personnalisés avancés
    ├── images/
    │   ├── Logo.jpg           # Logo Pet's Heaven
    │   ├── image.chats.jpg    # Image d'accueil
    │   └── icons/             # Icônes supplémentaires
    └── js/
        ├── script.js          # JavaScript global (auth, navbar)
        ├── products.js        # Logique page produits
        ├── vets.js            # Logique page vétérinaires
        ├── rdv.js             # Logique page RDV
        ├── pets.js            # Logique page chats
        ├── blog.js            # Logique page blog
        ├── gallery.js         # Logique page galerie
        ├── forum.js           # Logique page forum
        ├── services.js        # Logique page services
        └── dashboard.js       # Logique page dashboard
```

## 🔐 Système d'Authentification (Démo)

L'authentification utilise `localStorage` pour une démo locale :
- **Inscription** : Création d'un compte avec email et mot de passe
- **Connexion** : Vérification des identifiants stockés localement
- **Déconnexion** : Effacement de la session active
- **UI Dynamique** : Affichage différent selon l'état d'authentification

⚠️ **Note** : Pour une vraie application, intégrez un backend sécurisé (Node.js, Python, PHP).

## 💾 Données stockées (localStorage)

```javascript
ph_users              // Liste des utilisateurs
ph_session            // Session utilisateur actuelle
ph_subscription_plan  // Plan d'abonnement choisi
ph_rdv                // Rendez-vous réservés
ph_pets               // Profils des chats
```

## 🎨 Personnalisation

### Couleurs principales (assets/css/styles.css)
```css
:root {
  --ph-primary: #4f46e5;     /* Indigo */
  --ph-accent: #f59e0b;      /* Doré */
  --ph-light: #f3f4f6;       /* Gris très clair */
  --ph-dark: #1f2937;        /* Gris foncé */
}
```

### Police
`Segoe UI` + `Bootstrap Poppins`

## 🌍 Contenu

✅ Tout le contenu est en français  
✅ Tarification en MAD (Moroccan Dirham)  
✅ Références au Maroc (villes, contacts)

## ✨ Prochaines étapes (optionnel)

- [ ] Backend API (Node.js/Express, Django, FastAPI)
- [ ] Base de données (MongoDB, PostgreSQL)
- [ ] Authentification sécurisée (JWT, OAuth)
- [ ] Paiement intégré (Stripe, PayPal, Maroc Telecom)
- [ ] Notifications (Email, SMS, Push)
- [ ] Géolocalisation des vétérinaires
- [ ] Téléchargement de carnet PDF
- [ ] Application mobile (React Native, Flutter)
- [ ] Analytics & Reporting

## 🧪 Validation & Testing

Avant de déployer:
- ✅ Vérifier tous les modales (ouverture/fermeture)
- ✅ Tester les filtres et recherches
- ✅ Valider les formulaires
- ✅ Inspecter localStorage (F12 → Application)
- ✅ Vérifier les assets (Network tab)
- ✅ Console sans erreurs (F12 → Console)

## 📞 Contact & Support

**Email:** supportpetsheaven@gmail.com  
**Téléphone:** 07.06.43.37.77  
**Fixe:** 05.22.32.23.12

## 📄 Licence

© 2025 Pet's Heaven — Made with ❤️ for your pets

---

**Statut:** ✅ Production-Ready  
**Version:** 2.0  
**Mise à jour:** Novembre 2025
