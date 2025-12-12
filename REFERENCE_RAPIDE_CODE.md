# Référence Rapide - Changements de Code

## 🔧 Modification 1: script.js - Fonction addVetSpecificMenuItems()

**Lieu:** `assets/js/script.js` après `updateAuthUI()`

**Ajout:**
```javascript
function addVetSpecificMenuItems(isVet) {
  const dropdownMenu = document.querySelector('#accountMenu .dropdown-menu');
  if (!dropdownMenu) return;

  const existingLink = document.getElementById('menuCandidatures');
  
  if (isVet && !existingLink) {
    const li = document.createElement('li');
    li.innerHTML = `<a class="dropdown-item dropdown-item-premium" href="vets-register.html" id="menuCandidatures" style="padding: 10px 16px; color: #374151; transition: all 0.3s ease;"><i class="bi bi-file-earmark-check me-2" style="color: #8b5cf6; font-weight: 700;"></i>Candidatures</a>`;
    
    const dividers = dropdownMenu.querySelectorAll('hr');
    const lastDivider = dividers[dividers.length - 1];
    const liBeforeDivider = lastDivider.parentElement;
    liBeforeDivider.parentElement.insertBefore(li, liBeforeDivider);
  } else if (!isVet && existingLink) {
    existingLink.parentElement.remove();
  }
}
```

**Modification dans updateAuthUI():**
```javascript
// Ajouter cette ligne avant la fermeture du if(session) block:
addVetSpecificMenuItems(isVet);
```

---

## 🔧 Modification 2: vets-register.js - Fonction getSessionLocal()

**Lieu:** `assets/js/vets-register.js` au début du fichier

**Ajout:**
```javascript
/**
 * Récupère la session utilisateur (fonction helper local)
 */
function getSessionLocal() {
  try {
    return JSON.parse(localStorage.getItem('ph_session') || 'null');
  } catch {
    return null;
  }
}
```

---

## 🔧 Modification 3: vets-register.js - Pré-remplissage Email

**Lieu:** Dans `DOMContentLoaded` de `vets-register.js`

**Remplacer:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('vetRegisterForm');
  
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Charger les inscriptions existantes
  loadVetRegistrations();
});
```

**Par:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('vetRegisterForm');
  
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Pré-remplir l'email si l'utilisateur est connecté
  const session = getSessionLocal();
  if (session && session.email) {
    const emailField = document.getElementById('email');
    if (emailField) {
      emailField.value = session.email;
      // NE PAS désactiver le champ pour que FormData le capture correctement
      // À la place, le rendre en lecture seule visuellement
      emailField.setAttribute('readonly', 'readonly');
    }
  }

  // Charger les inscriptions existantes
  loadVetRegistrations();
});
```

---

## 🔧 Modification 4: vet-dashboard.js - Fonction loadVetApplications()

**Lieu:** `assets/js/vet-dashboard.js` (déjà présent dans les modifications précédentes)

**Fonction complète (à vérifier si présente):**
```javascript
const KEY_VET_REGISTRATIONS = 'ph_vet_registrations';

function loadVetApplications(vetEmail) {
  const registrations = JSON.parse(localStorage.getItem(KEY_VET_REGISTRATIONS) || '[]');
  const vetApplications = registrations.filter(r => r.personalInfo?.email === vetEmail);
  const applicationsSection = document.getElementById('applicationsSection');
  
  if (!applicationsSection) return;
  
  if (vetApplications.length === 0) {
    applicationsSection.innerHTML = '<p class="text-muted text-center py-5">Aucune candidature trouvée</p>';
    return;
  }
  
  let html = '<div class="row g-4">';
  vetApplications.forEach(app => {
    const statusColors = {
      'En attente de vérification': '#FCD34D',
      'Entretien planifié': '#60A5FA',
      'Approuvé': '#34D399',
      'Rejeté': '#F87171'
    };
    
    const statusColor = statusColors[app.status] || '#6B7280';
    
    html += `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm" style="border-top: 4px solid ${statusColor};">
          <div class="card-body">
            <h6 class="card-title">${app.professionalInfo?.clinicName || 'Sans nom'}</h6>
            <p class="card-text small text-muted">
              <strong>Spécialité:</strong> ${app.professionalInfo?.specialty}<br>
              <strong>Expérience:</strong> ${app.professionalInfo?.experience} ans<br>
              <strong>Ville:</strong> ${app.location?.city}<br>
              <strong>Téléphone:</strong> ${app.personalInfo?.phone}
            </p>
            <div class="mb-3">
              <small class="badge" style="background-color: ${statusColor}; color: ${statusColor === '#FCD34D' ? '#000' : '#fff'};">
                ${app.status}
              </small>
            </div>
            <small class="text-muted d-block">
              ${new Date(app.registrationDate).toLocaleDateString('fr-FR')}
            </small>
            ${app.status === 'En attente de vérification' ? `<a href="vets-register.html?id=${app.id}" class="btn btn-sm btn-outline-primary mt-3">Modifier</a>` : ''}
          </div>
        </div>
      </div>
    `;
  });
  html += '</div>';
  applicationsSection.innerHTML = html;
}
```

