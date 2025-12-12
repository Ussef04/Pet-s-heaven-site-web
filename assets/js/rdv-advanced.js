// Rendez-vous Vétérinaires — Page rdv.html (VERSION AVANCÉE)
// Base de données complète de 20 vétérinaires partenaires

const vets = [
  {
    id: 1,
    name: "Dr. Ahmed Alami",
    city: "Casablanca",
    specialty: "Généraliste",
    phone: "+212 5 22 34 56 78",
    email: "ahmed@vets.ma",
    rating: 4.8,
    reviews: 156,
    experience: 15,
    image: "🩺",
    color: "#f59e0b",
    description: "Vétérinaire généraliste avec expertise en vaccination et prévention",
    languages: ["Arabe", "Français", "Anglais"],
    certifications: ["Diplôme national", "Certification OIE"],
    availability: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    price: "250-400 DH",
    badge: "⭐ TOP AVIS"
  },
  {
    id: 2,
    name: "Dr. Fatima Bennani",
    city: "Rabat",
    specialty: "Dermatologie",
    phone: "+212 5 37 12 34 56",
    email: "fatima@vets.ma",
    rating: 4.9,
    reviews: 203,
    experience: 12,
    image: "💊",
    color: "#10b981",
    description: "Spécialiste en dermatologie animale et traitement des allergies",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme spécialisé", "Formation dermatologie vétérinaire"],
    availability: ["09:00", "10:00", "14:00", "15:00", "16:00", "17:00"],
    price: "350-500 DH",
    badge: "🏆 MEILLEURE SPÉCIALISTE"
  },
  {
    id: 3,
    name: "Dr. Mohamed Karim",
    city: "Fès",
    specialty: "Chirurgie",
    phone: "+212 5 35 67 89 01",
    email: "karim@vets.ma",
    rating: 4.7,
    reviews: 89,
    experience: 18,
    image: "⚕️",
    color: "#ef4444",
    description: "Chirurgien vétérinaire expérimenté pour interventions complexes",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme chirurgie", "Certifié en anesthésie"],
    availability: ["10:00", "11:00", "14:00", "15:00", "16:00"],
    price: "500-1000 DH",
    badge: "👨‍⚕️ EXPERT CHIRURGIE"
  },
  {
    id: 4,
    name: "Dr. Leila Hamdaoui",
    city: "Marrakech",
    specialty: "Dentaire",
    phone: "+212 5 24 45 67 89",
    email: "leila@vets.ma",
    rating: 4.6,
    reviews: 124,
    experience: 10,
    image: "🦷",
    color: "#7c3aed",
    description: "Spécialiste en dentisterie vétérinaire et détartrage",
    languages: ["Arabe", "Français", "Anglais"],
    certifications: ["Diplôme dentaire vétérinaire", "Formation nettoyage dentaire"],
    availability: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    price: "300-450 DH",
    badge: "🦷 EXPERT DENTAIRE"
  },
  {
    id: 5,
    name: "Dr. Samir Benali",
    city: "Tanger",
    specialty: "Médecine Interne",
    phone: "+212 5 39 94 56 78",
    email: "samir@vets.ma",
    rating: 4.85,
    reviews: 167,
    experience: 16,
    image: "🔬",
    color: "#06b6d4",
    description: "Expert en diagnostique et maladies internes complexes",
    languages: ["Arabe", "Français", "Anglais"],
    certifications: ["Diplôme spécialisé", "Formation diagnostique"],
    availability: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    price: "280-420 DH",
    badge: "🔍 DIAGNOSTIQUE PRO"
  },
  {
    id: 6,
    name: "Dr. Nour Amara",
    city: "Agadir",
    specialty: "Orthopédie",
    phone: "+212 5 28 12 34 56",
    email: "nour@vets.ma",
    rating: 4.75,
    reviews: 98,
    experience: 14,
    image: "🦴",
    color: "#8b5cf6",
    description: "Spécialiste en orthopédie et traumatologie animale",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme orthopédie", "Certification chirurgie orthopédique"],
    availability: ["09:00", "10:00", "14:00", "15:00", "16:00"],
    price: "400-600 DH",
    badge: "🦴 ORTHOPÉDIE"
  },
  {
    id: 7,
    name: "Dr. Karim Bennani",
    city: "Casablanca",
    specialty: "Ophtalmologie",
    phone: "+212 5 22 56 78 90",
    email: "karim.bennani@vets.ma",
    rating: 4.72,
    reviews: 145,
    experience: 11,
    image: "👁️",
    color: "#f97316",
    description: "Expert en affections oculaires et chirurgie ophtalmique",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme ophtalmologie vétérinaire"],
    availability: ["09:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    price: "350-480 DH",
    badge: "👁️ OPHTALMOLOGIE"
  },
  {
    id: 8,
    name: "Dr. Yasmine Rachid",
    city: "Rabat",
    specialty: "Reproduction",
    phone: "+212 5 37 23 45 67",
    email: "yasmine@vets.ma",
    rating: 4.88,
    reviews: 176,
    experience: 13,
    image: "🐣",
    color: "#ec4899",
    description: "Spécialiste en reproduction, stérilisation et castration",
    languages: ["Arabe", "Français", "Anglais"],
    certifications: ["Diplôme reproduction", "Formation obstetrique"],
    availability: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    price: "300-450 DH",
    badge: "⭐ TRÈS POPULAIRE"
  },
  {
    id: 9,
    name: "Dr. Hassan Chakri",
    city: "Marrakech",
    specialty: "Urgences",
    phone: "+212 5 24 67 89 01",
    email: "hassan@vets.ma",
    rating: 4.9,
    reviews: 234,
    experience: 20,
    image: "🚑",
    color: "#dc2626",
    description: "Vétérinaire urgentiste disponible 24/7 pour urgences critiques",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme urgences", "Formation réanimation animale"],
    availability: ["24/7", "Weekend", "Fêtes"],
    price: "600-2000 DH",
    badge: "🚑 URGENCES 24/7"
  },
  {
    id: 10,
    name: "Dr. Samira Lahcen",
    city: "Fès",
    specialty: "Nutrition",
    phone: "+212 5 35 78 90 12",
    email: "samira@vets.ma",
    rating: 4.81,
    reviews: 112,
    experience: 9,
    image: "🥗",
    color: "#84cc16",
    description: "Nutritionniste vétérinaire pour régimes spécialisés",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme nutrition", "Formation diététique animale"],
    availability: ["09:00", "10:00", "14:00", "15:00", "16:00"],
    price: "200-350 DH",
    badge: "🥗 NUTRITION"
  },
  {
    id: 11,
    name: "Dr. Rauf Essaidi",
    city: "Tanger",
    specialty: "Comportement",
    phone: "+212 5 39 01 23 45",
    email: "rauf@vets.ma",
    rating: 4.74,
    reviews: 87,
    experience: 8,
    image: "🧠",
    color: "#06b6d4",
    description: "Comportementaliste animal pour problèmes comportementaux",
    languages: ["Arabe", "Français", "Anglais"],
    certifications: ["Diplôme comportement", "Formation éthologie"],
    availability: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    price: "250-400 DH",
    badge: "🧠 COMPORTEMENT"
  },
  {
    id: 12,
    name: "Dr. Amal Khiari",
    city: "Casablanca",
    specialty: "Gériatrie",
    phone: "+212 5 22 78 90 12",
    email: "amal@vets.ma",
    rating: 4.83,
    reviews: 134,
    experience: 17,
    image: "🏥",
    color: "#14b8a6",
    description: "Spécialiste en soins gériatriques pour animaux âgés",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme gériatrie", "Formation gerontologie animale"],
    availability: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    price: "280-420 DH",
    badge: "👴 GÉRIATRIE"
  },
  {
    id: 13,
    name: "Dr. Jalal Zahra",
    city: "Rabat",
    specialty: "Oncologie",
    phone: "+212 5 37 34 56 78",
    email: "jalal@vets.ma",
    rating: 4.76,
    reviews: 101,
    experience: 14,
    image: "🔍",
    color: "#3b82f6",
    description: "Oncologue vétérinaire pour traitement des cancers animaux",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme oncologie", "Formation chimiothérapie"],
    availability: ["09:00", "11:00", "14:00", "15:00"],
    price: "500-800 DH",
    badge: "🔍 ONCOLOGIE"
  },
  {
    id: 14,
    name: "Dr. Layla Mourad",
    city: "Agadir",
    specialty: "Cardiologie",
    phone: "+212 5 28 45 67 89",
    email: "layla@vets.ma",
    rating: 4.87,
    reviews: 149,
    experience: 11,
    image: "💓",
    color: "#f43f5e",
    description: "Cardiologue vétérinaire expert en maladies cardiaques",
    languages: ["Arabe", "Français", "Anglais"],
    certifications: ["Diplôme cardiologie", "Formation échocardiographie"],
    availability: ["09:00", "10:00", "14:00", "15:00", "16:00"],
    price: "380-520 DH",
    badge: "💓 CARDIOLOGIE"
  },
  {
    id: 15,
    name: "Dr. Abdel Karim Moussa",
    city: "Marrakech",
    specialty: "Radiologie",
    phone: "+212 5 24 78 90 01",
    email: "abdel@vets.ma",
    rating: 4.79,
    reviews: 167,
    experience: 12,
    image: "📸",
    color: "#64748b",
    description: "Radiologue vétérinaire avec équipement dernier cri",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme radiologie", "Formation imagerie médicale"],
    availability: ["09:00", "10:00", "14:00", "15:00", "16:00"],
    price: "200-400 DH",
    badge: "📸 RADIOLOGIE"
  },
  {
    id: 16,
    name: "Dr. Mirna Chahine",
    city: "Casablanca",
    specialty: "Animaux Exotiques",
    phone: "+212 5 22 89 01 23",
    email: "mirna@vets.ma",
    rating: 4.82,
    reviews: 95,
    experience: 10,
    image: "🦎",
    color: "#22c55e",
    description: "Vétérinaire spécialisée en animaux exotiques et reptiles",
    languages: ["Arabe", "Français", "Anglais"],
    certifications: ["Diplôme animaux exotiques", "Formation herpétologie"],
    availability: ["09:00", "11:00", "14:00", "15:00"],
    price: "350-500 DH",
    badge: "🦎 EXOTIQUES"
  },
  {
    id: 17,
    name: "Dr. Tarek Amana",
    city: "Fès",
    specialty: "Traumatologie",
    phone: "+212 5 35 90 12 34",
    email: "tarek@vets.ma",
    rating: 4.85,
    reviews: 128,
    experience: 15,
    image: "🚨",
    color: "#e11d48",
    description: "Chirurgien traumatologue pour accidents graves",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme traumatologie", "Formation chirurgie urgente"],
    availability: ["09:00", "10:00", "14:00", "15:00", "16:00"],
    price: "450-800 DH",
    badge: "🚨 TRAUMATOLOGIE"
  },
  {
    id: 18,
    name: "Dr. Safa Belkhadem",
    city: "Tanger",
    specialty: "Pneumologie",
    phone: "+212 5 39 23 45 67",
    email: "safa@vets.ma",
    rating: 4.71,
    reviews: 76,
    experience: 9,
    image: "🫁",
    color: "#0d9488",
    description: "Pneumologue vétérinaire pour maladies respiratoires",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme pneumologie", "Formation troubles respiratoires"],
    availability: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    price: "280-420 DH",
    badge: "🫁 PNEUMOLOGIE"
  },
  {
    id: 19,
    name: "Dr. Nadim Aziz",
    city: "Rabat",
    specialty: "Gastroentérologie",
    phone: "+212 5 37 45 67 89",
    email: "nadim@vets.ma",
    rating: 4.84,
    reviews: 139,
    experience: 13,
    image: "🍽️",
    color: "#f59e0b",
    description: "Gastro-entérologue pour problèmes digestifs complexes",
    languages: ["Arabe", "Français"],
    certifications: ["Diplôme gastroentérologie", "Formation endoscopie"],
    availability: ["09:00", "10:00", "14:00", "15:00", "16:00"],
    price: "320-480 DH",
    badge: "🍽️ GASTRO"
  },
  {
    id: 20,
    name: "Dr. Zainab Cherif",
    city: "Agadir",
    specialty: "Urologie",
    phone: "+212 5 28 56 78 90",
    email: "zainab@vets.ma",
    rating: 4.86,
    reviews: 117,
    experience: 11,
    image: "🩸",
    color: "#a855f7",
    description: "Urologue vétérinaire expert en affections urinaires",
    languages: ["Arabe", "Français", "Anglais"],
    certifications: ["Diplôme urologie", "Formation lithiase urinaire"],
    availability: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    price: "300-450 DH",
    badge: "🩸 UROLOGIE"
  }
];

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  // Défaut : la date min est dans 2 jours
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const dateInput = document.getElementById('rdvDate');
  if (dateInput) {
    dateInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);
  }

  // Initialiser les onglets
  initializeTabs();
  
  // Charger et afficher les RDV
  loadRDVHistory();
  
  // Afficher les vétérinaires
  displayVets();
  
  // Afficher le statut d'abonnement
  updateSubscriptionStatus();

  // Gestion de l'affichage du champ "Autre animal"
  const animalRadios = document.querySelectorAll('input[name="animalType"]');
  const otherAnimalDiv = document.getElementById('otherAnimalDiv');
  const otherAnimalInput = document.getElementById('otherAnimalType');
  
  animalRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'Autre') {
        otherAnimalDiv?.classList.remove('d-none');
        if (otherAnimalInput) otherAnimalInput.required = true;
      } else {
        otherAnimalDiv?.classList.add('d-none');
        if (otherAnimalInput) {
          otherAnimalInput.required = false;
          otherAnimalInput.value = '';
        }
      }
    });
  });

  // Gestion formulaire RDV avancé
  const rdvForm = document.getElementById('rdvForm');
  if (rdvForm) {
    rdvForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Récupérer le type d'animal sélectionné
      const animalType = document.querySelector('input[name="animalType"]:checked')?.value;
      let animalLabel = animalType;
      
      if (animalType === 'Autre') {
        animalLabel = `Autre (${otherAnimalInput?.value || ''})`;
      }

      const vet = document.getElementById('vetSelect').value;
      const date = document.getElementById('rdvDate').value;
      const time = document.getElementById('rdvTime').value;
      const reason = document.getElementById('rdvReason').value || 'Consultation générale';
      const details = document.getElementById('rdvDetails').value;
      const emailReminder = document.getElementById('emailReminder')?.checked;
      const smsReminder = document.getElementById('smsReminder')?.checked;

      // Validation
      if (!animalType || !vet || !date || !time) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }

      if (animalType === 'Autre' && !otherAnimalInput?.value) {
        alert('Veuillez préciser la nature de votre animal');
        return;
      }

      // Formatage de la date
      const dateObj = new Date(date);
      const dateFormatted = dateObj.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      // Générer un code de confirmation unique
      const confirmationCode = 'RDV-' + Date.now().toString().slice(-8);

      // Créer l'objet RDV avancé
      const rdv = { 
        id: Date.now(),
        animal: animalLabel, 
        vet, 
        date, 
        dateFormatted,
        time, 
        reason,
        details,
        status: 'Confirmé',
        confirmationCode,
        emailReminder,
        smsReminder,
        createdAt: new Date().toLocaleString('fr-FR'),
        rating: null
      };

      // Sauvegarder
      const rdvList = JSON.parse(localStorage.getItem('ph_rdv') || '[]');
      rdvList.push(rdv);
      localStorage.setItem('ph_rdv', JSON.stringify(rdvList));

      // Afficher la confirmation
      showConfirmation(animalLabel, vet, dateFormatted, time, confirmationCode);
      
      // Réinitialiser après 3s
      setTimeout(() => {
        rdvForm.reset();
        document.getElementById('successMessage').classList.add('d-none');
        rdvForm.style.display = 'block';
        otherAnimalDiv?.classList.add('d-none');
        loadRDVHistory();
        updateSubscriptionStatus();
      }, 4500);
    });
  }
});

