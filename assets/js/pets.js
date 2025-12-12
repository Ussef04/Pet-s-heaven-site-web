// Suivi des chats — Page pets.html

document.addEventListener('DOMContentLoaded', () => {
  renderPets();

  // Formulaire ajouter un chat
  const addPetForm = document.getElementById('addPetForm');
  if (addPetForm) {
    addPetForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('petName').value;
      const age = document.getElementById('petAge').value;
      const breed = document.getElementById('petBreed').value;
      const weight = document.getElementById('petWeight').value;

      // Validation
      if (!name || !age) {
        alert('Veuillez remplir les champs obligatoires');
        return;
      }

      // Sauvegarder dans localStorage
      const pets = JSON.parse(localStorage.getItem('ph_pets') || '[]');
      const newPet = { id: Date.now(), name, age, breed, weight, dateAdded: new Date().toLocaleDateString() };
      pets.push(newPet);
      localStorage.setItem('ph_pets', JSON.stringify(pets));

      // Animation succès
      showSuccessMessage(`Bienvenue ${name}! 🐱 Le profil a été créé avec succès.`);

      // Fermer la modale et réinitialiser
      const modal = bootstrap.Modal.getInstance(document.getElementById('addPetModal'));
      if (modal) modal.hide();
      addPetForm.reset();

      // Rafraîchir l'affichage
      setTimeout(() => renderPets(), 500);
    });
  }
});

function renderPets() {
  const petsGrid = document.getElementById('petsGrid');
  const pets = JSON.parse(localStorage.getItem('ph_pets') || '[]');

  if (pets.length === 0) {
    petsGrid.innerHTML = `
      <div class="col-12 text-center py-5">
        <div style="font-size: 3rem; margin-bottom: 1rem;">😿</div>
        <p class="text-muted mb-3 fs-5">Aucun chat enregistré</p>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPetModal">
          <i class="bi bi-plus-circle me-2"></i> Ajouter votre premier chat
        </button>
      </div>
    `;
    return;
  }

  petsGrid.innerHTML = pets.map((pet, index) => `
    <div class="col-md-6 col-lg-4" style="animation: fadeInUp 0.6s ease-out ${index * 0.1}s backwards;">
      <div class="card h-100 border-0 shadow-sm">
        <div class="card-header bg-gradient" style="background: linear-gradient(135deg, #4f46e5, #f59e0b); height: 80px; position: relative;">
          <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 80px; height: 80px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            🐱
          </div>
        </div>
        <div class="card-body pt-5">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 class="card-title mb-1" style="font-size: 1.3rem;">${pet.name}</h5>
              <p class="text-muted small">Ajouté le ${pet.dateAdded}</p>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="deletePet(${pet.id})">
              <i class="bi bi-trash"></i>
            </button>
          </div>

          <div class="small text-muted mb-4" style="background: #f3f4f6; padding: 12px; border-radius: 8px;">
            <p class="mb-2"><i class="bi bi-calendar-event me-2 text-primary"></i><strong>${pet.age} ans</strong></p>
            <p class="mb-2"><i class="bi bi-tag me-2 text-primary"></i>${pet.breed || 'Race non spécifiée'}</p>
            <p class="mb-0"><i class="bi bi-weight me-2 text-primary"></i>${pet.weight || '-'} kg</p>
          </div>

          <div class="d-flex gap-2">
            <a href="rdv.html" class="btn btn-primary btn-sm flex-grow-1">
              <i class="bi bi-calendar-plus me-1"></i>RDV Veto
            </a>
            <button class="btn btn-outline-secondary btn-sm flex-grow-1">
              <i class="bi bi-journal-medical me-1"></i>Carnet
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function deletePet(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce chat? Cette action ne peut pas être annulée.')) {
    let pets = JSON.parse(localStorage.getItem('ph_pets') || '[]');
    const petName = pets.find(p => p.id === id)?.name || 'Le chat';
    pets = pets.filter(p => p.id !== id);
    localStorage.setItem('ph_pets', JSON.stringify(pets));
    showSuccessMessage(`${petName} a été supprimé 😢`);
    renderPets();
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
