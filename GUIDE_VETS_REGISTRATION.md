# Guide - Système d'Enregistrement des Vétérinaires Partenaires

## Vue d'ensemble

Le système d'enregistrement des vétérinaires partenaires permet aux vétérinaires marocains de rejoindre le réseau Pet's Heaven **gratuitement** et sans frais de commission. Le processus est entièrement structuré avec des conditions claires et une validation rigoureuse.

## Pages Créées

### 1. **vets-register.html** - Page d'Inscription des Vétérinaires
**Localisation**: Racine du projet  
**Accès**: Menu principal > "Devenir Partenaire"

#### Contenu:
- **Hero Section**: Présentation avec statistiques (0 DH, 200+ vétérinaires, 5000+ patients)
- **Avantages du Partenariat** (6 cartes):
  - 📈 Plus de Patients
  - 🎯 Visibilité Maximale
  - 💰 0% Commissions
  - 🤝 Support Dédié
  - ⭐ Avis & Évaluations
  - 🔒 Données Sécurisées

- **Conditions de Partenariat** (6 critères):
  1. 🎓 Diplôme Vétérinaire **OBLIGATOIRE**
  2. 📜 Certifications (optionnel)
  3. 📍 Localisation & Clinique **OBLIGATOIRE**
  4. 💬 Entretien d'Admission **OBLIGATOIRE**
  5. ✓ Engagement de Qualité
  6. 🚫 Code de Conduite

- **Processus d'Admission** (4 étapes):
  1. Remplir le formulaire
  2. Vérification des documents (48h)
  3. Entretien de sélection (15-20 min)
  4. Activation du profil

- **Formulaire Complet** (6 sections):
  1. **Informations Personnelles**:
     - Prénom, Nom *
     - Email *
     - Téléphone *

  2. **Informations Professionnelles**:
     - Nom de la Clinique/Cabinet *
     - Spécialité Principale * (select avec 11 options)
     - Années d'Expérience *

  3. **Localisation & Adresse**:
     - Ville *
     - Région * (9 régions du Maroc)
     - Code Postal *
     - Adresse Complète *

  4. **Diplômes et Certifications**:
     - Diplôme Vétérinaire * (textarea)
     - Certifications Additionnelles (6 checkboxes):
       - Chirurgie
       - Dermatologie
       - Cardiologie
       - Reproduction
       - Urgences & Réanimation
       - Dentisterie
     - Autres Certifications (textarea optionnel)

  5. **Horaires & Disponibilités**:
     - Heure d'Ouverture *
     - Heure de Fermeture *
     - Jours d'Ouverture * (7 checkboxes)

  6. **Conditions d'Accord**:
     - Acceptation des conditions *
     - Accord pour entretien *
     - Engagement de qualité *
     - RGPD (optionnel)

#### Message de Succès:
Affiche:
- ID de Candidature (VET-XXXXXXXX)
- Confirmation des données
- Prochaines étapes
- Bouton de réinitialisation

- **FAQ** (4 questions):
  - Y a-t-il des frais d'inscription?
  - Combien de temps prend le processus?
  - Que se passe-t-il pendant l'entretien?
  - Comment les patients me trouveront-ils?

---

### 2. **assets/js/vets-register.js** - Logique du Formulaire

**Responsabilités**:
- Gestion de la soumission du formulaire
- Validation des données
- Sauvegarde dans localStorage
- Génération des ID uniques

#### Fonctions Principales:

##### `handleFormSubmit(e)`
- Récupère tous les champs du formulaire
- Crée un objet `vetData` structuré
- Valide les données
- Sauvegarde dans localStorage
- Affiche le message de succès

##### `validateVetRegistration(vetData)`
Vérifie:
- Tous les champs obligatoires sont remplis
- Email valide
- Expérience ≥ 0
- Accord avec les conditions

##### `saveVetRegistration(vetData)`
Stocke dans deux clés localStorage:
- `ph_vet_registrations`: Candidatures actives
- `ph_all_vet_registrations`: Historique complet

**Structure de l'objet sauvegardé**:
```javascript
{
  id: "VET-12345678",
  registrationDate: "2025-12-05T10:30:00Z",
  status: "En attente de vérification", // États: En attente, Entretien planifié, Approuvé, Rejeté
  interviewDate: null,
  personalInfo: { firstName, lastName, email, phone },
  professionalInfo: { clinicName, specialty, experience },
  location: { city, region, codePostal, address },
  qualifications: { diploma, certifications[], otherCerts },
  availability: { openingTime, closingTime, days[] },
  agreements: { conditions, interview, quality, rgpd },
  notes: "",
  approvalDate: null // (ajouté lors de l'approbation),
  rejectionReason: null // (si rejeté)
}
```

#### Fonctions Admin (Console):

```javascript
// Voir toutes les candidatures
viewVetRegistrations()

// Approuver une candidature
approveVetApplication(vetId)

// Planifier un entretien
scheduleInterview(vetId, interviewDate, interviewTime)

// Rejeter une candidature
rejectVetApplication(vetId, reason)

// Voir statistiques
countApplicationsByStatus()

// Exporter les données
exportRegistrations()
```

---

### 3. **admin-vets.html** - Panneau Administrateur

**Localisation**: Racine du projet  
**Accès**: URL directe `/admin-vets.html`

#### Sections:

1. **Tableau de Bord** (par défaut)
   - Statistiques: Total, En attente, Entretiens, Approuvés
   - 5 candidatures récentes avec statuts
   - Aperçu rapide des actions requises

2. **Gestion des Candidatures**
   - Tableau complet avec filtres
   - ID, Vétérinaire, Clinique, Spécialité, Localisation, Statut, Date
   - Actions: Voir détails