function showConfirmation(animal, vet, date, time, code) {
  const successMsg = document.getElementById('successMessage');
  const rdvForm = document.getElementById('rdvForm');
  
  if (successMsg) {
    document.getElementById('confirmationCode').textContent = code;
    successMsg.classList.remove('d-none');
    rdvForm.style.display = 'none';
  }
}

function loadRDVHistory() {
  const rdvList = JSON.parse(localStorage.getItem('ph_rdv') || '[]');
  const container = document.getElementById('rdvHistoryContainer');
  const countBadge = document.getElementById('rdvCount');
  
  countBadge.textContent = rdvList.length;
  
  if (rdvList.length === 0) {
    container.innerHTML = `
      <div class="alert alert-info text-center rounded-3" style="border-radius: 10px; padding: 40px 20px;">
        <div style="font-size: 3rem; margin-bottom: 15px;">📅</div>
        <h5 style="color: #0369a1; font-weight: bold;">Aucun rendez-vous enregistré</h5>
        <p style="color: #0284c7; margin-bottom: 15px;">Commencez par prendre votre premier rendez-vous avec nos vétérinaires partenaires</p>
        <button class="btn btn-primary" onclick="document.getElementById('booking-tab').click();" style="border-radius: 8px;">
          <i class="bi bi-calendar-event me-2"></i>Réserver maintenant
        </button>
      </div>
    `;
    document.getElementById('nextRdv').textContent = '-';
    document.getElementById('totalRdv').textContent = '0';
    return;
  }

  // Trier par date (les plus récents en premier)
  rdvList.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Séparer les RDV à venir et passés
  const today = new Date().toISOString().split('T')[0];
  const upcomingRdv = rdvList.filter(r => r.date >= today);
  const pastRdv = rdvList.filter(r => r.date < today);
  
  // Trouver le prochain RDV
  if (upcomingRdv.length > 0) {
    const nextDate = new Date(upcomingRdv[0].date);
    const daysLeft = Math.ceil((nextDate - new Date()) / (1000 * 60 * 60 * 24));
    document.getElementById('nextRdv').textContent = daysLeft > 0 ? `${daysLeft}j` : 'Aujourd\'hui';
  } else {
    document.getElementById('nextRdv').textContent = '-';
  }
  
  document.getElementById('totalRdv').textContent = rdvList.length;

  // Afficher les RDV à venir en premier
  let html = '';
  
  if (upcomingRdv.length > 0) {
    html += `
      <div class="mb-4">
        <h6 class="fw-bold mb-3 pb-2 border-bottom" style="color: #10b981;">
          <i class="bi bi-calendar-event me-2" style="color: #10b981;"></i>Rendez-vous à venir (${upcomingRdv.length})
        </h6>
        ${upcomingRdv.map((rdv, idx) => createRDVCard(rdv, false)).join('')}
      </div>
    `;
  }
  
  if (pastRdv.length > 0) {
    html += `
      <div class="mt-5">
        <h6 class="fw-bold mb-3 pb-2 border-bottom" style="color: #6b7280;">
          <i class="bi bi-archive me-2" style="color: #9ca3af;"></i>Rendez-vous passés (${pastRdv.length})
        </h6>
        ${pastRdv.map((rdv, idx) => createRDVCard(rdv, true)).join('')}
      </div>
    `;
  }
  
  container.innerHTML = html;
}

