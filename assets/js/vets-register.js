// Gestion du formulaire d'inscription des vétérinaires

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
      // emailField.disabled = true;
      // À la place, le rendre en lecture seule visuellement
      emailField.setAttribute('readonly', 'readonly');
    }
  }

  // Charger les inscriptions existantes
  loadVetRegistrations();
});

/**
 * Gère la soumission du formulaire d'enregistrement
 */
function handleFormSubmit(e) {
  e.preventDefault();

  // Récupérer tous les champs du formulaire
  const formData = new FormData(this);
  const vetData = {
    id: generateVetId(),
    registrationDate: new Date().toISOString(),
    status: 'En attente de vérification', // États possibles: "En attente de vérification", "Entretien planifié", "Approuvé", "Rejeté"
    interviewDate: null,
    personalInfo: {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone')
    },
    professionalInfo: {
      clinicName: formData.get('clinicName'),
      specialty: formData.get('specialty'),
      experience: parseInt(formData.get('experience'))
    },
    location: {
      city: formData.get('city'),
      region: formData.get('region'),
      codePostal: formData.get('codePostal'),
      address: formData.get('address')
    },
    qualifications: {
      diploma: formData.get('diploma'),
      certifications: formData.getAll('certifications'),
      otherCerts: formData.get('otherCerts')
    },
    availability: {
      openingTime: formData.get('openingTime'),
      closingTime: formData.get('closingTime'),
      days: formData.getAll('days')
    },
    agreements: {
      conditions: document.getElementById('agree1').checked,
      interview: document.getElementById('agree2').checked,
      quality: document.getElementById('agree3').checked,
      rgpd: document.getElementById('agree4').checked
    },
    notes: '' // Pour les notes de l'équipe admin
  };

  // Valider les champs obligatoires
  if (!validateVetRegistration(vetData)) {
    showError('Veuillez remplir tous les champs obligatoires.');
    return;
  }

  // Sauvegarder dans localStorage
  saveVetRegistration(vetData);

  // Afficher le message de succès
  showSuccessMessage(vetData);

  // Réinitialiser le formulaire
  this.reset();
}

/**
 * Valide les données de l'enregistrement vétérinaire
 */
function validateVetRegistration(data) {
  // Vérifier les champs obligatoires
  const personalInfoValid = data.personalInfo.firstName && 
                            data.personalInfo.lastName && 
                            data.personalInfo.email && 
                            data.personalInfo.phone;

  const professionalValid = data.professionalInfo.clinicName && 
                           data.professionalInfo.specialty && 
                           data.professionalInfo.experience >= 0;

  const locationValid = data.location.city && 
                       data.location.region && 
                       data.location.codePostal && 
                       data.location.address;

  const qualificationsValid = data.qualifications.diploma;

  const availabilityValid = data.availability.openingTime && 
                           data.availability.closingTime && 
                           data.availability.days.length > 0;

  const agreementsValid = data.agreements.conditions && 
                         data.agreements.interview && 
                         data.agreements.quality;

  return personalInfoValid && professionalValid && locationValid && 
         qualificationsValid && availabilityValid && agreementsValid;
}

/**
 * Sauvegarde l'enregistrement du vétérinaire dans localStorage
 */
function saveVetRegistration(vetData) {
  let registrations = JSON.parse(localStorage.getItem('ph_vet_registrations') || '[]');
  registrations.push(vetData);
  localStorage.setItem('ph_vet_registrations', JSON.stringify(registrations));

  // Aussi sauvegarder dans un historique pour l'admin
  let allRegistrations = JSON.parse(localStorage.getItem('ph_all_vet_registrations') || '[]');
  allRegistrations.push(vetData);
  localStorage.setItem('ph_all_vet_registrations', JSON.stringify(allRegistrations));
}

/**
 * Charge et affiche les inscriptions existantes
 */
