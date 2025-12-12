# Guide d'Utilisation - Plateforme Pet's Heaven

## 🎯 Vue d'ensemble

Pet's Heaven est une plateforme complète de services vétérinaires qui connecte les clients avec les vétérinaires professionnels, facilite la gestion des rendez-vous, et offre des produits et services pour le bien-être animal.

---

## 📱 Architecture de la Plateforme

### Pages Principales

```
home.html                    ← Nouvelle page d'accueil (point d'entrée)
├── Authentification
│   ├── Login (tous les utilisateurs)
│   ├── Signup Client
│   └── Signup Vétérinaire
│
client-dashboard.html        ← Tableau de bord pour les clients
├── Gestion des rendez-vous
├── Gestion des animaux
├── Accès aux vétérinaires
└── Accès aux produits
│
vet-dashboard.html          ← Tableau de bord pour les vétérinaires
├── Gestion des rendez-vous reçus
├── Configuration des disponibilités
├── Gestion du profil professionnel
└── Statistiques
```

---

## 🔐 Système d'Authentification

### Rôles Supportés

#### 1. **CLIENT** (Utilisateur Standard)
- Peut créer un compte client
- Prend rendez-vous auprès de vétérinaires
- Gère ses animaux de compagnie
- Consulte les produits
- Accède au tableau de bord client

#### 2. **VÉTÉRINAIRE** (Professionnel)
- Peut créer un compte vétérinaire avec licence professionnelle
- Gère les rendez-vous reçus
- Configure ses disponibilités
- Maintient son profil professionnel
- Accède au tableau de bord vétérinaire

### Flux d'Authentification

```
Page d'Accueil (home.html)
↓
Utilisateur choisit : "Se Connecter" ou "Créer un Compte"
↓
Création/Login
↓
Validation des données (localStorage)
↓
Session créée (ph_session)
↓
Redirection automatique vers :
  - client-dashboard.html (pour clients)
  - vet-dashboard.html (pour vétérinaires)
```

---

## 📊 Structure des Données (localStorage)

### Clés de Stockage

```javascript
ph_session              // Session utilisateur actuelle {type, id, name, email, ...}
ph_clients              // Array des clients créés
ph_vets                 // Array des vétérinaires enregistrés
ph_appointments         // Array des rendez-vous
ph_availability         // Array des disponibilités vétérinaires
ph_products             // Array des produits
```

### Objet Client
```javascript
{
  id: "timestamp",
  type: "client",
  name: "Jean Dupont",
  email: "jean@exemple.com",
  phone: "+212 6XX XXX XXX",
  password: "encrypted_or_hash", // Idéalement hashé en production
  createdAt: "ISO_DATE",
  pets: [
    {
      id: "timestamp",
      name: "Minou",
      type: "Chat",
      breed: "Persan",
      age: 3,
      weight: 4.5
    }
  ],
  appointments: [
    {
      id: "timestamp",
      vetId: "vet_id",
      vetName: "Dr. Ahmed",
      petName: "Minou",
      date: "2024-12-15",
      time: "14:30",
      status: "confirmé", // en attente, confirmé, annulé
      reason: "Visite de contrôle"
    }
  ]
}
```

### Objet Vétérinaire
```javascript
{
  id: "timestamp",
  type: "vet",
  name: "Ahmed Ben Ali",
  email: "vet@exemple.com",
  phone: "+212 6XX XXX XXX",
  specialty: "Chirurgie",
  city: "Casablanca",
  clinic: "Clinique Vétérinaire Casablanca",
  license: "VET-2024-001",
  password: "encrypted_or_hash",
  createdAt: "ISO_DATE",
  verified: false, // À implémenter : vérification de la licence
  availability: [
    {
      day: "lundi",
      status: "available",
      startTime: "08:00",
      endTime: "17:00"
    }
  ],
  appointments: [] // RDV reçus
}
```

---

## 🏠 Page d'Accueil (home.html)

### Sections

1. **Navbar Sticky**
   - Logo et nom du service
   - Menu de navigation

2. **Section Héro**
   - Titre accrocheur
   - Sous-titre explicatif
   - Boutons d'action (Se Connecter / Créer Compte)

