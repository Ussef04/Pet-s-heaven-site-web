# Système de Synchronisation Vétérinaire - Pet's Heaven

## Vue d'ensemble

Ce document explique comment fonctionne le système bidirectionnel de synchronisation entre les vétérinaires et les clients.

## Architecture de Synchronisation

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT INTERFACE                         │
│  home.html → vets.html → rdv.html                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
        ┌─────────────────────────────────────┐
        │    SYNCHRONIZATION SYSTEM           │
        │  (assets/js/sync-system.js)         │
        │                                     │
        │  - syncVetProfiles()                │
        │  - syncAppointments()               │
        │  - registerVet()                    │
        │  - getVetAppointments()             │
        └─────────────────────────────────────┘
                          ↓
        ┌─────────────────────────────────────┐
        │    VETERINARIAN INTERFACE           │
        │  vet-dashboard.html                 │
        └─────────────────────────────────────┘
```

## Flux de Données

### 1. **Inscription du Vétérinaire**

```
home.html (Signup Form)
    ↓
vet-auth.js (setupVetSignupForm)
    ↓
Sauvegarde dans: ph_vet_profiles
    ↓
sync-system.js (syncVetProfiles)
    ↓
Ajout automatique dans: ph_vet_list (pour clients)
    ↓
Redirection vers: vet-dashboard.html
```

### 2. **Affichage des Vétérinaires aux Clients**

```
vets.html
    ↓
vets.js (loadAllVeterinarians)
    ↓
Charge depuis:
  - Default vets (hardcodé)
  - ph_vet_list (vétérinaires inscrits)
    ↓
Affichage unifié dans la liste
```

### 3. **Prise de RDV par un Client**

```
rdv.html
    ↓
rdv.js (submitRDV)
    ↓
Sauvegarde dans: ph_rdv (historique client)
    ↓
rdv.js (syncRDVToVets)
    ↓
Synchronisation dans: ph_appointments
    ↓
vet-dashboard.html charge les RDV
```

### 4. **Gestion des RDV par le Vétérinaire**

```
vet-dashboard.html
    ↓
Load appointments pour ce vétérinaire
    ↓
Affiche dans une table
    ↓
Options:
  - Confirmer RDV
  - Marquer comme complété
  - Ajouter des notes
    ↓
Mise à jour dans: ph_appointments
```

## Structure des Données

### 1. **ph_vet_profiles** (Profils enregistrés)
```javascript
{
  id: "timestamp",
  name: "Dr. Name",
  email: "dr@email.com",
  password: "encoded",
  specialty: "Specialty",
  phone: "+212...",
  city: "City",
  license: "VET-2024-XXXXX",
  createdAt: "ISO Date",
  appointments: []
}
```

### 2. **ph_vet_list** (Liste visible clients)
```javascript
{
  id: "timestamp",
  name: "Dr. Name",
  email: "dr@email.com",
  city: "City",
  specialty: "Specialty",
  phone: "+212...",
  rating: 5.0,
  reviews: 0,
  isRegistered: true,
  registeredAt: "ISO Date"
}
```

### 3. **ph_appointments** (RDV synchronisés)
```javascript
{
  id: "rdv-id",
  vetEmail: "vet@email.com",
  vetName: "Dr. Name",
  vetCity: "City",
  vetSpecialty: "Specialty",
  clientName: "Client Name",
  clientPhone: "+212...",
  petName: "Pet Name",
  petType: "Cat/Dog/Bird",
  date: "YYYY-MM-DD",
  time: "HH:MM",
  reason: "Raison visite",
  status: "pending|confirmed|completed|cancelled",
  createdAt: "ISO Date",
  notes: "Notes du vétérinaire",
  confirmationCode: "RDV-XXXXX"
}
```

### 4. **ph_rdv** (Historique client)
```javascript
{
  id: "timestamp",
  animal: "Pet Name",
  vet: "Dr. Name",
  date: "YYYY-MM-DD",
  time: "HH:MM",
  reason: "Reason",
  status: "Confirmé",
  confirmationCode: "RDV-XXXXX",
  createdAt: "ISO Date",
  rating: null
}
```

## Flux de Synchronisation Détaillé

### Scénario: Un vétérinaire s'inscrit

1. **Client remplit le formulaire d'inscription** dans home.html
2. **vet-auth.js** valide les données
3. **Sauvegarde dans localStorage:**
   - Clé: `ph_vet_profiles`
   - Contient: Profil complet du vétérinaire
4. **Appel de syncVetToClientList()** dans vet-auth.js
5. **sync-system.js** copie les données vers `ph_vet_list`
6. **Redirection vers vet-dashboard.html**
7. **Client visite vets.html** → Charge depuis `ph_vet_list` → Nouveau vét visible ✅

### Scénario: Un client prend un RDV

1. **Client sélectionne un vétérinaire** (default ou inscrit)
2. **Remplit le formulaire dans rdv.html**
3. **rdv.js** valide et crée l'objet RDV
4. **Sauvegarde dans `ph_rdv`**
5. **Appel de syncRDVToVets()** dans rdv.js
6. **Recherche le vétérinaire** dans les deux listes
7. **Crée un objet appointment** avec tous les détails
8. **Sauvegarde dans `ph_appointments`**
9. **Vétérinaire se connecte** → vet-dashboard.html charge depuis `ph_appointments` → RDV visible ✅

## Fichiers Clés

| Fichier | Rôle |
|---------|------|
| `assets/js/sync-system.js` | Système central de synchronisation |
| `assets/js/vet-auth.js` | Authentification et inscription vétérinaires |
| `assets/js/vets.js` | Affichage liste vétérinaires (avec sync) |
| `assets/js/rdv.js` | Prise de RDV et synchronisation |
| `vet-dashboard.html` | Interface vétérinaire |
| `home.html` | Formulaire inscription vétérinaire |

## Functions Principales

### sync-system.js

```javascript
// Initialiser la synchronisation
SyncSystem.init();

