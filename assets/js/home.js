// === CONSTANTS ===
const KEY_USERS = 'ph_users';
const KEY_SESSION = 'ph_session';
const KEY_CLIENTS = 'ph_clients';
const KEY_VETS = 'ph_vets';

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

function setSession(session) {
  if (session) {
    localStorage.setItem(KEY_SESSION, JSON.stringify(session));
  } else {
    localStorage.removeItem(KEY_SESSION);
  }
}

function showMessage(elementId, message, type = 'danger') {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.classList.remove('d-none');
    element.classList.add(`alert-${type}-custom`);
  }
}

function hideMessage(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add('d-none');
  }
}

function redirectUser(userType) {
  console.log('Redirection vers:', userType);
  if (userType === 'client') {
    console.log('Session client confirmée, redirection vers index.html');
    window.location.href = 'index.html';
  } else if (userType === 'vet') {
    console.log('Session vet confirmée, redirection vers vet-dashboard.html');
    window.location.href = 'vet-dashboard.html';
  }
}

function openSignupChoice() {
  // Fermer tout modal ouvert
  const openModals = document.querySelectorAll('.modal.show');
  openModals.forEach(modal => {
    const instance = bootstrap.Modal.getInstance(modal);
    if (instance) instance.hide();
  });
  
  // Ouvrir le modal de choix après un court délai
  setTimeout(() => {
    const choiceModal = new bootstrap.Modal('#signupChoiceModal');
    choiceModal.show();
  }, 300);
}

// === DOM READY ===
document.addEventListener('DOMContentLoaded', () => {
  // Update year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Setup event listeners
  setupLoginForm();
  setupSignupClientForm();
  setupHeroButtons();

  // Auto-redirect if already logged in (only if on home page, not on signup/login)
  const session = getSession();
  if (session && session.type) {
    console.log('Session trouvée:', session.type);
    // Add a small delay to ensure all modals are closed
    setTimeout(() => {
      if (session.type === 'client') {
        redirectUser('client');
      } else if (session.type === 'vet') {
        redirectUser('vet');
      }
    }, 100);
  }
});

// === HERO BUTTONS ===
function setupHeroButtons() {
  // Setup choice modal buttons
  const signupClientChoiceBtn = document.getElementById('signupClientChoiceBtn');
  
  if (signupClientChoiceBtn) {
    signupClientChoiceBtn.addEventListener('click', () => {
      const choiceModal = bootstrap.Modal.getInstance('#signupChoiceModal');
      if (choiceModal) choiceModal.hide();
      setTimeout(() => {
        const clientModal = new bootstrap.Modal('#signupClientModal');
        clientModal.show();
      }, 300);
    });
  }
}

// === LOGIN FORM ===
function setupLoginForm() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const loginError = document.getElementById('loginError');

    hideMessage('loginError');

    // Check in clients
    const clients = loadData(KEY_CLIENTS);
    const clientMatch = clients.find(c => c.email === email && c.password === password);
    if (clientMatch) {
      setSession({
        type: 'client',
        id: clientMatch.id,
        name: clientMatch.name,
        email: clientMatch.email
      });
      const modal = bootstrap.Modal.getInstance('#loginModal');
      modal.hide();
      redirectUser('client');
      return;
    }

    // Check in vets
    const vets = loadData(KEY_VETS);
    const vetMatch = vets.find(v => v.email === email && v.password === password);
    if (vetMatch) {
      setSession({
        type: 'vet',
        id: vetMatch.id,
        name: vetMatch.name,
        email: vetMatch.email,
        specialty: vetMatch.specialty,
        clinic: vetMatch.clinic
      });
      const modal = bootstrap.Modal.getInstance('#loginModal');
      modal.hide();
      redirectUser('vet');
      return;
    }

    // No match found
    showMessage('loginError', 'Email ou mot de passe incorrect', 'danger');
  });
}

// === SIGNUP CLIENT FORM ===
function setupSignupClientForm() {
  const signupForm = document.getElementById('signupClientForm');
  if (!signupForm) return;

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('signupClientName').value.trim();
    const email = document.getElementById('signupClientEmail').value.trim().toLowerCase();
    const phone = document.getElementById('signupClientPhone').value.trim();
    const password = document.getElementById('signupClientPassword').value;
    const passwordConfirm = document.getElementById('signupClientPasswordConfirm').value;
    const terms = document.getElementById('signupClientTerms').checked;

    hideMessage('signupClientError');
    hideMessage('signupClientSuccess');

    // Validation
    if (!terms) {
      showMessage('signupClientError', 'Vous devez accepter les conditions d\'utilisation', 'danger');
      return;
    }

    if (password !== passwordConfirm) {
      showMessage('signupClientError', 'Les mots de passe ne correspondent pas', 'danger');
      return;
    }

    // Check if email exists
    const clients = loadData(KEY_CLIENTS);
    if (clients.some(c => c.email === email)) {
      showMessage('signupClientError', 'Cet email est déjà utilisé', 'danger');
      return;
    }

    // Create new client
    const newClient = {
      id: Date.now().toString(),
      type: 'client',
      name,
      email,
      phone,
      password,
      createdAt: new Date().toISOString(),
      pets: [],
      appointments: []
    };

    clients.push(newClient);
    saveData(KEY_CLIENTS, clients);

    // Set session and redirect
    setSession({
      type: 'client',
      id: newClient.id,
      name: newClient.name,
      email: newClient.email
    });

    console.log('Compte client créé et session définie:', getSession());
    showMessage('signupClientSuccess', 'Compte créé avec succès ! Redirection en cours...', 'success');
    
    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance('#signupClientModal');
      if (modal) modal.hide();
      
      // Force redirect after a brief delay to ensure modal closes
      setTimeout(() => {
        redirectUser('client');
      }, 300);
    }, 1500);
  });
}

// === Carousel des Partenaires ===
function scrollCarousel(direction) {
  const container = document.getElementById('partnersContainer');
  if (!container) return;

  const scrollAmount = 320; // Largeur d'une carte + espacement
  const currentScroll = container.scrollLeft;
  
  if (direction === 'left') {
    container.scrollTo({
      left: Math.max(0, currentScroll - scrollAmount),
      behavior: 'smooth'
    });
  } else if (direction === 'right') {
    container.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  }
}

// === AUTO-REDIRECT IF ALREADY LOGGED IN ===
// (Merged into main DOMContentLoaded above)