3. **Vétérinaires Approuvés**
   - Liste des actifs sur la plateforme
   - Nom, Clinique, Spécialité, Ville, Date d'approbation

4. **Actions Admin**
   - Détail Modal: Affiche tous les détails de candidature
   - Approuver: Change statut à "Approuvé"
   - Planifier Entretien: Fixe date/heure + change statut
   - Rejeter: Ajoute raison + change statut à "Rejeté"
   - Exporter: Télécharge JSON
   - Réinitialiser (dangereux): Supprime toutes les données

---

## Workflow Complet

### 1. **Vétérinaire s'Inscrit**
- Visite `vets-register.html`
- Remplit le formulaire avec tous les détails requis
- Accepte les conditions obligatoires
- Soumet → Reçoit ID de candidature unique

### 2. **Données Sauvegardées**
```
localStorage:
├── ph_vet_registrations: [candidatures actives]
└── ph_all_vet_registrations: [historique complet]
```

### 3. **Admin Gère (admin-vets.html)**
- Vérifie les documents (48h)
- Planifie entretien (15-20 min)
- Approuve ou rejette

### 4. **Après Approbation**
- Statut → "Approuvé"
- Optionnel: Ajouter à `rdv-advanced.js` pour apparaître dans les RDV

---

## Conditions Obligatoires vs Optionnelles

| Champ | Obligatoire | Description |
|-------|------------|-------------|
| Prénom/Nom | ✅ | À valider lors entretien |
| Email/Téléphone | ✅ | Contact principal |
| Clinique/Cabinet | ✅ | À vérifier (adresse réelle) |
| Spécialité | ✅ | Select prédéfini |
| Expérience | ✅ | En années |
| Diplôme | ✅ | **CRITÈRE D'ADMISSION** |
| Certifications | ❌ | Améliore le profil |
| Localisation | ✅ | Vérification GPS/adresse |
| Horaires | ✅ | Pour availability système |
| Accord conditions | ✅ | Déontologie/RGPD |
| Entretien | ✅ | Validation équipe |

---

## Message lors de la Soumission

Affiche:
```
✅ Inscription Réussie!

Merci pour votre inscription. Notre équipe vous contactera 
dans les 48 heures pour confirmer votre candidature et planifier 
l'entretien d'admission.

[Détails affichés]
ID: VET-12345678
Nom: Dr. Prénom Nom
Email: example@email.com
Clinique: Ma Clinique
...

Prochaines étapes:
1. Vérification des documents
2. Appel de confirmation
3. Entretien planifié
4. Activation du profil
```

---

## Statuts de Candidature

```
En attente de vérification
    ↓
Entretien planifié (ou Rejeté)
    ↓
Approuvé (ou Rejeté)
```

### États:
- **En attente de vérification**: Défaut après soumission
- **Entretien planifié**: Admin fixe date/heure
- **Approuvé**: Vétérinaire activé sur plateforme
- **Rejeté**: Avec raison enregistrée

---

## Intégration avec RDV

Optionnellement, les vétérinaires approuvés peuvent être ajoutés à `rdv-advanced.js`:

```javascript
// Console admin
approveVetApplication('VET-12345678');
// Puis le vétérinaire apparaît dans les RDV

// Ou manuel dans vets-register.js:
addVetToActiveList(vetData) // Crée entrée pour rdv
```

---

## Sécurité & Données

### localStorage Keys:
- `ph_vet_registrations`: Candidatures courantes
- `ph_all_vet_registrations`: Historique (pour admin)
- Aucune donnée sensible en clair

### RGPD:
- Checkbox RGPD optionnel (enregistré dans `agreements`)
- Documentation recommandée: Mentionner politique confidentialité

### Absence de Backend:
⚠️ Système entièrement client-side. Pour production:
1. Ajouter serveur (Node.js, Python, PHP)
2. Valider emails
3. Vérifier diplômes via API externe
4. Chiffrer données
5. Implémenter appels réels pour entretiens

---

## Testing

### Remplir le formulaire (Complètement):
1. Aller à `vets-register.html`
2. Remplir tous les champs *obligatoires*
3. Accepter conditions (3)
4. Soumettre
5. Vérifier message de succès

### Voir les candidatures (Admin):
1. Console: `viewVetRegistrations()`
2. Ou `admin-vets.html` → Tableau Bord
3. Modifier statut via admin panel
4. Vérifier localStorage

### Export:
1. Admin → Exporter Données
2. JSON téléchargé avec toutes les candidatures

---

## Personnalisation

### Ajouter Spécialité:
```html
<!-- dans vets-register.html, ligne ~370 -->
<option value="Ma Spécialité">Ma Spécialité</option>
```

### Ajouter Région:
```html
<!-- dans vets-register.html, ligne ~395 -->
<option value="Ma Région">Ma Région</option>
```

### Modifier Texte:
- Tous les textes en français → Éditer `.html` ou `.js`
- Messages: Chercher `alert()` ou `.textContent` dans `vets-register.js`

---

## Checklist de Vérification

- ✅ Formulaire affiche sans erreurs
- ✅ Validation empêche soumission incomplète
- ✅ Données sauvegardées dans localStorage
- ✅ Message de succès affiche ID unique
- ✅ Admin panel charge les candidatures
- ✅ Statuts changent correctement
- ✅ Export JSON fonctionne
- ✅ Pas d'erreurs console

---

**Version**: 1.0  
**Date**: Décembre 2025  
**Langue**: Français  
**Framework**: Bootstrap 5.3.3 + Vanilla JS