function loadVetRegistrations() {
  const registrations = JSON.parse(localStorage.getItem('ph_vet_registrations') || '[]');
  
  if (registrations.length > 0) {
    console.log(`${registrations.length} enregistrement(s) de vétérinaire trouvé(s)`);
  }
}

/**
 * Génère un ID unique pour le vétérinaire
 */
function generateVetId() {
  return 'VET-' + Date.now().toString().slice(-8);
}

/**
 * Affiche le message de succès
 */
function showSuccessMessage(vetData) {
  const form = document.getElementById('vetRegisterForm');
  const successMessage = document.getElementById('successMessage');
  const confirmationDetails = document.getElementById('confirmationDetails');

  // Créer le contenu du message de confirmation
  const confirmationHTML = `
    <div style="margin-bottom: 1rem;">
      <p><strong>ID de Candidature:</strong> ${vetData.id}</p>
      <p><strong>Nom:</strong> ${vetData.personalInfo.firstName} ${vetData.personalInfo.lastName}</p>
      <p><strong>Email:</strong> ${vetData.personalInfo.email}</p>
      <p><strong>Clinique:</strong> ${vetData.professionalInfo.clinicName}</p>
      <p><strong>Spécialité:</strong> ${vetData.professionalInfo.specialty}</p>
      <p><strong>Localisation:</strong> ${vetData.location.city}, ${vetData.location.region}</p>
    </div>
    <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
      <p style="margin: 0;"><i class="bi bi-info-circle me-2"></i><strong>Prochaines étapes:</strong></p>
      <ol style="margin: 0.5rem 0 0 1.5rem; padding: 0;">
        <li>Notre équipe vérifiera vos documents (48h)</li>
        <li>Vous recevrez un appel de confirmation</li>
        <li>Un entretien sera planifié avec vous</li>
        <li>Activation de votre profil une fois approuvé</li>
      </ol>
    </div>
  `;

  confirmationDetails.innerHTML = confirmationHTML;

  // Cacher le formulaire et afficher le message
  form.style.display = 'none';
  successMessage.style.display = 'block';
}

/**
 * Affiche un message d'erreur
 */
