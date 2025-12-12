// Test automatisé - Synchronisation Vétérinaire Dashboard et Candidatures
// Exécuter dans la console du navigateur après avoir chargé la page

console.log("=== TEST SYNCHRONISATION VET DASHBOARD ===\n");

// 1. Vérifier la structure du localStorage
console.log("1️⃣ Vérification du localStorage:");
const session = JSON.parse(localStorage.getItem('ph_session'));
const users = JSON.parse(localStorage.getItem('ph_users') || '[]');
const vetRegs = JSON.parse(localStorage.getItem('ph_vet_registrations') || '[]');

console.log("   Session:", session);
console.log("   Utilisateurs:", users.length, "comptes");
console.log("   Candidatures vét:", vetRegs.length, "candidatures");

if (session && session.type === 'vet') {
  console.log("   ✅ Utilisateur connecté en tant que vétérinaire");
} else {
  console.log("   ❌ Pas de session vétérinaire active");
}

// 2. Vérifier le lien "Candidatures" dans le dropdown
console.log("\n2️⃣ Vérification du menu Candidatures:");
const menuCandidatures = document.getElementById('menuCandidatures');
if (menuCandidatures) {
  console.log("   ✅ Lien 'Candidatures' trouvé:", menuCandidatures.href);
} else {
  console.log("   ❌ Lien 'Candidatures' introuvable");
}

// 3. Vérifier la section Candidatures dans le dashboard
console.log("\n3️⃣ Vérification de la section Candidatures:");
const applicationsSection = document.getElementById('applicationsSection');
if (applicationsSection) {
  console.log("   ✅ Section 'applicationsSection' trouvée");
  console.log("   Contenu:", applicationsSection.innerHTML.substring(0, 100), "...");
} else {
  console.log("   ❌ Section 'applicationsSection' introuvable");
}

// 4. Vérifier les candidatures du vétérinaire
console.log("\n4️⃣ Vérification des candidatures du vétérinaire:");
if (session && session.email && vetRegs.length > 0) {
  const vetCandidatures = vetRegs.filter(r => r.personalInfo?.email === session.email);
  console.log("   Candidatures pour", session.email + ":", vetCandidatures.length);
  
  if (vetCandidatures.length > 0) {
    vetCandidatures.forEach((cand, idx) => {
      console.log(`   📄 Candidature ${idx + 1}:`, {
        clinique: cand.professionalInfo?.clinicName,
        spécialité: cand.professionalInfo?.specialty,
        status: cand.status,
        date: new Date(cand.registrationDate).toLocaleDateString('fr-FR')
      });
    });
  } else {
    console.log("   ℹ️ Aucune candidature trouvée pour ce vétérinaire");
  }
} else {
  console.log("   ❌ Impossible de vérifier: pas de session ou pas de candidatures");
}

// 5. Vérifier la navbar
console.log("\n5️⃣ Vérification de la navbar:");
const discoverLink = document.getElementById('discoverLink');
const productsLink = document.getElementById('productsLink');
const vetsLink = document.getElementById('vetsLink');
const partnerLink = document.getElementById('partnerLink');

console.log("   Liens visibles (vét devrait voir Vétérinaires & Partenaire):");
console.log("   - Découvrir:", !discoverLink?.classList.contains('d-none') ? '❌ VISIBLE (ne devrait pas)' : '✅ CACHÉ');
console.log("   - Produits:", !productsLink?.classList.contains('d-none') ? '❌ VISIBLE (ne devrait pas)' : '✅ CACHÉ');
console.log("   - Vétérinaires:", !vetsLink?.classList.contains('d-none') ? '✅ VISIBLE' : '❌ CACHÉ (devrait être visible)');
console.log("   - Partenaire:", !partnerLink?.classList.contains('d-none') ? '✅ VISIBLE' : '❌ CACHÉ (devrait être visible)');

// 6. Tester la pré-remplissage
console.log("\n6️⃣ Vérification du pré-remplissage d'email:");
const emailField = document.getElementById('email');
if (emailField && session && session.email) {
  if (emailField.value === session.email) {
    console.log("   ✅ Email pré-rempli correctement:", emailField.value);
  } else {
    console.log("   ❌ Email ne correspond pas:", emailField.value, "vs", session.email);
  }
  
  if (emailField.disabled) {
    console.log("   ✅ Champ email désactivé (non éditable)");
  } else {
    console.log("   ⚠️ Champ email éditable (devrait être désactivé)");
  }
} else if (!emailField) {
  console.log("   ℹ️ Champ email non trouvé (probablement pas sur vets-register.html)");
}

// 7. Test complet
console.log("\n=== RÉSUMÉ ===");
let scores = 0;
if (session?.type === 'vet') scores++;
if (menuCandidatures) scores++;
if (applicationsSection) scores++;
if (vetsLink && !vetsLink.classList.contains('d-none')) scores++;
if (partnerLink && !partnerLink.classList.contains('d-none')) scores++;

console.log(`Score: ${scores}/5`);
if (scores === 5) {
  console.log("🎉 TOUS LES TESTS RÉUSSIS!");
} else {
  console.log("⚠️ Certains tests ont échoué. Consultez le guide de dépannage.");
}

console.log("\n=== FIN DES TESTS ===\n");
