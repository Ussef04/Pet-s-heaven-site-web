# 🛒 DÉMONSTRATION VISUELLE - Système de Panier

## Vue d'ensemble du Flux

```
┌─────────────────────────────────────────────────────────────────┐
│                    PAGE PRODUITS (products.html)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Logo]  Pet's Heaven                    [Panier] Badge: 2     │
│  ├─ Découvrir                                                  │
│  ├─ Produits ← VOUS ÊTES ICI                                  │
│  ├─ Vétérinaires                                               │
│  ├─ RDV                                                        │
│  └─ Mes Animaux                                                │
│                                                                 │
│  Nos Produits                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Croquettes   │  │ Pâtée        │  │ Balle Souris │         │
│  │ 150 DH       │  │ 80 DH        │  │ 35 DH        │         │
│  │ ⭐ 4.8      │  │ ⭐ 4.9      │  │ ⭐ 4.7      │         │
│  │              │  │              │  │              │         │
│  │ [Ajouter ✓]  │  │ [Ajouter ✓]  │  │ [Ajouter]    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  Toast: "Croquettes ajoutées!"                                 │
│  [Voir le panier →]                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Clique sur bouton "Panier"
                            │ ou lien "Voir le panier →"
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PAGE PANIER (cart.html)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Mon Panier                                                    │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Vos Articles                                             │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ ☑ Croquettes Premium                                    │  │
│  │   150 DH | [-] 2 [+] = 300 DH              [SUPPRIMER]  │  │
│  │                                                          │  │
│  │ ☑ Pâtée Délicieuse                                      │  │
│  │   80 DH  | [-] 1 [+] = 80 DH               [SUPPRIMER]  │  │
│  │                                                          │  │
│  │ ☑ Balle Souris                                          │  │
│  │   35 DH  | [-] 1 [+] = 35 DH               [SUPPRIMER]  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Adresse de Livraison                                     │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ Nom complet*          [Ahmed Ben Ali            ]        │  │
│  │ Téléphone*            [+212 6 12 34 56 78      ]        │  │
│  │ Adresse complète*     [123 Rue Mohamed V       ]        │  │
│  │ Ville*                [Casablanca              ]        │  │
│  │ Code postal*          [20000                  ]        │  │
│  │ Notes spéciales       [Laisser près de la porte]      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Mode de Livraison                                        │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ ⦿ Livraison Standard (3-5 jours)                         │  │
│  │   Gratuit pour > 500 DH, sinon 50 DH                     │  │
│  │                                                          │  │
│  │ ○ Livraison Express (24-48h)                            │  │
│  │   100 DH (très rapide!)                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                    │                            │
│                                    │                            │
│                                    ▼                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Récapitulatif de la Commande                  │ STICKY  │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ Sous-total (4 articles)        415.00 DH                │  │
│  │ Livraison                       50.00 DH                │  │
│  │ ───────────────────────────────────────────              │  │
│  │ TOTAL                           465.00 DH                │  │
│  │                                                          │  │
│  │ ✓ Livraison gratuite si > 500 DH                        │  │
│  │                                                          │  │
│  │ [💳 Passer la Commande]                                 │  │
│  │ [← Continuer vos achats]                                │  │
│  │                                                          │  │
│  │ 🔒 Paiement 100% sécurisé                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ Clique "Passer la Commande"
                            │
                            ▼
                    ┌────────────────┐
                    │ Authentifié?   │
                    └────────────────┘
                       /          \
                     NON           OUI
                     /               \
                    ▼                 ▼
            ┌──────────────┐    ┌──────────────────────┐
            │ Modal Login  │    │ Validation Données   │
            │ S'identifier │    │ ✓ Tous les champs    │
            │ S'inscrire   │    │ ✓ Format téléphone   │
            └──────────────┘    └──────────────────────┘
                    │                     │
                    │ Après login         │ ERREUR
                    └──────────┬──────────┘
                               ▼
                    ┌──────────────────────┐
                    │ Commande Validée ✅  │
                    │                      │
                    │ Sauvegarde:          │
                    │ • Commande en JSON   │
                    │ • ID unique CMD-xxx  │
                    │ • Timestamp          │
                    │ • Toutes les données │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Toast Confirmation   │
                    │                      │
                    │ ✓ Commande Confirmée!│
                    │ Confirmation par     │
                    │ email et WhatsApp    │
                    └──────────────────────┘
                               │
                               ▼ 2.5s
                    ┌──────────────────────┐
                    │ Retour à products.html
                    │ (Panier vidé)        │
                    └──────────────────────┘
```

