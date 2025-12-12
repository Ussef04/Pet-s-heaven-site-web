# Guide de Test - Synchronisation Vétérinaire Dashboard et Candidatures

## 🎯 Objectif
Vérifier que le système de candidature des vétérinaires fonctionne correctement avec le dashboard, incluant :
- ✅ Connexion en tant que vétérinaire
- ✅ Accès au formulaire de candidature depuis le dropdown du compte
- ✅ Pré-remplissage automatique de l'email
- ✅ Sauvegarde de la candidature dans localStorage
- ✅ Affichage de la candidature dans le dashboard
- ✅ Synchronisation bidirectionnelle

## 📋 Flux de Test

### 1️⃣ Créer un Compte Vétérinaire

**URL:** `http://localhost:8000`

**Étapes:**
1. Cliquez sur le bouton "S'inscrire"
2. Dans le formulaire d'inscription:
   - Nom: "Dr. Jean Dupont"
   - Sélectionnez "Compte vétérinaire" (radio button)
   - Email: "jean.dupont@vets.com"
   - Mot de passe: "VetPassword123"
3. Cliquez "Créer mon compte"

**Résultat attendu:**
- ✅ La modale se ferme
- ✅ Vous êtes automatiquement connecté
- ✅ Redirection vers `vet-dashboard.html`

### 2️⃣ Accéder au Formulaire de Candidature

**Depuis le Dashboard:**
1. En haut à droite, cliquez sur le menu "Compte"
2. Vous devez voir un lien "Candidatures" (avec une icône 📄)
3. Cliquez sur "Candidatures"

**Résultat attendu:**
- ✅ Navigation vers `vets-register.html`
- ✅ L'email est **pré-rempli** avec "jean.dupont@vets.com"
- ✅ Le champ email est **désactivé** (non éditable)

### 3️⃣ Remplir et Soumettre le Formulaire

**Données de Test:**
- **Informations personnelles:**
  - Prénom: Jean
  - Nom: Dupont
  - Email: jean.dupont@vets.com (auto-rempli)
  - Téléphone: +212 6 12 34 56 78

- **Informations Professionnelles:**
  - Nom de la clinique: Clinique Vétérinaire du Centre
  - Spécialité: Chiens et Chats
  - Expérience: 8

- **Localisation:**
  - Ville: Casablanca
  - Région: Casablanca-Settat
  - Code Postal: 20000
  - Adresse: 123 Boulevard Mohamed V

- **Qualifications:**
  - Diplôme: Docteur Vétérinaire (Université Hassan II)
  - Certifications: Cochez les cases pertinentes

- **Disponibilité:**
  - Heure d'ouverture: 08:00
  - Heure de fermeture: 18:00
  - Jours: Cochez lundi à vendredi

- **Accords:**
  - Cochez tous les checkboxes

**Soumission:**
1. Cliquez "Soumettre ma candidature"

**Résultat attendu:**
- ✅ Message de succès: "Candidature soumise avec succès!"
- ✅ Les données sont sauvegardées dans `localStorage` (clé: `ph_vet_registrations`)
- ✅ Le formulaire se réinitialise

### 4️⃣ Vérifier la Candidature dans le Dashboard

**Étapes:**
1. Revenez au dashboard (cliquez sur le lien "Pet's Heaven" ou naviguez vers `vet-dashboard.html`)
2. Dans la navigation du dashboard, cliquez sur "Candidatures"
3. Vous devez voir la candidature que vous venez de soumettre

**Résultat attendu:**
- ✅ Section "Candidatures" visible avec la candidature
- ✅ Affichage des informations: Clinique, Spécialité, Expérience, Ville, Téléphone, Date
- ✅ Statut affiché: "En attente de vérification" (couleur jaune)
- ✅ Bouton "Modifier" disponible pour les candidatures en attente

### 5️⃣ Modifier la Candidature