function createRDVCard(rdv, isPast) {
  const isToday = rdv.date === new Date().toISOString().split('T')[0];
  
  // Récupérer les informations du vétérinaire
  const vet = vets.find(v => `${v.name} - ${v.city}` === rdv.vet) || {};
  const vetColor = vet.color || '#4f46e5';
  
  return `
    <div class="card border-0 mb-3 shadow-sm ${isPast ? 'opacity-85' : ''}" 
         style="border-left: 5px solid ${vetColor}; background: ${isPast ? '#f9fafb' : 'white'}; border-radius: 12px; overflow: hidden; transition: all 0.3s ease;">
      
      <div class="card-body p-4">
        <div class="row align-items-start">
          <!-- LEFT SECTION -->
          <div class="col-lg-8">
            <!-- HEADER WITH STATUS -->
            <div class="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
              <div class="d-flex align-items-center gap-2">
                <span class="badge ${isPast ? 'bg-secondary' : isToday ? 'bg-danger animate-pulse' : 'bg-success'}" 
                      style="font-size: 0.85rem; padding: 6px 12px;">
                  ${isPast ? '✓ Passé' : isToday ? '🔔 Aujourd\'hui' : '📅 À venir'}
                </span>
                <span class="badge bg-light text-dark" style="font-size: 0.8rem; padding: 5px 10px; border: 1px solid #e5e7eb;">
                  ${rdv.confirmationCode}
                </span>
              </div>
              <small class="text-muted">
                <i class="bi bi-calendar-fill me-1"></i>${rdv.createdAt}
              </small>
            </div>

            <!-- VETERINARIAN INFO -->
            <div class="mb-4">
              <h6 class="fw-bold mb-2" style="color: #1f2937; font-size: 1.15rem;">
                <i class="bi bi-hospital me-2" style="color: ${vetColor};"></i>${rdv.vet}
              </h6>
              ${vet.specialty ? `
                <small class="text-muted" style="margin-left: 28px;">
                  <i class="bi bi-star-fill me-1" style="color: #f59e0b;"></i>
                  ${vet.specialty} • ${vet.experience} ans d'expérience • ${vet.rating ? '⭐ ' + vet.rating : ''}
                </small>
              ` : ''}
            </div>

            <!-- DETAILS GRID -->
            <div class="row g-3 small mb-4">
              <div class="col-md-6">
                <div style="padding: 12px; background: #f3f4f6; border-radius: 8px;">
                  <p class="mb-1" style="color: #6b7280;">
                    <i class="bi bi-paw-fill me-2" style="color: #7c3aed;"></i><strong>Animal</strong>
                  </p>
                  <p class="mb-0" style="color: #1f2937; font-weight: 600; margin-left: 26px;">${rdv.animal}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div style="padding: 12px; background: #f3f4f6; border-radius: 8px;">
                  <p class="mb-1" style="color: #6b7280;">
                    <i class="bi bi-calendar-event me-2" style="color: #ef4444;"></i><strong>Date</strong>
                  </p>
                  <p class="mb-0" style="color: #1f2937; font-weight: 600; margin-left: 26px;">${rdv.dateFormatted}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div style="padding: 12px; background: #f3f4f6; border-radius: 8px;">
                  <p class="mb-1" style="color: #6b7280;">
                    <i class="bi bi-clock-fill me-2" style="color: #10b981;"></i><strong>Heure</strong>
                  </p>
                  <p class="mb-0" style="color: #1f2937; font-weight: 600; margin-left: 26px;">${rdv.time}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div style="padding: 12px; background: #f3f4f6; border-radius: 8px;">
                  <p class="mb-1" style="color: #6b7280;">
                    <i class="bi bi-file-text me-2" style="color: #4f46e5;"></i><strong>Motif</strong>
                  </p>
                  <p class="mb-0" style="color: #1f2937; font-weight: 600; margin-left: 26px;">${rdv.reason}</p>
                </div>
              </div>
            </div>

            <!-- DETAILS & NOTIFICATIONS -->
            ${rdv.details ? `
              <div style="padding: 12px; background: #fffbeb; border-left: 3px solid #f59e0b; border-radius: 8px; margin-bottom: 12px;">
                <strong style="color: #92400e; font-size: 0.9rem;">📝 Notes:</strong>
                <p style="color: #78350f; margin-top: 5px; margin-bottom: 0;">${rdv.details}</p>
              </div>
            ` : ''}

            <div class="text-muted small" style="padding: 10px; background: #f0f9ff; border-radius: 8px;">
              <strong style="color: #0369a1;">Notifications:</strong>
              <div style="margin-top: 8px;">
                ${rdv.emailReminder ? '<i class="bi bi-envelope-check me-2" style="color: #10b981; font-weight: bold;"></i><strong style="color: #047857;">Email</strong>' : '<i class="bi bi-envelope-fill me-2" style="color: #d1d5db;"></i><span class="text-muted">Email</span>'}
                &nbsp;&nbsp;&nbsp;
                ${rdv.smsReminder ? '<i class="bi bi-chat-dots-fill me-2" style="color: #10b981; font-weight: bold;"></i><strong style="color: #047857;">SMS</strong>' : '<i class="bi bi-chat-dots-fill me-2" style="color: #d1d5db;"></i><span class="text-muted">SMS</span>'}
              </div>
            </div>
          </div>

          <!-- RIGHT SECTION - ACTIONS -->
          <div class="col-lg-4 mt-4 mt-lg-0">
            <div style="background: ${isPast ? '#f9fafb' : 'linear-gradient(135deg, ' + vetColor + '10 0%, ' + vetColor + '05 100%)'}; padding: 20px; border-radius: 12px; border: 1px solid ${vetColor}30;">
              
              ${!isPast ? `
                <div class="mb-3">
                  <p style="color: #6b7280; font-size: 0.85rem; margin-bottom: 10px;">
                    <i class="bi bi-hourglass-split me-1"></i><strong>À faire avant</strong>
                  </p>
                  <ul style="color: #374151; font-size: 0.85rem; padding-left: 20px; margin-bottom: 0;">
                    <li>Préparer le carnet de santé</li>
                    <li>Arriver 15 min à l'avance</li>
                    <li>Avoir le vaccin à jour</li>
                  </ul>
                </div>
                <hr style="border: 1px solid ${vetColor}30; margin: 15px 0;">
              ` : `
                <div class="mb-3">
                  <p style="color: #6b7280; font-size: 0.85rem;">
                    <i class="bi bi-check-circle-fill me-1" style="color: #10b981;"></i><strong>Consultation terminée</strong>
                  </p>
                </div>
                <hr style="border: 1px solid ${vetColor}30; margin: 15px 0;">
              `}

              <!-- BUTTONS -->
              <div class="d-flex flex-column gap-2">
                ${!isPast ? `
                  <button class="btn btn-sm fw-bold" 
                          style="background: ${vetColor}; color: white; border: none; border-radius: 8px; padding: 8px 12px;"
                          onclick="editRDV(${rdv.id})">
                    <i class="bi bi-pencil me-1"></i>Modifier
                  </button>
                  <button class="btn btn-sm btn-outline-danger fw-bold" 
                          onclick="cancelRDV(${rdv.id})"
                          style="border-radius: 8px;">
                    <i class="bi bi-trash me-1"></i>Annuler
                  </button>
                  <a href="tel:${vet.phone || '#'}" class="btn btn-sm btn-outline-primary fw-bold" style="border-radius: 8px;">
                    <i class="bi bi-telephone me-1"></i>Appeler
                  </a>
                ` : `
                  ${!rdv.rating ? `
                    <button class="btn btn-sm btn-warning fw-bold" onclick="rateRDV(${rdv.id})" style="border-radius: 8px;">
                      <i class="bi bi-star me-1"></i>Évaluer
                    </button>
                  ` : `
                    <div style="text-align: center; padding: 10px; background: white; border-radius: 8px;">
                      <small style="color: #6b7280; display: block; margin-bottom: 5px;">Votre évaluation</small>
                      <div style="color: #f59e0b; font-size: 1.3rem; letter-spacing: 3px;">
                        ${Array(rdv.rating).fill('⭐').join('')}
                      </div>
                    </div>
                  `}
                  <button class="btn btn-sm btn-outline-primary fw-bold" onclick="rebookRDV(${rdv.id})" style="border-radius: 8px;">
                    <i class="bi bi-plus-circle me-1"></i>Rebooker
                  </button>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function displayVets() {
  const container = document.getElementById('vetsContainer');
  
  // Ajouter filtre et tri
  const filterHTML = `
    <div class="col-12 mb-4">
      <div class="row g-3 align-items-center">
        <div class="col-md-4">
          <input type="text" class="form-control" id="vetSearch" placeholder="🔍 Rechercher un vétérinaire..." style="border-radius: 10px; border: 2px solid #e5e7eb;">
        </div>
        <div class="col-md-4">
          <select class="form-select" id="vetFilter" style="border-radius: 10px; border: 2px solid #e5e7eb;">
            <option value="">Toutes les spécialités</option>
            <option value="Généraliste">Généraliste</option>
            <option value="Dermatologie">Dermatologie</option>
            <option value="Chirurgie">Chirurgie</option>
            <option value="Urgences">Urgences</option>
            <option value="Cardiologie">Cardiologie</option>
            <option value="Oncologie">Oncologie</option>
          </select>
        </div>
        <div class="col-md-4">
          <select class="form-select" id="vetSort" style="border-radius: 10px; border: 2px solid #e5e7eb;">
            <option value="rating">Meilleure note</option>
            <option value="reviews">Plus d'avis</option>
            <option value="experience">Plus d'expérience</option>
            <option value="price">Prix croissant</option>
          </select>
        </div>
      </div>
    </div>
  `;
  
  container.innerHTML = filterHTML;
  
  // Afficher les vétérinaires
  const vetsHTML = vets.map(vet => `
    <div class="col-md-6 col-lg-4 vet-card" data-specialty="${vet.specialty}" data-name="${vet.name.toLowerCase()}">
      <div class="card border-0 shadow-sm h-100 overflow-hidden" style="border-top: 5px solid ${vet.color}; border-radius: 15px; transition: all 0.3s ease;">
        <div style="background: ${vet.color}; color: white; padding: 1.5rem 2rem; text-align: center; position: relative;">
          ${vet.badge ? `<div style="position: absolute; top: 10px; right: 10px; background: white; color: #1f2937; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">${vet.badge}</div>` : ''}
          <div style="font-size: 3rem; margin-bottom: 10px;">${vet.image}</div>
          <h5 class="fw-bold">${vet.name}</h5>
          <p style="font-size: 0.85rem; opacity: 0.95; margin-bottom: 5px;">${vet.specialty}</p>
          <small style="opacity: 0.85;"><i class="bi bi-geo-alt-fill me-1"></i>${vet.city}</small>
        </div>
        <div class="card-body p-4">
          <p style="color: #6b7280; font-size: 0.9rem; margin-bottom: 12px;">${vet.description}</p>
          
          <div class="mb-3">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="color: #f59e0b; font-weight: bold; font-size: 1.1rem;">★ ${vet.rating}</span>
              <span style="color: #6b7280; font-size: 0.85rem;">(${vet.reviews} avis)</span>
            </div>
            <div style="width: 100%; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden;">
              <div style="width: ${(vet.rating / 5) * 100}%; height: 100%; background: linear-gradient(90deg, ${vet.color}, ${vet.color}dd);"></div>
            </div>
          </div>

          <div class="row g-2 small mb-3" style="padding: 10px; background: #f9fafb; border-radius: 8px;">
            <div class="col-6">
              <p class="mb-1"><strong>${vet.experience} ans</strong></p>
              <small style="color: #6b7280;">d'expérience</small>
            </div>
            <div class="col-6">
              <p class="mb-1"><strong>${vet.price}</strong></p>
              <small style="color: #6b7280;">Tarif</small>
            </div>
          </div>

          <div class="mb-3 p-2 rounded-2" style="background: #f3f4f6;">
            <small style="color: #6b7280; font-weight: 600;"><strong>Langues:</strong></small>
            <div style="margin-top: 6px; display: flex; flex-wrap: wrap; gap: 4px;">
              ${vet.languages.map(lang => `<span style="background: ${vet.color}20; color: ${vet.color}; padding: 3px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">${lang}</span>`).join('')}
            </div>
          </div>

          <div class="d-grid gap-2">
            <button class="btn btn-primary btn-sm fw-bold" onclick="selectVet('${vet.name} - ${vet.city}')" style="border-radius: 8px; background: linear-gradient(135deg, ${vet.color}, ${vet.color}dd); border: none;">
              <i class="bi bi-calendar-event me-1"></i>Prendre RDV
            </button>
            <a href="tel:${vet.phone}" class="btn btn-outline-secondary btn-sm fw-bold" style="border-radius: 8px; border: 2px solid ${vet.color}; color: ${vet.color};">
              <i class="bi bi-telephone me-1"></i>Appeler
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  container.innerHTML += vetsHTML;
  
  // Ajouter les événements de recherche/filtrage
  document.getElementById('vetSearch').addEventListener('input', filterVets);
  document.getElementById('vetFilter').addEventListener('change', filterVets);
  document.getElementById('vetSort').addEventListener('change', sortVets);
}

function filterVets() {
  const searchValue = document.getElementById('vetSearch').value.toLowerCase();
  const filterValue = document.getElementById('vetFilter').value;
  
  document.querySelectorAll('.vet-card').forEach(card => {
    const name = card.dataset.name;
    const specialty = card.dataset.specialty;
    
    const matchSearch = name.includes(searchValue);
    const matchFilter = !filterValue || specialty === filterValue;
    
    card.style.display = matchSearch && matchFilter ? 'block' : 'none';
  });
}

function sortVets() {
  const sortValue = document.getElementById('vetSort').value;
  const vetsCopy = [...vets];
  
  if (sortValue === 'rating') vetsCopy.sort((a, b) => b.rating - a.rating);
  else if (sortValue === 'reviews') vetsCopy.sort((a, b) => b.reviews - a.reviews);
  else if (sortValue === 'experience') vetsCopy.sort((a, b) => b.experience - a.experience);
  else if (sortValue === 'price') vetsCopy.sort((a, b) => {
    const priceA = parseInt(a.price.split('-')[0]);
    const priceB = parseInt(b.price.split('-')[0]);
    return priceA - priceB;
  });
  
  // Réorganiser l'affichage (implémentation simplifiée)
  location.reload();
}

function selectVet(vetName) {
  document.getElementById('vetSelect').value = vetName;
  document.getElementById('booking-tab').click();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateSubscriptionStatus() {
  const user = JSON.parse(localStorage.getItem('ph_user') || '{}');
  const subscription = user.subscription || 'Découverte';
  
  const statusDiv = document.getElementById('subscriptionStatus');
  const colors = {
    'Découverte': '#fef3c7',
    'Plus': '#fef08a',
    'Pro': '#e0e7ff'
  };
  
  const textColors = {
    'Découverte': '#92400e',
    'Plus': '#854d0e',
    'Pro': '#3730a3'
  };
  
  const benefits = {
    'Découverte': 'Pas de priorité spéciale',
    'Plus': 'Priorité RDV + rappels SMS',
    'Pro': 'Service VIP + concierge téléphonique'
  };
  
  statusDiv.innerHTML = `
    <p class="mb-0"><small><strong>Plan ${subscription}</strong> - ${benefits[subscription]}</small></p>
  `;
  statusDiv.style.background = colors[subscription] || colors['Découverte'];
  statusDiv.style.color = textColors[subscription] || textColors['Découverte'];
}

function cancelRDV(id) {
  if (!confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous?')) return;
  
  let rdvList = JSON.parse(localStorage.getItem('ph_rdv') || '[]');
  rdvList = rdvList.filter(r => r.id !== id);
  localStorage.setItem('ph_rdv', JSON.stringify(rdvList));
  loadRDVHistory();
}

function editRDV(id) {
  alert('Fonctionnalité de modification en développement. Veuillez annuler et créer un nouveau RDV.');
}

function rateRDV(id) {
  let rdvList = JSON.parse(localStorage.getItem('ph_rdv') || '[]');
  const rdvIndex = rdvList.findIndex(r => r.id === id);
  
  if (rdvIndex === -1) return;
  
  const rating = prompt('Donnez une note de 1 à 5 étoiles:', '5');
  if (rating && !isNaN(rating) && rating >= 1 && rating <= 5) {
    rdvList[rdvIndex].rating = parseInt(rating);
    localStorage.setItem('ph_rdv', JSON.stringify(rdvList));
    loadRDVHistory();
  }
}

function rebookRDV(id) {
  let rdvList = JSON.parse(localStorage.getItem('ph_rdv') || '[]');
  const oldRdv = rdvList.find(r => r.id === id);
  
  if (!oldRdv) return;
  
  // Pré-remplir le formulaire avec les informations précédentes
  document.getElementById('vetSelect').value = oldRdv.vet;
  
  // Afficher le message d'information
  const message = document.createElement('div');
  message.className = 'alert alert-info rounded-3 mb-3';
  message.style.borderRadius = '10px';
  message.innerHTML = `
    <i class="bi bi-info-circle me-2" style="color: #0369a1;"></i>
    <strong>Rebooking en cours</strong> - Formulaire pré-rempli avec vos dernières informations
    <button type="button" class="btn-close" data-bs-dismiss="alert" style="position: absolute; right: 12px; top: 12px;"></button>
  `;
  
  const form = document.getElementById('rdvForm');
  form.insertBefore(message, form.firstChild);
  
  // Aller à l'onglet de réservation
  document.getElementById('booking-tab').click();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initializeTabs() {
  // Bootstrap tabs sont gérées automatiquement
}