**Appel dans loadDashboardData():**
```javascript
function loadDashboardData() {
  // ... autres code ...
  
  // Charger les candidatures
  if (session && session.email) {
    loadVetApplications(session.email);
  }
}
```

---

## 📋 Éléments HTML Attendus

### Dans index.html - Navbar
```html
<div class="dropdown d-none" id="accountMenu">
  <button class="btn btn-account btn-sm fw-700 dropdown-toggle" ...>
    <i class="bi bi-person-check me-1"></i>Compte
  </button>
  <ul class="dropdown-menu dropdown-menu-end ...">
    <li class="dropdown-item-text small text-muted px-4 pt-3 pb-2 fw-700" id="helloUser">Bonjour</li>
    <li><hr class="dropdown-divider my-2"></li>
    <!-- Les éléments de menu vont ici -->
    <li><a class="dropdown-item" href="pets.html">Mes animaux</a></li>
    <li><a class="dropdown-item" href="rdv.html">Mes RDV</a></li>
    <li><a class="dropdown-item" href="index.html#abonnement">Abonnement</a></li>
    <li><hr class="dropdown-divider my-2"></li>
    <li><button class="dropdown-item text-danger" id="btnLogout">Déconnexion</button></li>
  </ul>
</div>
```

### Dans vet-dashboard.html - Section Candidatures
```html
<section class="section-applications d-none" id="applicationsSection">
  <h4>Mes Candidatures</h4>
  <p class="text-muted">Chargement...</p>
</section>
```

### Dans vets-register.html - Champ Email
```html
<input type="email" class="form-control" id="email" name="email" required>
```

---

## 🔍 Vérification des Éléments

### IDs Critiques (à vérifier dans HTML)
- `#accountMenu` - Dropdown du compte
- `#applicationsSection` - Section candidatures
- `#email` - Champ email formulaire (vets-register.html)
- `#discoverLink`, `#productsLink`, `#rdvLink`, `#mePetsLink` - Liens clients
- `#vetsLink`, `#partnerLink` - Liens vétérinaires

### Classes CSS Attendues
- `.dropdown-item` - Éléments du menu
- `.dropdown-menu` - Conteneur du menu
- `.d-none` - Cache/affiche éléments

---

## 🎯 Ordre de Chargement des Scripts

**Important:** S'assurer que l'ordre est:
1. `script.js` (contient updateAuthUI et addVetSpecificMenuItems)
2. `vet-dashboard.js` (contient loadVetApplications)
3. `vets-register.js` (contient getSessionLocal)

```html
<!-- À la fin du body -->
<script src="assets/js/script.js"></script>
<script src="assets/js/vet-dashboard.js"></script>
<script src="assets/js/vets-register.js"></script>
```

---

## ⚡ Quick Test

### Console du Navigateur
```javascript
// Vérifier la session
console.log(JSON.parse(localStorage.getItem('ph_session')));

// Vérifier les candidatures
console.log(JSON.parse(localStorage.getItem('ph_vet_registrations')));

// Vérifier les users
console.log(JSON.parse(localStorage.getItem('ph_users')));
```

### À Tester
1. Créer un compte vet
2. Vérifier `session.type === 'vet'`
3. Vérifier le lien "Candidatures" dans le dropdown
4. Cliquer sur "Candidatures" → doit aller à vets-register.html
5. Email doit être pré-rempli et readonly
6. Soumettre la candidature
7. Retour au dashboard → doit apparaître dans "Candidatures"

---

## 🐛 Dépannage Rapide

| Problème | Cause | Solution |
|----------|-------|----------|
| Lien "Candidatures" ne s'affiche pas | `updateAuthUI()` ne s'exécute pas | Vérifier que `addVetSpecificMenuItems()` est appelée |
| Email ne se pré-remplit pas | `getSessionLocal()` retourne null | Vérifier que `script.js` est chargé avant `vets-register.js` |
| Champ email éditable | `readonly` pas appliqué | Vérifier la ligne `setAttribute('readonly', 'readonly')` |
| Candidatures ne s'affichent pas | Filtre email ne correspond pas | Vérifier `personalInfo.email` dans localStorage |
| Erreurs console | Fonctions manquantes | Vérifier que tous les scripts sont chargés |

---

**Version:** 1.0 - Référence Rapide  
**Date:** Novembre 2025  
**Statut:** ✅ Prêt à utiliser
