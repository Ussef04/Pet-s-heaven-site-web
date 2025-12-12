// === CONSTANTS ===
const KEY_SESSION = 'ph_session';
const KEY_CLIENTS = 'ph_clients';
const KEY_VETS = 'ph_vets';
const KEY_APPOINTMENTS = 'ph_appointments';
const KEY_PRODUCTS = 'ph_products';

// === UTILITY FUNCTIONS ===
function loadData(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(KEY_SESSION) || 'null');
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem(KEY_SESSION);
  window.location.href = 'home.html';
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  const session = getSession();

  // Check if user is logged in
  if (!session || session.type !== 'client') {
    window.location.href = 'home.html';
    return;
  }

  // Update user info
  updateUserInfo(session);

  // Setup navigation
  setupNavigation();

  // Load and display data
  loadDashboardData();

  // Setup logout button
  document.getElementById('logoutBtn').addEventListener('click', logout);

  // Update year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// === UPDATE USER INFO ===
function updateUserInfo(session) {
  document.getElementById('userName').textContent = session.name || 'Client';
  document.getElementById('userEmail').textContent = session.email;
  
  // Create avatar from first letter
  const firstLetter = (session.name || 'C').charAt(0).toUpperCase();
  document.getElementById('userAvatar').textContent = firstLetter;
}

// === NAVIGATION SETUP ===
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item-custom');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked item
      item.classList.add('active');
      
      // Get section name
      const sectionName = item.getAttribute('data-section');
      
      // Update page title and icon
      const icon = item.querySelector('i').className;
      const text = item.querySelector('span').textContent;
      document.getElementById('pageTitle').innerHTML = `<i class="${icon}"></i><span>${text}</span>`;
      
      // Show/hide sections
      showSection(sectionName);
    });
  });
}

function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('[class^="section-"]').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  const section = document.querySelector(`.section-${sectionName}`);
  if (section) {
    section.classList.add('active');
  }
}

// === LOAD DASHBOARD DATA ===
function loadDashboardData() {
  const session = getSession();
  if (!session) return;

  // Load client data
  const clients = loadData(KEY_CLIENTS);
  const client = clients.find(c => c.id === session.id);

  if (client) {
    // Update stats
    document.getElementById('statAppointments').textContent = (client.appointments || []).length;
    document.getElementById('statPets').textContent = (client.pets || []).length;
    
    // Load appointments
    loadAppointments(client);
    
    // Load pets
    loadPets(client);
  }

  // Load vets and products
  loadVeterinarians();
  loadProducts();
}

