// Vétérinaires — Page vets.html

const defaultVeterinarians = [
  { id: 1, name: 'Dr. Ahmed Alami', city: 'Casablanca', specialty: 'Généraliste', phone: '05.22.11.22.33', email: 'ahmed@vetmaroc.com', rating: 4.8 },
  { id: 2, name: 'Dr. Fatima Bennani', city: 'Rabat', specialty: 'Chirurgie', phone: '05.37.44.55.66', email: 'fatima@vetmaroc.com', rating: 4.9 },
  { id: 3, name: 'Dr. Mohamed Karim', city: 'Fès', specialty: 'Dermatologie', phone: '05.35.77.88.99', email: 'karim@vetmaroc.com', rating: 4.7 },
  { id: 4, name: 'Dr. Hana Zioui', city: 'Marrakech', specialty: 'Dentaire', phone: '05.24.66.77.88', email: 'hana@vetmaroc.com', rating: 4.6 },
  { id: 5, name: 'Dr. Jamal Hassan', city: 'Tangier', specialty: 'Généraliste', phone: '05.39.99.00.11', email: 'jamal@vetmaroc.com', rating: 4.8 },
  { id: 6, name: 'Dr. Amina Brahim', city: 'Casablanca', specialty: 'Chirurgie', phone: '05.22.22.33.44', email: 'amina@vetmaroc.com', rating: 4.9 },
];

let veterinarians = [];

document.addEventListener('DOMContentLoaded', () => {
  // Load all veterinarians (default + registered ones)
  loadAllVeterinarians();

  // Filtres
  document.getElementById('cityFilter').addEventListener('change', filterVets);
  document.getElementById('specialtyFilter').addEventListener('change', filterVets);
});

// === LOAD ALL VETERINARIANS ===
// Combine default vets with newly registered ones
function loadAllVeterinarians() {
  // Start with default vets
  veterinarians = [...defaultVeterinarians];
  
  // Add registered vets from localStorage
  const registeredVets = JSON.parse(localStorage.getItem('ph_vet_list') || '[]');
  
  registeredVets.forEach(registeredVet => {
    // Check if vet is not already in the default list
    if (!veterinarians.find(v => v.email === registeredVet.email)) {
      veterinarians.push({
        id: registeredVet.id || Date.now(),
        name: registeredVet.name,
        city: registeredVet.city,
        specialty: registeredVet.specialty,
        phone: registeredVet.phone,
        email: registeredVet.email,
        rating: registeredVet.rating || 5.0,
        reviews: registeredVet.reviews || 0,
        isNew: true // Mark as newly registered
      });
    }
  });
  
  renderVets(veterinarians);
}

function filterVets() {
  const city = document.getElementById('cityFilter').value;
  const specialty = document.getElementById('specialtyFilter').value;

  const filtered = veterinarians.filter(v => {
    return (!city || v.city === city) && (!specialty || v.specialty === specialty);
  });

  // Animation transition
  const vetsList = document.getElementById('vetsList');
  vetsList.style.opacity = '0';
  setTimeout(() => {
    renderVets(filtered);
    vetsList.style.opacity = '1';
  }, 200);
}

function renderVets(vets) {
  const vetsList = document.getElementById('vetsList');
  vetsList.style.transition = 'opacity 0.3s ease';
  
  if (vets.length === 0) {
    vetsList.innerHTML = '<div class="col-12"><p class="text-center text-muted">Aucun vétérinaire trouvé.</p></div>';
    return;
  }

  vetsList.innerHTML = vets.map((vet, index) => `
    <div class="col-md-6" style="animation: fadeInUp 0.6s ease-out ${index * 0.1}s backwards;">
      <div class="card border-0 shadow-sm h-100">
        <div class="card-body">
          <div class="d-flex align-items-start justify-content-between mb-3">
            <div>
              <h5 class="card-title mb-1">${vet.name}</h5>
              <p class="text-muted small mb-2"><i class="bi bi-geo-alt-fill text-primary me-1"></i>${vet.specialty} • ${vet.city}</p>
            </div>
            <div>
              <span class="badge bg-primary">${vet.specialty}</span>
              <div style="font-size: 0.85rem; margin-top: 5px;">
                <span style="color: #f59e0b;"><i class="bi bi-star-fill"></i> ${vet.rating}</span>
              </div>
            </div>
          </div>
          
          <div class="small mb-3">
            <p class="mb-1"><i class="bi bi-telephone text-primary me-2"></i><a href="tel:${vet.phone}" class="text-decoration-none">${vet.phone}</a></p>
            <p class="mb-0"><i class="bi bi-envelope text-primary me-2"></i><a href="mailto:${vet.email}" class="text-decoration-none">${vet.email}</a></p>
          </div>

          <div class="d-flex gap-2">
            <a href="rdv.html" class="btn btn-primary btn-sm flex-grow-1"><i class="bi bi-calendar-plus me-1"></i>RDV</a>
            <button class="btn btn-outline-secondary btn-sm" onclick="saveFavorite('${vet.name}')">
              <i class="bi bi-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function saveFavorite(vetName) {
  const favorites = JSON.parse(localStorage.getItem('ph_favorite_vets') || '[]');
  if (!favorites.includes(vetName)) {
    favorites.push(vetName);
    localStorage.setItem('ph_favorite_vets', JSON.stringify(favorites));
    showSuccessMessage(`${vetName} a été ajouté aux favoris ❤️`);
  } else {
    showSuccessMessage(`${vetName} est déjà dans les favoris!`);
  }
}

function showSuccessMessage(message) {
  const toast = document.createElement('div');
  toast.className = 'position-fixed bottom-0 end-0 m-3 p-3';
  toast.style.zIndex = '2000';
  toast.innerHTML = `
    <div class="alert alert-info alert-dismissible fade show" style="border-radius: 10px; box-shadow: 0 10px 30px rgba(79, 70, 229, 0.3);">
      <i class="bi bi-heart-fill me-2"></i>${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.querySelector('.btn-close').click();
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