---

## Interaction Détaillée - Gestion du Panier

### 1️⃣ Ajouter un Article

```
AVANT:
┌─────────────────────┐
│ Croquettes Premium  │
│ 150 DH              │
│                     │
│ [Ajouter au Panier] │
└─────────────────────┘
Badge du panier: caché

CLIC → "Ajouter au Panier"
  ↓
[Ajouter au Panier] → [✓ Ajouté!]
                        (btn vert pendant 2s)
  ↓
APRÈS:
└─ Toast s'affiche (4s):
   "✓ Croquettes ajoutées!"
   [Voir le panier →]
   
└─ Badge panier: 1 (rouge)

PLUSIEURS FOIS:
Même article → Quantité augmente
Article différent → S'ajoute à la liste
```

### 2️⃣ Gérer les Quantités dans le Panier

```
AFFICHAGE ARTICLE:
┌──────────────────────────────────────┐
│ Croquettes Premium                   │
│ 150 DH | [-] 1 [+] | = 150 DH       │
└──────────────────────────────────────┘

CLIC [+]:
└─ Quantité: 1 → 2
└─ Sous-total: 150 → 300 DH
└─ Total général: recalculé
└─ Badge: 1 → 2

CLIC [-]:
└─ Quantité: 2 → 1
└─ Sous-total: 300 → 150 DH
└─ Total général: recalculé
└─ Badge: 2 → 1
```

### 3️⃣ Supprimer un Article

```
┌──────────────────────────────────────┐
│ Balle Souris 35 DH               [🗑️]│
└──────────────────────────────────────┘
                ↓
            CLIC [🗑️]
                ↓
Poof! Article disparu ✓
Toast jaune: "Article supprimé du panier"
Badge: 4 → 3
Total: recalculé
```

### 4️⃣ Changer le Mode de Livraison

```
AVANT:
☑ Standard (50 DH)
○ Express

CLIC SUR EXPRESS:
    ↓
Frais: 50 → 100 DH
Total: 415 → 465 DH
Animation: bordure bleue + fond clair

RETOUR À STANDARD:
    ↓
Frais: 100 → 50 DH (ou gratuit si > 500)
Total: recalculé
```

---

## Validation du Formulaire

### Avant Soumission

```
✅ Champ rempli                    ❌ Champ vide
┌──────────────────┐             ┌──────────────────┐
│ Ahmed Ben Ali    │             │ [Vide]           │
│ ✓ (pas d'erreur) │             │ ✗ Bordure rouge  │
└──────────────────┘             └──────────────────┘

Téléphone valide:                 Téléphone invalide:
+212 6 12 34 56 78 ✓             06 DH ✗
+212612345678 ✓                  123 ✗
```

### Message d'Erreur

```
┌──────────────────────────────────┐
│ Veuillez remplir tous les champs │
│ obligatoires                     │
│ [OK]                             │
└──────────────────────────────────┘
```

---

## Données Sauvegardées

### Structure de la Commande

```javascript
{
  "id": "CMD-1702469200000",
  "date": "13/12/2025",
  "time": "14:30:45",
  "customer": {
    "name": "Ahmed Ben Ali",
    "phone": "+212 6 12 34 56 78",
    "email": "ahmed@petheaven.ma",
    "address": "123 Rue Mohamed V",
    "city": "Casablanca",
    "postalCode": "20000",
    "notes": "Laisser près de la porte"
  },
  "items": [
    {
      "name": "Croquettes Premium",
      "price": 150,
      "quantity": 2,
      "subtotal": 300
    },
    {
      "name": "Pâtée Délicieuse",
      "price": 80,
      "quantity": 1,
      "subtotal": 80
    },
    {
      "name": "Balle Souris",
      "price": 35,
      "quantity": 1,
      "subtotal": 35
    }
  ],
  "shipping": {
    "method": "standard",
    "cost": 50
  },
  "totals": {
    "subtotal": 415,
    "shipping": 50,
    "total": 465
  }
}
```

