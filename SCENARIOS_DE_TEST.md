# Scénarios de Test - Plateforme WebPet's

## Vue d'ensemble
Ce document décrit les scénarios de test pour valider les fonctionnalités principales de la plateforme WebPet's, un portail complet de gestion des animaux de compagnie, des rendez-vous vétérinaires et des produits pour animaux.

---

## Scénario 1 : Authentification et Gestion de Compte

**Objectif** : Valider l'enregistrement, la connexion et la gestion de profil utilisateur.

1. **Inscription Client**
   - Cliquer sur "S'inscrire" depuis la page d'accueil
   - Remplir le formulaire (email, mot de passe, confirmation)
   - Valider que les données sont sauvegardées en localStorage
   - Vérifier que le compte est accessible après rechargement

2. **Connexion**
   - Se connecter avec les identifiants valides
   - Vérifier que le menu "Mon Compte" s'affiche et que le navbar se met à jour
   - Tenter une connexion avec credentials invalides (doit afficher une erreur)

3. **Déconnexion**
   - Cliquer sur "Déconnexion" et vérifier que l'état de session est réinitialisé

---

## Scénario 2 : Gestion des Profils Animaux

**Objectif** : Tester l'ajout, la modification et la suppression de profils animaux.

1. **Ajouter un Animal**
   - Accéder à la section "Mes Animaux"
   - Cliquer sur "Ajouter un Animal"
   - Entrer les informations (nom, race, âge, poids)
   - Vérifier que la fiche s'affiche dans la liste

2. **Éditer/Supprimer**
   - Modifier les détails d'un animal existant
   - Supprimer un animal et vérifier sa disparition de la liste

---

## Scénario 3 : Recherche et Réservation de Vétérinaires

**Objectif** : Valider la recherche de vétérinaires et la réservation de rendez-vous.

1. **Filtrer les Vétérinaires**
   - Accéder à la section "Nos Vétérinaires"
   - Filtrer par ville (ex. "Casablanca")
   - Filtrer par spécialité (ex. "Chirurgie")
   - Vérifier que les résultats sont corrects

2. **Prendre un Rendez-vous**
   - Sélectionner un vétérinaire
   - Choisir une date (min. aujourd'hui) et une heure
   - Sélectionner l'animal et la raison de la visite
   - Valider que le RDV est enregistré en localStorage et affiche une confirmation

---

## Scénario 4 : Catalogue de Produits

**Objectif** : Tester la navigation et le filtrage du catalogue.

1. **Parcourir les Produits**
   - Accéder à "Nos Produits"
   - Afficher tous les produits disponibles (alimentaires, accessoires, etc.)

2. **Filtrer par Catégorie**
   - Cliquer sur différentes catégories
   - Vérifier que seuls les produits correspondants s'affichent

3. **Détails Produit**
   - Cliquer sur un produit pour voir ses détails (prix en DH, description)

---

## Scénario 5 : Abonnements

**Objectif** : Valider la sélection et confirmation des plans d'abonnement.

1. **Sélectionner un Plan**
   - Afficher les 4 plans d'abonnement (Découverte, Plus, Pro, Premium)
   - Cliquer sur le bouton d'abonnement pour un plan
   - Vérifier que une notification toast confirme le choix avec le nom du plan

2. **Persistance des Données**
   - Vérifier que le choix d'abonnement est conservé en localStorage

---

## Scénario 6 : Interface Responsive

**Objectif** : Tester l'affichage sur différentes résolutions.

1. **Bureau (1920x1080)**
   - Navigation fluide, tous les éléments visibles

2. **Tablette (768x1024)**
   - Navbar responsive, contenu adapté

3. **Mobile (375x812)**
   - Menu hamburger fonctionnel, boutons accessibles, modales affichées correctement

---

## Critères de Validation

✓ Tous les formulaires valident les données requises  
✓ Aucune erreur JavaScript en console (F12 > Console)  
✓ Les données persistent en localStorage après rechargement  
✓ Toutes les étiquettes et messages sont en français correct  
✓ Les liens de navigation fonctionnent (# anchors)  
✓ Les modales s'ouvrent et se ferment correctement  
✓ Responsive design fonctionne sur mobile, tablette, desktop  

---

**Date** : Décembre 2025 | **Plateforme** : WebPet's v1.0