3. **Services**
   - Consultations vétérinaires
   - Produits et accessoires
   - Assistance 24/7
   - Bien-être animal

4. **Qui Êtes-Vous ?**
   - Présentation des rôles clients et vétérinaires
   - Listes des avantages pour chaque profil

5. **Section Authentification**
   - Bouton "Se Connecter"
   - Bouton "Créer Compte Client"
   - Bouton "Créer Compte Vétérinaire"

6. **Footer**
   - Navigation rapide
   - Liens légaux
   - Informations de contact

### Modales d'Authentification

#### Login Modal (`#loginModal`)
- Email (requis)
- Mot de passe (requis)
- Checkbox "Rester connecté"
- Validation contre ph_clients et ph_vets

#### Signup Client Modal (`#signupClientModal`)
- Nom complet
- Email (unique)
- Téléphone
- Mot de passe
- Confirmation mot de passe
- Acceptation conditions d'utilisation

#### Signup Vétérinaire Modal (`#signupVetModal`)
- Nom complet
- Email (unique)
- Téléphone
- Spécialité (dropdown)
- Ville
- Nom clinique/cabinet
- Numéro de licence (unique)
- Mot de passe
- Confirmation mot de passe

---

## 📋 Tableau de Bord Client (client-dashboard.html)

### Navigation Principale

- **Tableau de Bord** : Vue d'ensemble avec statistiques
- **Mes Rendez-vous** : Gestion des RDV
- **Mes Animaux** : Gestion des profils d'animaux
- **Vétérinaires** : Consultation du répertoire
- **Produits** : Accès aux produits disponibles

### Fonctionnalités

#### 1. Tableau de Bord Principal
- Statistiques : Rendez-vous, Animaux, Vétérinaires, Commandes
- Actions rapides
- Accès direct aux services

#### 2. Gestion des Rendez-vous
- Affichage des RDV existants avec statut
- Bouton "Nouveau Rendez-vous"
- Lien vers rdv.html pour réserver

#### 3. Gestion des Animaux
- Affichage des profils d'animaux
- Bouton "Ajouter un Animal"
- Modification/suppression d'animaux
- Lien vers pets.html

#### 4. Consultation des Vétérinaires
- Affichage de tous les vétérinaires enregistrés
- Filtres : spécialité, ville
- Bouton "Prendre RDV" pour chaque vétérinaire

#### 5. Catalogue Produits
- Affichage des produits disponibles
- Prix en DH (Dirham)
- Bouton "Ajouter au Panier"

---

## 🏥 Tableau de Bord Vétérinaire (vet-dashboard.html)

### Navigation Principale

- **Tableau de Bord** : Vue d'ensemble
- **Rendez-vous** : Gestion des demandes RDV
- **Disponibilités** : Configuration des horaires
- **Mon Profil** : Gestion des informations professionnelles

### Fonctionnalités

#### 1. Tableau de Bord Principal
- Statistiques :
  - Total rendez-vous
  - Rendez-vous en attente
  - Nombre de clients
  - Créneaux libres
- Actions rapides

#### 2. Gestion des Rendez-vous
- Affichage des demandes de RDV
- Statuts : En attente, Confirmé, Annulé
- Actions : Confirmer / Refuser (pour en attente)
- Détails du client et de l'animal
- Notes/motif de consultation

#### 3. Configuration des Disponibilités
- Sélection jour de la semaine
- Statut : Disponible/Indisponible
- Heure de début et fin
- Sauvegarde et affichage des horaires configurés

#### 4. Profil Professionnel
- Affichage (lecture seule) : Nom, Email, Spécialité, Licence
- Éditable : Téléphone, Ville, Nom Clinique
- Bouton "Mettre à jour"

---

## 🔄 Workflows Importants

### Workflow Client : Prendre un Rendez-vous

```
1. Accès au client-dashboard.html
   ↓
2. Clic sur "Vétérinaires" dans le menu
   ↓
3. Affichage de la liste des vétérinaires
   ↓
4. Clic sur "Prendre RDV" pour un vétérinaire
   ↓
5. Redirection vers rdv.html avec vet_id pré-rempli
   ↓
6. Remplissage du formulaire RDV
   ↓
7. Sauvegarde dans ph_appointments
   ↓
8. Affichage en attente sur le tableau de bord client
   ↓
9. Vétérinaire voit la demande sur son tableau de bord
```

