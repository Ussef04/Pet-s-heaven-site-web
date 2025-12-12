# 🚀 Guide de Test - Pet's Heaven Platform

## 📋 Table des Matières
1. [Préparation](#préparation)
2. [Données de Test](#données-de-test)
3. [Scénarios de Test](#scénarios-de-test)
4. [Checklist de Validation](#checklist-de-validation)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Préparation

### Prérequis
- Serveur local lancé (`python -m http.server 8000`)
- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- DevTools ouverts (F12)

### Étape 1 : Charger les données de test

1. Ouvrir `home.html` dans le navigateur
2. Ouvrir la Console DevTools (F12 → Console)
3. Copier-coller le contenu de `TEST_PLATFORM.js` dans la console
4. Exécuter : `initializeTestData()`

**Résultat attendu :**
```
✅ Données de test initialisées avec succès !
📊 Résumé :
   - 2 clients
   - 3 vétérinaires
   - 5 produits
   - 3 rendez-vous
```

---

## 👥 Données de Test

### Comptes Clients

| Email | Mot de passe | Animaux |
|-------|-------------|---------|
| jean@test.com | test123 | Minou (Chat), Rex (Chien) |
| marie@test.com | test123 | Bella (Chat) |

### Comptes Vétérinaires

| Email | Mot de passe | Spécialité | Ville |
|-------|-------------|-----------|-------|
| ahmed@test.com | test123 | Chirurgie | Casablanca |
| fatima@test.com | test123 | Dermatologie | Rabat |
| hassan@test.com | test123 | Médecine Générale | Marrakech |

### Rendez-vous Existants

| Client | Vétérinaire | Animal | Statut | Date |
|--------|------------|--------|--------|------|
| Jean | Dr. Ahmed | Minou | En attente | Demain |
| Jean | Dr. Fatima | Rex | Confirmé | +2 jours |
| Marie | Dr. Ahmed | Bella | En attente | +3 jours |

---

## 🧪 Scénarios de Test

### Scenario 1 : Créer un Compte Client

#### Étapes
1. Accéder à `home.html`
2. Cliquer sur "Créer Compte Client"
3. Remplir le formulaire :
   - Nom: Test User
   - Email: test@nouveau.com
   - Téléphone: +212 612345678
   - Mot de passe: Password123
   - Confirmer: Password123
4. Cocher "J'accepte les conditions"
5. Cliquer "Créer mon Compte"

#### Résultats Attendus
- ✅ Message de succès affiché
- ✅ Redirection vers `client-dashboard.html`
- ✅ Données sauvegardées dans localStorage
- ✅ Session créée avec type='client'

#### Vérification
```javascript
// Dans la console:
JSON.parse(localStorage.getItem('ph_clients')).find(c => c.email === 'test@nouveau.com')
// Devrait retourner l'objet client créé
```

---

### Scenario 2 : Créer un Compte Vétérinaire

#### Étapes
1. Accéder à `home.html`
2. Cliquer sur "Créer Compte Vétérinaire"
3. Remplir le formulaire :
   - Nom: Dr. Test Vet
   - Email: testvet@new.com
   - Téléphone: +212 687654321
   - Spécialité: Chirurgie
   - Ville: Fès
   - Clinique: Clinique Test Fès
   - Licence: VET-2024-999
   - Mot de passe: Password123
   - Confirmer: Password123
4. Cocher "J'accepte les conditions"
5. Cliquer "Créer mon Compte Vétérinaire"

#### Résultats Attendus
- ✅ Message de succès affiché
- ✅ Redirection vers `vet-dashboard.html`
- ✅ Données sauvegardées dans localStorage
- ✅ Session créée avec type='vet'

---

### Scenario 3 : Authentification Client

#### Étapes
1. Accéder à `home.html`
2. Cliquer sur "Se Connecter"
3. Entrer email: `jean@test.com`
4. Entrer mot de passe: `test123`
5. Cliquer "Se Connecter"

#### Résultats Attendus
- ✅ Authentification réussie
- ✅ Redirection vers `client-dashboard.html`
- ✅ Nom et email affichés dans topbar
- ✅ Session valide dans localStorage

---

### Scenario 4 : Authentification Vétérinaire

#### Étapes
1. Accéder à `home.html`
2. Cliquer sur "Se Connecter"
3. Entrer email: `ahmed@test.com`
4. Entrer mot de passe: `test123`
5. Cliquer "Se Connecter"

#### Résultats Attendus
- ✅ Authentification réussie
- ✅ Redirection vers `vet-dashboard.html`
- ✅ Titre "Dr. Ahmed Ben Ali" affiché
- ✅ Spécialité affichée ("Chirurgie")

---

### Scenario 5 : Navigation Client

#### Étapes (Connecté comme Jean)
1. Sur le tableau de bord, cliquer sur "Mes Animaux"
2. Vérifier affichage des 2 animaux (Minou, Rex)
3. Cliquer "Vétérinaires"
4. Vérifier affichage de 3 vétérinaires
5. Cliquer "Mes Rendez-vous"
6. Vérifier affichage des 2 rendez-vous de Jean

#### Résultats Attendus
- ✅ Navigation fluide
- ✅ Données correctes affichées
- ✅ Statistiques mises à jour
- ✅ Pas d'erreurs dans la console

---

### Scenario 6 : Gestion des Rendez-vous (Vétérinaire)

#### Étapes (Connecté comme Dr. Ahmed)
1. Cliquer sur "Rendez-vous" dans le menu
2. Vérifier affichage de 2 demandes en attente
3. Sur le RDV de Minou (Jean), cliquer "Confirmer"
4. Vérifier statut changé à "Confirmé"
5. Sur le RDV de Bella (Marie), cliquer "Refuser"
6. Vérifier statut changé à "Annulé"

#### Résultats Attendus
- ✅ Affichage des demandes
- ✅ Boutons actifs si statut "en attente"
- ✅ Statut mis à jour après action
- ✅ Boutons disparaissent une fois confirmé/annulé

---

### Scenario 7 : Configuration des Disponibilités

#### Étapes (Connecté comme Dr. Ahmed)
1. Cliquer "Disponibilités" dans le menu
2. Jour: Sélectionner "Lundi"
3. Statut: "Disponible"
4. Heure début: 08:00
5. Heure fin: 17:00
6. Cliquer "Sauvegarder Disponibilité"
7. Vérifier affichage en bas

#### Résultats Attendus
- ✅ Message de succès
- ✅ Horaire affiché dans "Horaires Configurés"
- ✅ Données sauvegardées dans localStorage
- ✅ Badge "Disponible" pour Lundi

---

### Scenario 8 : Logout

#### Étapes (N'importe quel utilisateur)
1. Cliquer sur "Déconnexion" en bas du menu
2. Vérifier redirection vers `home.html`

#### Résultats Attendus
- ✅ Session supprimée (ph_session)
- ✅ Page d'accueil affichée
- ✅ Navbar sans authentification

---

## ✅ Checklist de Validation

### Page d'Accueil (home.html)
- [ ] Navbar sticky fonctionne
- [ ] Section héro responsive
- [ ] Modales d'authentification s'ouvrent
- [ ] Validation des formulaires (email, pwd, etc.)
- [ ] Messages d'erreur affichés correctement
- [ ] Footer année automatique mise à jour
- [ ] Design responsive sur mobile/tablet

### Tableau de Bord Client
- [ ] Navigation menu fonctionne
- [ ] Statistiques affichées correctement
- [ ] Onglet "Rendez-vous" affiche données
- [ ] Onglet "Animaux" affiche données
- [ ] Onglet "Vétérinaires" affiche données
- [ ] Onglet "Produits" affiche données
- [ ] Boutons d'action fonctionnent
- [ ] Logout fonctionne

### Tableau de Bord Vétérinaire
- [ ] Navigation menu fonctionne
- [ ] Statistiques affichées correctement
- [ ] Onglet "Rendez-vous" affiche demandes
- [ ] Boutons Confirmer/Refuser fonctionnent
- [ ] Onglet "Disponibilités" configure horaires
- [ ] Onglet "Profil" affiche infos
- [ ] Logout fonctionne

### Authentification
- [ ] Login client fonctionne
- [ ] Login vétérinaire fonctionne
- [ ] Signup client crée compte
- [ ] Signup vétérinaire crée compte
- [ ] Redirection automatique après login
- [ ] Session persiste au refresh
- [ ] Déconnexion supprime session

### Data & LocalStorage
- [ ] Données sauvegardées correctement
- [ ] Intégrité des données vérifiée
- [ ] Pas de doublets
- [ ] Relations correctes (client↔appointments, vet↔appointments)

### Design & UX
- [ ] Couleurs cohérentes (#4f46e5, #7c3aed, etc.)
- [ ] Typographie lisible
- [ ] Boutons accessibles au tactile
- [ ] Pas de débordement sur mobile
- [ ] Animations fluides
- [ ] Contraste suffisant pour accessibilité

### Console Browser
- [ ] Aucune erreur JavaScript
- [ ] Aucune erreur CORS
- [ ] Aucun avertissement critique
- [ ] Logs clairs et informatifs

---

## 🔍 Commandes Console Utiles

```javascript
// Voir tous les clients
JSON.parse(localStorage.getItem('ph_clients'))

// Voir tous les vétérinaires
JSON.parse(localStorage.getItem('ph_vets'))

// Voir la session actuelle
JSON.parse(localStorage.getItem('ph_session'))

// Voir tous les rendez-vous
JSON.parse(localStorage.getItem('ph_appointments'))

// Voir tous les produits
JSON.parse(localStorage.getItem('ph_products'))

// Voir une clé localStorage spécifique
localStorage.getItem('ph_session')

// Effacer la session
localStorage.removeItem('ph_session')

// Effacer tout localStorage
localStorage.clear()

// Tester l'intégrité des données
testDataIntegrity()
```

---

## 🐛 Troubleshooting

### Problème: "Impossible de créer un compte"
**Solution:**
- Vérifier que localStorage n'est pas désactivé
- Vérifier la console pour les erreurs
- S'assurer que tous les champs sont remplis
- Vérifier l'email n'existe pas déjà

### Problème: "Redirection ne fonctionne pas après login"
**Solution:**
- Vérifier que session est créée : `localStorage.getItem('ph_session')`
- Vérifier type session : client ou vet
- S'assurer que `home.js` est chargé
- Vérifier que les fichiers de destination existent

### Problème: "Données disparaissent au refresh"
**Solution:**
- C'est normal : localStorage est local au domaine/protocole
- Les données persistent au refresh mais pas après fermeture du navigateur
- Pour persistance réelle, implémenter un backend

### Problème: "Modales ne s'ouvrent pas"
**Solution:**
- Vérifier que Bootstrap JS est chargé
- Vérifier les ID modales correspondent : loginModal, signupClientModal, signupVetModal
- Vérifier la console pour erreurs Bootstrap

### Problème: "Statistiques ne s'affichent pas"
**Solution:**
- Vérifier que données sont chargées dans localStorage
- Exécuter testDataIntegrity()
- Vérifier les ID éléments (statAppointments, statPets, etc.)

### Problème: "Rien ne s'affiche dans les onglets"
**Solution:**
- Vérifier que utilisateur est connecté (session valide)
- Vérifier que données existent pour cet utilisateur
- Ouvrir DevTools pour voir erreurs
- Tester avec données pré-chargées (initializeTestData)

---

## 📊 Métriques de Performance

### Cibles
- Temps chargement page: < 2s
- Score Lighthouse: > 80
- Pas d'erreurs console: 0
- Accessibilité WCAG AA: Pass

### Vérification
```javascript
// Voir les erreurs JavaScript
window.addEventListener('error', (e) => {
  console.error('Erreur JS:', e.message);
});

// Mesurer performance
console.time('app-init');
// ... code ...
console.timeEnd('app-init');
```

---

## 📝 Rapport de Test

### Template
```
Date: DD/MM/YYYY
Navigateur: [Chrome/Firefox/Safari/Edge] v[version]
OS: [Windows/Mac/Linux]

Scénarios testés:
[ ] Scenario 1
[ ] Scenario 2
[ ] Scenario 3
[ ] Scenario 4
[ ] Scenario 5
[ ] Scenario 6
[ ] Scenario 7
[ ] Scenario 8

Problèmes trouvés:
- Problème 1: [description] [Sévérité: Critical/Major/Minor]
- Problème 2: [description] [Sévérité: Critical/Major/Minor]

Conclusion: [PASS / PASS WITH NOTES / FAIL]
```

---

**Dernière mise à jour:** Décembre 2024  
**Version:** 1.0.0
