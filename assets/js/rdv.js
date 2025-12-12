// Rendez-vous — Page rdv.html (AVANCÉ)

// Base de données des vétérinaires
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
    availability: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    color: "#f59e0b"
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
    availability: ["09:00", "10:00", "14:00", "15:00", "16:00", "17:00"],
    color: "#10b981"
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
    availability: ["10:00", "11:00", "14:00", "15:00", "16:00"],
    color: "#ef4444"
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
    availability: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    color: "#7c3aed"
  }
];

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
        otherAnimalDiv.classList.remove('d-none');
        otherAnimalInput.required = true;
      } else {
        otherAnimalDiv.classList.add('d-none');
        otherAnimalInput.required = false;
        otherAnimalInput.value = '';
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
        animalLabel = `Autre (${otherAnimalInput.value})`;
      }

      const vet = document.getElementById('vetSelect').value;
      const date = document.getElementById('rdvDate').value;
      const time = document.getElementById('rdvTime').value;
      const reason = document.getElementById('rdvReason').value || 'Consultation générale';
      const details = document.getElementById('rdvDetails').value;
      const emailReminder = document.getElementById('emailReminder').checked;
      const smsReminder = document.getElementById('smsReminder').checked;

      // Validation
      if (!animalType || !vet || !date || !time) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
      }

      if (animalType === 'Autre' && !otherAnimalInput.value) {
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
      <div class="alert alert-info text-center rounded-3" style="border-radius: 10px;">
        <i class="bi bi-inbox" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
        Aucun rendez-vous enregistré pour le moment
      </div>
    `;
    document.getElementById('nextRdv').textContent = '-';
    return;
  }

  // Trier par date
  rdvList.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Trouver le prochain RDV
  const today = new Date().toISOString().split('T')[0];
  const nextRdv = rdvList.find(r => r.date >= today);
  
  if (nextRdv) {
    const nextDate = new Date(nextRdv.date);
    const daysLeft = Math.ceil((nextDate - new Date()) / (1000 * 60 * 60 * 24));
    document.getElementById('nextRdv').textContent = daysLeft > 0 ? `${daysLeft}j` : 'Aujourd\'hui';
  }
  
  // Afficher les RDV
  container.innerHTML = rdvList.map((rdv, idx) => {
    const isPast = new Date(rdv.date) < new Date();
    const isToday = rdv.date === today;
    
    return `
      <div class="card border-0 mb-3 ${isPast ? 'opacity-75' : ''}" style="border-left: 5px solid ${isPast ? '#d1d5db' : '#4f46e5'}; background: ${isPast ? '#f9fafb' : 'white'}; border-radius: 10px; overflow: hidden;">
        <div class="card-body p-4">
          <div class="row align-items-start">
            <div class="col-md-8">
              <div class="d-flex align-items-center mb-3">
                <span class="badge ${isPast ? 'bg-secondary' : isToday ? 'bg-danger' : 'bg-success'} me-2">
                  ${isPast ? '✓ Passé' : isToday ? '🔔 Aujourd\'hui' : '📅 À venir'}
                </span>
                <strong style="color: #1f2937; font-size: 0.9rem;">${rdv.confirmationCode}</strong>
              </div>
              
              <h6 class="fw-bold mb-3" style="color: #1f2937; font-size: 1.1rem;">
                <i class="bi bi-hospital me-2" style="color: #f59e0b;"></i>${rdv.vet}
              </h6>
              
              <div class="row g-3 small mb-3">
                <div class="col-md-6">
                  <p class="mb-1"><i class="bi bi-paw-fill me-2" style="color: #7c3aed;"></i><strong>Animal:</strong> ${rdv.animal}</p>
                  <p class="mb-0"><i class="bi bi-calendar-event me-2" style="color: #ef4444;"></i><strong>Date:</strong> ${rdv.dateFormatted}</p>
                </div>
                <div class="col-md-6">
                  <p class="mb-1"><i class="bi bi-clock me-2" style="color: #10b981;"></i><strong>Heure:</strong> ${rdv.time}</p>
                  <p class="mb-0"><i class="bi bi-file-text me-2" style="color: #4f46e5;"></i><strong>Motif:</strong> ${rdv.reason}</p>
                </div>
              </div>

              ${rdv.details ? `<p class="text-muted small mb-2"><strong>Notes:</strong> ${rdv.details}</p>` : ''}
              
              <div class="text-muted small">
                ${rdv.emailReminder ? '<i class="bi bi-envelope-check me-1" style="color: #10b981;"></i><strong>Email</strong>' : '<i class="bi bi-envelope-fill me-1" style="color: #d1d5db;"></i><strong class="text-muted">Email</strong>'}
                &nbsp;&nbsp;
                ${rdv.smsReminder ? '<i class="bi bi-chat-dots-fill me-1" style="color: #10b981;"></i><strong>SMS</strong>' : '<i class="bi bi-chat-dots-fill me-1" style="color: #d1d5db;"></i><strong class="text-muted">SMS</strong>'}
              </div>
            </div>
            
            <div class="col-md-4 text-md-end mt-3 mt-md-0">
              <div class="d-flex gap-2 justify-content-md-end">
                ${!isPast ? `
                  <button class="btn btn-sm btn-outline-primary" onclick="editRDV(${rdv.id})" style="border-radius: 8px;">
                    <i class="bi bi-pencil me-1"></i>Modifier
                  </button>
                  <button class="btn btn-sm btn-outline-danger" onclick="cancelRDV(${rdv.id})" style="border-radius: 8px;">
                    <i class="bi bi-trash me-1"></i>Annuler
                  </button>
                ` : `
                  ${!rdv.rating ? `
                    <button class="btn btn-sm btn-outline-success" onclick="rateRDV(${rdv.id})" style="border-radius: 8px;">
                      <i class="bi bi-star me-1"></i>Évaluer
                    </button>
                  ` : `
                    <div style="color: #f59e0b;">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                    </div>
                  `}
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('totalRdv').textContent = rdvList.length;
}

function displayVets() {
  const container = document.getElementById('vetsContainer');
  
  container.innerHTML = vets.map(vet => `
    <div class="col-md-6 col-lg-4">
      <div class="card border-0 shadow-sm h-100 overflow-hidden" style="border-top: 5px solid ${vet.color}; border-radius: 15px; transition: all 0.3s ease;">
        <div style="background: ${vet.color}; color: white; padding: 2rem; text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 10px;">${vet.image}</div>
          <h5 class="fw-bold">${vet.name}</h5>
          <p style="font-size: 0.9rem; opacity: 0.9;">${vet.specialty}</p>
        </div>
        <div class="card-body p-4">
          <div class="mb-3">
            <p class="mb-1"><small class="text-muted"><i class="bi bi-geo-alt-fill me-1"></i>${vet.city}</small></p>
            <p class="mb-1"><small class="text-muted"><i class="bi bi-briefcase me-1"></i>${vet.experience} ans d'expérience</small></p>
          </div>
          
          <div class="mb-3">
            <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
              <span style="color: #f59e0b; font-weight: bold;">★ ${vet.rating}</span>
              <span style="color: #6b7280; font-size: 0.9rem;">(${vet.reviews} avis)</span>
            </div>
            <div style="width: 100%; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden;">
              <div style="width: ${(vet.rating / 5) * 100}%; height: 100%; background: linear-gradient(90deg, #f59e0b, #fbbf24);"></div>
            </div>
          </div>

          <div class="mb-3 p-2 rounded-2" style="background: #f3f4f6;">
            <small class="text-muted"><strong>Horaires:</strong></small>
            <p style="font-size: 0.8rem; color: #4f46e5; font-weight: 600; margin-top: 5px;">
              Lun-Ven: 09h-18h | Sam: 09h-14h
            </p>
          </div>

          <div class="d-grid gap-2">
            <button class="btn btn-primary btn-sm fw-bold" onclick="selectVet('${vet.name} - ${vet.city}')" style="border-radius: 8px;">
              <i class="bi bi-calendar-event me-1"></i>Prendre RDV
            </button>
            <a href="tel:${vet.phone}" class="btn btn-outline-secondary btn-sm fw-bold" style="border-radius: 8px;">
              <i class="bi bi-telephone me-1"></i>Appeler
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
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

function initializeTabs() {
  // Bootstrap tabs are auto-handled
}


  if (successMsg && rdvForm) {
    successMsg.innerHTML = `
      <div class="alert alert-success mb-0" style="border-radius: 12px; border: none;">
        <div style="display: flex; align-items: center; gap: 15px;">
          <div style="font-size: 2rem;">✅</div>
          <div>
            <h5 class="mb-1">Rendez-vous confirmé!</h5>
            <p class="mb-1"><strong>${animal}</strong> • ${vet}</p>
            <p class="mb-1">📅 ${date} à ${time}</p>
            <small>Un rappel vous sera envoyé par email</small>
          </div>
        </div>
      </div>
    `;
    
    successMsg.classList.remove('d-none');
    rdvForm.style.display = 'none';
    successMsg.style.animation = 'fadeInUp 0.5s ease-out';
  }
}

function showSuccessMessage(message) {
  const toast = document.createElement('div');
  toast.className = 'position-fixed bottom-0 end-0 m-3 p-3';
  toast.style.zIndex = '2000';
  toast.style.animation = 'slideInLeft 0.3s ease-out';
  toast.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" style="border-radius: 10px; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);">
      <i class="bi bi-check-circle me-2"></i>${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.querySelector('.btn-close').click();
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