**Étapes:**
1. Sur la candidature, cliquez sur "Modifier"
2. Vous êtes redirigé vers `vets-register.html` avec la candidature pré-remplie
3. Modifiez les informations (ex: changez la spécialité)
4. Soumettez à nouveau

**Résultat attendu:**
- ✅ Les modifications sont sauvegardées
- ✅ La candidature mise à jour apparaît dans le dashboard
- ✅ Le statut reste "En attente de vérification"

### 6️⃣ Tester la Navbar du Vétérinaire

**Vérifications:**
1. Vérifiez que la navbar affiche:
   - ❌ Découvrir
   - ❌ Produits
   - ❌ RDV
   - ❌ Mes Animaux
   - ✅ Vétérinaires
   - ✅ Partenaire

2. Cliquez sur "Partenaire" dans la navbar
   - ✅ Navigation vers `vets-register.html`

3. Cliquez sur "Vétérinaires"
   - ✅ Navigation vers la liste des vétérinaires

## 🔍 Vérifications du localStorage

**Ouvrir DevTools (F12):**

1. **Application** > **Local Storage** > `http://localhost:8000`

**Clés à vérifier:**

- `ph_session`: Contient `{name: "Dr. Jean Dupont", email: "jean.dupont@vets.com", type: "vet"}`
- `ph_users`: Contient l'utilisateur avec `type: "vet"`
- `ph_vet_registrations`: Contient la candidature avec `personalInfo.email: "jean.dupont@vets.com"`
- `ph_all_vet_registrations`: Contient également la candidature (copie pour l'admin)

## ✅ Checklist de Succès

- [ ] Compte vétérinaire créé avec succès
- [ ] Redirection correcte vers vet-dashboard.html
- [ ] Lien "Candidatures" visible dans le dropdown du compte
- [ ] Email pré-rempli dans le formulaire
- [ ] Candidature sauvegardée dans localStorage
- [ ] Candidature affichée dans le dashboard
- [ ] Statut affiché correctement (jaune pour "En attente")
- [ ] Bouton "Modifier" fonctionnel
- [ ] Navbar affiche les bons liens pour vétérinaires
- [ ] Pas d'erreurs dans la console (F12)

## 🐛 Dépannage

### Problème: L'email ne se pré-remplit pas
- **Cause:** La fonction `getSessionLocal()` n'a pas accès à `localStorage`
- **Solution:** Vérifiez que `script.js` est chargé avant `vets-register.js`

### Problème: La candidature n'apparaît pas dans le dashboard
- **Cause:** L'email n'a pas pu être récupéré correctement
- **Solution:** 
  - Vérifiez dans DevTools que `ph_session` contient l'email correct
  - Vérifiez que la candidature est sauvegardée dans `ph_vet_registrations`

### Problème: Le lien "Candidatures" ne s'affiche pas
- **Cause:** La fonction `addVetSpecificMenuItems()` ne s'est pas exécutée
- **Solution:**
  - Vérifiez dans DevTools que `session.type === 'vet'`
  - Vérifiez que la fonction est appelée dans `updateAuthUI()`

## 📊 État du Système

**Fichiers modifiés:**
- ✅ `assets/js/script.js`: Ajout de `addVetSpecificMenuItems()`
- ✅ `assets/js/vets-register.js`: Ajout de pré-remplissage d'email
- ✅ `assets/js/vet-dashboard.js`: Affichage des candidatures (déjà présent)
- ✅ `vet-dashboard.html`: Section candidatures (déjà présente)

**Points d'intégration:**
1. **Authentification** → `script.js` stocke `type: 'vet'` dans session
2. **Navbar** → `addVetSpecificMenuItems()` ajoute le lien "Candidatures"
3. **Formulaire** → `vets-register.js` pré-remplit l'email
4. **Sauvegarde** → `vets-register.js` enregistre dans `ph_vet_registrations`
5. **Dashboard** → `vet-dashboard.js` affiche les candidatures filtrées par email

---

**Date:** Novembre 2025  
**État:** ✅ Synchronisation Complète Implémentée
