// ========================================
// PET'S HEAVEN - APP.JS
// Application principale
// ========================================

// ========== STATE MANAGEMENT ==========
const appState = {
  currentUser: null,
  theme: 'light',
  subscription: null,
  notifications: []
};

// ========== INITIALIZE APP ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('🐾 Pet\'s Heaven app initialized!');
  initAuth();
  setupEventListeners();
  loadUserData();
});

// ========== AUTHENTICATION ==========
function initAuth() {
  const savedUser = localStorage.getItem('ph_user');
  const sessionToken = localStorage.getItem('ph_session');
  
  if (savedUser && sessionToken) {
    appState.currentUser = JSON.parse(savedUser);
    updateNavbarAuth();
  }
}

function setupEventListeners() {
  // Login Form
  const loginForm = document.getElementById('loginModal')?.querySelector('form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Signup Form
  const signupForm = document.getElementById('signupModal')?.querySelector('form');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  // Modal Switch
  document.addEventListener('click', function(e) {
    if (e.target.textContent.includes('S\'inscrire') || e.target.textContent.includes('Pas encore inscrit')) {
      hideModal('loginModal');
      showModal('signupModal');
    }
    if (e.target.textContent.includes('Se connecter') || e.target.textContent.includes('Déjà inscrit')) {
      hideModal('signupModal');
      showModal('loginModal');
    }
  });
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail')?.value;
  const password = document.getElementById('loginPassword')?.value;

  if (email && password) {
    const user = {
      id: Date.now(),
      email: email,
      name: email.split('@')[0],
      joinDate: new Date().toLocaleDateString('fr-FR')
    };

    localStorage.setItem('ph_user', JSON.stringify(user));
    localStorage.setItem('ph_session', 'token_' + Date.now());
    
    appState.currentUser = user;
    updateNavbarAuth();
    showNotification('✅ Connecté avec succès!', 'success');
    hideModal('loginModal');
  }
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signupName')?.value;
  const email = document.getElementById('signupEmail')?.value;
  const password = document.getElementById('signupPassword')?.value;

  if (name && email && password) {
    const user = {
      id: Date.now(),
      name: name,
      email: email,
      joinDate: new Date().toLocaleDateString('fr-FR'),
      subscription: 'Découverte'
    };

    localStorage.setItem('ph_user', JSON.stringify(user));
    localStorage.setItem('ph_session', 'token_' + Date.now());
    
    appState.currentUser = user;
    updateNavbarAuth();
    showNotification('🎉 Bienvenue dans Pet\'s Heaven!', 'success');
    hideModal('signupModal');
  }
}

function updateNavbarAuth() {
  // À implémenter selon structure de navbar
}

function switchModal() {
  // Fonction pour switcher entre login et signup
}

// ========== MODAL HELPERS ==========
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    new bootstrap.Modal(modal).show();
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    const bsModal = bootstrap.Modal.getInstance(modal);
    if (bsModal) bsModal.hide();
  }
}

// ========== NOTIFICATIONS ==========
function showNotification(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
  alertDiv.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(alertDiv);

  setTimeout(() => alertDiv.remove(), 4000);
}

// ========== DATA MANAGEMENT ==========
function loadUserData() {
  const user = localStorage.getItem('ph_user');
  if (user) {
    appState.currentUser = JSON.parse(user);
  }
}

function saveUserData() {
  if (appState.currentUser) {
    localStorage.setItem('ph_user', JSON.stringify(appState.currentUser));
  }
}

// ========== UTILITIES ==========
function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatCurrency(amount) {
  return amount.toLocaleString('fr-FR') + ' MAD';
}

// Export for other modules
window.appState = appState;
window.showNotification = showNotification;
window.showModal = showModal;
window.hideModal = hideModal;
window.formatDate = formatDate;
window.formatCurrency = formatCurrency;