// === LOAD APPOINTMENTS ===
function loadAppointments(client) {
  const appointmentsList = document.getElementById('appointmentsList');
  
  if (!client.appointments || client.appointments.length === 0) {
    appointmentsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i class="bi bi-calendar-x"></i>
        </div>
        <p>Aucun rendez-vous actuellement</p>
        <p style="font-size: 0.9rem;">Cliquez sur "Nouveau Rendez-vous" pour en ajouter un</p>
      </div>
    `;
    document.getElementById('statAppointments').textContent = '0';
    return;
  }

  let html = '';
  client.appointments.forEach(appointment => {
    const status = appointment.status || 'confirmé';
    const statusColor = status === 'confirmé' ? 'success' : status === 'en attente' ? 'warning' : 'danger';
    
    html += `
      <div class="appointment-item">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h5 style="margin: 0; color: var(--primary);">
              <i class="bi bi-calendar2-check me-2"></i>${appointment.vetName || 'Vétérinaire'}
            </h5>
            <p style="margin: 0.5rem 0 0 0; color: #6b7280;">
              <i class="bi bi-calendar me-2"></i>${new Date(appointment.date).toLocaleDateString('fr-FR')} à ${appointment.time || 'TBA'}
            </p>
            <p style="margin: 0.25rem 0 0 0; color: #6b7280;">
              <i class="bi bi-paw me-2"></i>${appointment.petName || 'Animal'}
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <span class="badge bg-${statusColor}" style="font-size: 0.9rem; padding: 0.5rem 1rem;">
              ${status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
      </div>
    `;
  });

  appointmentsList.innerHTML = html;
  document.getElementById('statAppointments').textContent = client.appointments.length;
}

// === LOAD PETS ===
function loadPets(client) {
  const petsList = document.getElementById('petsList');
  
  if (!client.pets || client.pets.length === 0) {
    petsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i class="bi bi-paw"></i>
        </div>
        <p>Aucun animal enregistré</p>
        <p style="font-size: 0.9rem;">Cliquez sur "Ajouter un Animal" pour enregistrer vos compagnons</p>
      </div>
    `;
    document.getElementById('statPets').textContent = '0';
    return;
  }

  let html = '';
  client.pets.forEach(pet => {
    html += `
      <div class="pet-card">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h5 style="margin: 0; color: var(--primary);">
              <i class="bi bi-paw me-2"></i>${pet.name}
            </h5>
            <p style="margin: 0.5rem 0 0 0; color: #6b7280;">
              ${pet.type || 'Animal'} • ${pet.breed || 'Race'} • ${pet.age || '?'} ans
            </p>
            <p style="margin: 0.25rem 0 0 0; color: #6b7280;">
              Poids: ${pet.weight || '?'} kg
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <button class="btn btn-sm btn-secondary-custom" onclick="editPet('${pet.id}')">
              <i class="bi bi-pencil me-1"></i>Modifier
            </button>
            <button class="btn btn-sm btn-danger" style="margin-left: 0.5rem;" onclick="deletePet('${pet.id}')">
              <i class="bi bi-trash me-1"></i>Supprimer
            </button>
          </div>
        </div>
      </div>
    `;
  });

  petsList.innerHTML = html;
  document.getElementById('statPets').textContent = client.pets.length;
}

// === LOAD VETERINARIANS ===
function loadVeterinarians() {
  const vets = loadData(KEY_VETS);
  const vetsList = document.getElementById('vetsList');

  if (!vets || vets.length === 0) {
    vetsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i class="bi bi-hospital"></i>
        </div>
        <p>Aucun vétérinaire disponible actuellement</p>
      </div>
    `;
    document.getElementById('statVets').textContent = '0';
    return;
  }

  let html = '';
  vets.forEach(vet => {
    html += `
      <div class="vet-card">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h5 style="margin: 0; color: var(--primary);">
              <i class="bi bi-hospital me-2"></i>Dr. ${vet.name}
            </h5>
            <p style="margin: 0.5rem 0 0 0; color: #6b7280;">
              <strong>Spécialité:</strong> ${vet.specialty || 'Médecine Générale'}
            </p>
            <p style="margin: 0.25rem 0 0 0; color: #6b7280;">
              <i class="bi bi-geo-alt me-1"></i>${vet.city || 'Localité'} ${vet.clinic ? '• ' + vet.clinic : ''}
            </p>
            <p style="margin: 0.25rem 0 0 0; color: #6b7280;">
              <i class="bi bi-telephone me-1"></i>${vet.phone}
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <button class="btn btn-primary-custom" onclick="bookAppointmentWithVet('${vet.id}', '${vet.name}')">
              <i class="bi bi-calendar-plus me-1"></i>Prendre RDV
            </button>
          </div>
        </div>
      </div>
    `;
  });

  vetsList.innerHTML = html;
  document.getElementById('statVets').textContent = vets.length;
}

// === LOAD PRODUCTS ===
function loadProducts() {
  const products = loadData(KEY_PRODUCTS);
  const productsList = document.getElementById('productsList');

  if (!products || products.length === 0) {
    productsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i class="bi bi-bag-heart"></i>
        </div>
        <p>Aucun produit disponible actuellement</p>
      </div>
    `;
    document.getElementById('statOrders').textContent = '0';
    return;
  }

  let html = '';
  products.forEach(product => {
    html += `
      <div class="product-item">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h5 style="margin: 0; color: var(--primary);">
              <i class="bi bi-bag-heart me-2"></i>${product.name}
            </h5>
            <p style="margin: 0.5rem 0 0 0; color: #6b7280;">
              ${product.description || 'Produit de qualité'}
            </p>
            <p style="margin: 0.25rem 0 0 0; color: var(--accent); font-weight: 600;">
              ${product.price || '0'} DH
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <button class="btn btn-primary-custom">
              <i class="bi bi-cart-plus me-1"></i>Ajouter au Panier
            </button>
          </div>
        </div>
      </div>
    `;
  });

  productsList.innerHTML = html;
}

// === FUNCTIONS FOR BUTTONS ===
function redirectToAppointmentBooking() {
  window.location.href = 'rdv.html';
}

function openAddPetModal() {
  window.location.href = 'pets.html';
}

function editPet(petId) {
  console.log('Edit pet:', petId);
  // Redirect to pets page with edit mode
  window.location.href = 'pets.html?edit=' + petId;
}

function deletePet(petId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet animal ?')) {
    const session = getSession();
    const clients = loadData(KEY_CLIENTS);
    const client = clients.find(c => c.id === session.id);
    
    if (client && client.pets) {
      client.pets = client.pets.filter(p => p.id !== petId);
      saveData(KEY_CLIENTS, clients);
      loadDashboardData();
    }
  }
}

function bookAppointmentWithVet(vetId, vetName) {
  // Store vet info in session and redirect to appointment booking
  localStorage.setItem('ph_selected_vet', JSON.stringify({ id: vetId, name: vetName }));
  window.location.href = 'rdv.html?vet=' + vetId;
}