// Récupérer les vétérinaires pour les clients
SyncSystem.getAllVets();

// Récupérer les RDV d'un vétérinaire
SyncSystem.getVetAppointments(vetEmail);

// Mettre à jour le statut d'un RDV
SyncSystem.updateAppointmentStatus(aptId, status, notes);

// Enregistrer un nouveau vétérinaire
SyncSystem.registerVet(vetData);

// Obtenir l'état de la synchronisation
SyncSystem.getSyncStatus();
```

## Tests de Synchronisation

### Test 1: Inscription du Vétérinaire
1. Aller à home.html
2. Cliquer "Espace Vétérinaire" → "S'Inscrire"
3. Remplir le formulaire
4. Cliquer "Créer mon Professionnel"
5. Vérifier dans la console: `console.log(SyncSystem.getSyncStatus())`

### Test 2: Affichage dans la Liste Clients
1. Après l'inscription, aller à vets.html
2. Le nouveau vétérinaire doit apparaître dans la liste
3. Vérifier avec un badge "Nouveau" s'il est marqué

### Test 3: Prise de RDV
1. Aller à rdv.html
2. Sélectionner le vétérinaire inscrit
3. Remplir le formulaire et confirmer
4. Vérifier dans la console l'objet appointment créé

### Test 4: Affichage dans le Dashboard
1. Aller à vet-dashboard.html
2. Utiliser les identifiants du vétérinaire inscrit
3. Les RDV doivent s'afficher dans le tableau

## Dépannage

### Les vétérinaires inscrits ne s'affichent pas
- Vérifier `localStorage` dans DevTools (F12 → Application)
- Chercher `ph_vet_list` et `ph_vet_profiles`
- Vérifier que `sync-system.js` est chargé

### Les RDV ne synchronisent pas
- Vérifier que `sync-system.js` est chargé avant `rdv.js`
- Vérifier `ph_appointments` dans localStorage
- Vérifier que le vétérinaire existe dans `ph_vet_list`

### Le dashboard ne montre pas les RDV
- Vérifier que le vétérinaire est loggé correctement
- Vérifier `ph_vet_session` dans localStorage
- Vérifier que `ph_appointments` contient les bonnes données

## Améliorations Futures

1. **API Backend** - Remplacer localStorage par une vraie base de données
2. **Notifications** - Alerter les vétérinaires des nouveaux RDV
3. **Paiements** - Intégrer un système de paiement réel
4. **Rappels** - Email/SMS rappels pour clients et vétérinaires
5. **Ratings** - Système d'évaluation amélioré
6. **Analytics** - Dashboard d'analytiques pour vétérinaires

## Support

Pour toute question sur la synchronisation:
- Vérifier la console du navigateur (F12)
- Vérifier les données dans Application → LocalStorage
- Consulter les logs dans sync-system.js

---

**Dernière mise à jour:** Décembre 2025
**Version:** 1.0