### Workflow Vétérinaire : Confirmer un Rendez-vous

```
1. Accès au vet-dashboard.html
   ↓
2. Clic sur "Rendez-vous" dans le menu
   ↓
3. Affichage des demandes en attente
   ↓
4. Clic sur "Confirmer" ou "Refuser"
   ↓
5. Statut RDV mis à jour
   ↓
6. Client voit l'update sur son dashboard
```

---

## 🎨 Design et Responsivité

### Système de Couleurs
```
Primary:     #4f46e5 (Indigo)
Secondary:   #7c3aed (Violet)
Accent:      #f59e0b (Doré)
Success:     #10b981 (Vert)
Danger:      #ef4444 (Rouge)
Light BG:    #f8fafc
Dark Text:   #1f2937
```

### Breakpoints Bootstrap
- **Desktop** : >= 992px
- **Tablet** : 576px - 991px
- **Mobile** : < 576px

### Améliorations Responsives
- Sidebar pliable sur mobile
- Grilles fluides
- Boutons adaptés à la taille de l'écran
- Navigation tactile optimisée

---

## 🔒 Sécurité (Remarques Importantes)

⚠️ **Important** : Cette implémentation utilise `localStorage` avec des mots de passe en texte brut à des fins de démonstration. 

**Pour la production**, implémenter :
1. ✅ Hachage des mots de passe (bcrypt, Argon2)
2. ✅ Communication HTTPS uniquement
3. ✅ JWT tokens avec expiration
4. ✅ Backend API avec validation serveur
5. ✅ Rate limiting et protection CSRF
6. ✅ Vérification des licences vétérinaires
7. ✅ Audit logging

---

## 🚀 Intégrations Futures

### Court Terme
- [ ] Téléchargement de la licence vétérinaire
- [ ] Vérification d'email
- [ ] Paiement en ligne (Stripe, Paypal)
- [ ] Notifications push
- [ ] Chat en temps réel

### Moyen Terme
- [ ] Dossier médical complet des animaux
- [ ] Ordonnances numériques
- [ ] Prescription de médicaments
- [ ] Système de rappels automatiques
- [ ] Analytics et rapports

### Long Terme
- [ ] Intégration laboratoires d'analyse
- [ ] Assurance animale
- [ ] Téléconsultation vidéo
- [ ] Marketplace pour produits spécialisés
- [ ] Application mobile native

---

## 📞 Support et Maintenance

### Fichiers Clés
- `home.html` : Page d'accueil et authentification
- `client-dashboard.html` : Interface client
- `vet-dashboard.html` : Interface vétérinaire
- `assets/js/home.js` : Logique authentification
- `assets/js/client-dashboard.js` : Logique client
- `assets/js/vet-dashboard.js` : Logique vétérinaire

### Troubleshooting

**Problème** : Impossible de créer compte
- Vérifier localStorage n'est pas désactivé
- Vérifier console pour les erreurs JS

**Problème** : Redirection ne fonctionne pas
- Vérifier session créée dans ph_session
- Vérifier type utilisateur ('client' ou 'vet')

**Problème** : Données perdues au refresh
- Normal : localStorage ne persiste pas après fermeture du navigateur
- Implémenter backend pour persistance réelle

---

## 📝 Checklist de Déploiement

- [ ] Tester tous les flux d'authentification
- [ ] Vérifier responsive sur mobile/tablet
- [ ] Tester les modales d'authentification
- [ ] Vérifier redirection automatique
- [ ] Tester logout
- [ ] Vérifier affichage des données
- [ ] Tester les boutons d'action
- [ ] Vérifier console sans erreurs
- [ ] Test cross-browser (Chrome, Firefox, Safari)
- [ ] Optimiser images et assets

---

**Dernière mise à jour** : Décembre 2024  
**Version** : 1.0.0  
**Statut** : Production Ready (Demo)