---

## 🎨 États Visuels

### Badge du Panier

```
0 articles        1 article         5 articles
Caché             [Panier] 1        [Panier] 5
                  (badge rouge)     (badge rouge)

Clic → Voir le panier
```

### Boutons

```
Ajouter au Panier     →    ✓ Ajouté!      →    Ajouter au Panier
(Bleu normal)        (2s)  (Vert actif)  (2s)  (Retour normal)

Passer la Commande   →    Désactivé (panier vide)
(Bleu normal)             Gris + Désactivé

Continuer vos achats  →    Lien vers products.html
(Bleu contour)            Hover: fond gris
```

### Toasts (Notifications)

```
Succès:                       Suppression:
┌─────────────────────┐      ┌─────────────────────┐
│ ✓ Article ajouté!   │      │ ⚠️ Article supprimé! │
│ [Voir le panier →]  │      │ [X]                 │
│ [X]                 │      └─────────────────────┘
└─────────────────────┘      (3s)

Confirmation:
┌─────────────────────┐
│ ✓ Commande Confirmée!      │
│ Confirmation par email     │
│ et WhatsApp                │
│ [X]                        │
└────────────────────────────┘
(2.5s puis redirection)
```

---

## 📱 Responsive Design

### Écran Ordinateur (> 992px)

```
┌──────────────────────────────────────────────┐
│  Articles (gauche 60%)  │  Récap (droite 40%) │
│                         │  STICKY (top: 20px) │
│                         │                     │
│  Article 1              │  Sous-total: 415    │
│  Article 2              │  Livraison: 50      │
│  Article 3              │  ───────────        │
│  Article 4              │  TOTAL: 465 DH      │
│                         │                     │
│  Formulaire             │  [Passer Commande]  │
│  (en bas)               │                     │
└──────────────────────────────────────────────┘
```

### Écran Tablet (768px - 992px)

```
┌─────────────────────────────┐
│  Articles                   │
│  ┌───────────────────────┐  │
│  │ Article 1             │  │
│  │ Article 2             │  │
│  │ Article 3             │  │
│  └───────────────────────┘  │
│                             │
│  Récapitulatif              │
│  ┌───────────────────────┐  │
│  │ Sous-total: 415       │  │
│  │ Livraison: 50         │  │
│  │ TOTAL: 465            │  │
│  │                       │  │
│  │ [Passer Commande]     │  │
│  └───────────────────────┘  │
│                             │
│  Formulaire                 │
│  ┌───────────────────────┐  │
│  │ Nom: [       ]        │  │
│  │ Tel: [       ]        │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### Écran Mobile (< 768px)

```
┌──────────────────┐
│ Articles         │
│ ┌──────────────┐ │
│ │ Article 1    │ │
│ │ Article 2    │ │
│ └──────────────┘ │
│                  │
│ Formulaire       │
│ ┌──────────────┐ │
│ │ Nom: [     ] │ │
│ │ Tel: [     ] │ │
│ │ Adr: [     ] │ │
│ └──────────────┘ │
│                  │
│ Livraison        │
│ ┌──────────────┐ │
│ │ ⦿ Standard   │ │
│ │ ○ Express    │ │
│ └──────────────┘ │
│                  │
│ Récap (sticky)   │
│ ┌──────────────┐ │
│ │ Total: 465 DH│ │
│ │              │ │
│ │ [Passer      │ │
│ │  Commande]   │ │
│ └──────────────┘ │
└──────────────────┘
```

---

## ✨ Animations

```
Chargement du panier:
Article 1 ──→ fadeInUp + 0s    ✓
Article 2 ──→ fadeInUp + 0.1s  ✓
Article 3 ──→ fadeInUp + 0.2s  ✓
Article 4 ──→ fadeInUp + 0.3s  ✓

Changement de mode de livraison:
Bordure:  #e5e7eb → #4f46e5    (300ms)
Fond:     transparent → rgba(79, 70, 229, 0.05)

Toast notification:
Entrée:   slideInRight (0.4s)
Sortie:   fadeOut (0.3s)
```

---

✨ **Voilà! C'est une expérience utilisateur complète et fluide!**