function showError(message) {
  // Créer une alerte temporaire
  const alert = document.createElement('div');
  alert.className = 'alert alert-danger alert-dismissible fade show';
  alert.role = 'alert';
  alert.innerHTML = `
    <i class="bi bi-exclamation-circle me-2"></i>
    <strong>Erreur:</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  const form = document.getElementById('vetRegisterForm');
  form.parentElement.insertBefore(alert, form);

  // Supprimer l'alerte après 5 secondes
  setTimeout(() => {
    alert.remove();
  }, 5000);
}

/**
 * Panel Admin - Voir les inscriptions (en développement)
 */
function viewVetRegistrations() {
  const registrations = JSON.parse(localStorage.getItem('ph_all_vet_registrations') || '[]');
  
  console.log('=== INSCRIPTIONS DE VÉTÉRINAIRES ===');
  registrations.forEach((reg, index) => {
    console.log(`\n${index + 1}. ${reg.personalInfo.firstName} ${reg.personalInfo.lastName}`);
    console.log(`   Email: ${reg.personalInfo.email}`);
    console.log(`   Clinique: ${reg.professionalInfo.clinicName}`);
    console.log(`   Spécialité: ${reg.professionalInfo.specialty}`);
    console.log(`   Statut: ${reg.status}`);
    console.log(`   ID: ${reg.id}`);
  });
  
  return registrations;
}

/**
 * Panel Admin - Approuver une candidature
 */
function approveVetApplication(vetId) {
  let registrations = JSON.parse(localStorage.getItem('ph_all_vet_registrations') || '[]');
  
  const vetIndex = registrations.findIndex(v => v.id === vetId);
  if (vetIndex !== -1) {
    registrations[vetIndex].status = 'Approuvé';
    registrations[vetIndex].approvalDate = new Date().toISOString();
    
    localStorage.setItem('ph_all_vet_registrations', JSON.stringify(registrations));
    console.log(`Candidature ${vetId} approuvée!`);
    
    // Optionnel: Ajouter le vétérinaire à la liste active
    addVetToActiveList(registrations[vetIndex]);
  }
}

/**
 * Panel Admin - Planifier un entretien
 */
function scheduleInterview(vetId, interviewDate, interviewTime) {
  let registrations = JSON.parse(localStorage.getItem('ph_all_vet_registrations') || '[]');
  
  const vetIndex = registrations.findIndex(v => v.id === vetId);
  if (vetIndex !== -1) {
    registrations[vetIndex].status = 'Entretien planifié';
    registrations[vetIndex].interviewDate = `${interviewDate} à ${interviewTime}`;
    
    localStorage.setItem('ph_all_vet_registrations', JSON.stringify(registrations));
    console.log(`Entretien planifié pour ${vetId}`);
  }
}

/**
 * Panel Admin - Rejeter une candidature
 */
function rejectVetApplication(vetId, reason) {
  let registrations = JSON.parse(localStorage.getItem('ph_all_vet_registrations') || '[]');
  
  const vetIndex = registrations.findIndex(v => v.id === vetId);
  if (vetIndex !== -1) {
    registrations[vetIndex].status = 'Rejeté';
    registrations[vetIndex].rejectionReason = reason;
    registrations[vetIndex].rejectionDate = new Date().toISOString();
    
    localStorage.setItem('ph_all_vet_registrations', JSON.stringify(registrations));
    console.log(`Candidature ${vetId} rejetée`);
  }
}

/**
 * Ajouter le vétérinaire approuvé à la liste active (pour rdv-advanced.js)
 */
function addVetToActiveList(vetData) {
  // Créer un objet vétérinaire au format de rdv-advanced.js
  const newVet = {
    id: vetData.id,
    name: `Dr. ${vetData.personalInfo.firstName} ${vetData.personalInfo.lastName}`,
    city: vetData.location.city,
    specialty: vetData.professionalInfo.specialty,
    phone: vetData.personalInfo.phone,
    email: vetData.personalInfo.email,
    rating: 5.0, // Nouveau vétérinaire
    reviews: 0,
    experience: vetData.professionalInfo.experience,
    image: '👨‍⚕️',
    color: '#4f46e5',
    description: `Spécialiste en ${vetData.professionalInfo.specialty} avec ${vetData.professionalInfo.experience} ans d'expérience.`,
    languages: ['Arabe', 'Français'],
    certifications: vetData.qualifications.certifications,
    availability: vetData.availability,
    price: 300, // Prix par défaut
    badge: 'Nouveau ✨',
    approved: true,
    approvalDate: new Date().toISOString()
  };

  // Charger la liste existante depuis rdv-advanced.js
  let activeVets = JSON.parse(localStorage.getItem('ph_active_vets') || '[]');
  activeVets.push(newVet);
  localStorage.setItem('ph_active_vets', JSON.stringify(activeVets));
  
  console.log(`Vétérinaire ${newVet.name} ajouté à la liste active`);
}

/**
 * Compter les candidatures par statut
 */
function countApplicationsByStatus() {
  const registrations = JSON.parse(localStorage.getItem('ph_all_vet_registrations') || '[]');
  
  const statuses = {
    'En attente de vérification': 0,
    'Entretien planifié': 0,
    'Approuvé': 0,
    'Rejeté': 0
  };

  registrations.forEach(reg => {
    statuses[reg.status]++;
  });

  return statuses;
}

/**
 * Exporter les candidatures en JSON
 */
function exportRegistrations() {
  const registrations = JSON.parse(localStorage.getItem('ph_all_vet_registrations') || '[]');
  
  const dataStr = JSON.stringify(registrations, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `candidatures_veterinaires_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  console.log('Candidatures exportées');
}
