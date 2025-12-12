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
  if (userType === 'client') {
    window.location.href = 'index.html';
  } else if (userType === 'vet') {
    window.location.href = 'vet-dashboard.html';
  }
}

// === DOM READY ===
document.addEventListener('DOMContentLoaded', () => {
  // Update year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Setup event listeners
  setupLoginForm();
  setupSignupClientForm();
  setupSignupVetForm();
  setupHeroButtons();
});

// === HERO BUTTONS ===
function setupHeroButtons() {
  const heroLoginBtn = document.getElementById('heroLogin');
  const heroSignupBtn = document.getElementById('heroSignup');

  if (heroLoginBtn) {
    heroLoginBtn.addEventListener('click', () => {
      const loginModal = new bootstrap.Modal('#loginModal');
      loginModal.show();
    });
  }

  if (heroSignupBtn) {
    heroSignupBtn.addEventListener('click', () => {
      const signupClientModal = new bootstrap.Modal('#signupClientModal');
      signupClientModal.show();
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

    showMessage('signupClientSuccess', 'Compte créé avec succès ! Redirection en cours...', 'success');
    
    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance('#signupClientModal');
      modal.hide();
      redirectUser('client');
    }, 1500);
  });
}

// === SIGNUP VET FORM ===
function setupSignupVetForm() {
  const signupForm = document.getElementById('signupVetForm');
  if (!signupForm) return;

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('signupVetName').value.trim();
    const email = document.getElementById('signupVetEmail').value.trim().toLowerCase();
    const phone = document.getElementById('signupVetPhone').value.trim();
    const specialty = document.getElementById('signupVetSpecialty').value;
    const city = document.getElementById('signupVetCity').value.trim();
    const clinic = document.getElementById('signupVetClinic').value.trim();
    const license = document.getElementById('signupVetLicense').value.trim();
    const password = document.getElementById('signupVetPassword').value;
    const passwordConfirm = document.getElementById('signupVetPasswordConfirm').value;
    const terms = document.getElementById('signupVetTerms').checked;

    hideMessage('signupVetError');
    hideMessage('signupVetSuccess');

    // Validation
    if (!terms) {
      showMessage('signupVetError', 'Vous devez accepter les conditions d\'utilisation', 'danger');
      return;
    }

    if (password !== passwordConfirm) {
      showMessage('signupVetError', 'Les mots de passe ne correspondent pas', 'danger');
      return;
    }

    // Check if email exists
    const vets = loadData(KEY_VETS);
    if (vets.some(v => v.email === email)) {
      showMessage('signupVetError', 'Cet email est déjà utilisé', 'danger');
      return;
    }

    // Check if license is unique
    if (vets.some(v => v.license === license)) {
      showMessage('signupVetError', 'Ce numéro de licence est déjà enregistré', 'danger');
      return;
    }

    // Create new vet
    const newVet = {
      id: Date.now().toString(),
      type: 'vet',
      name,
      email,
      phone,
      specialty,
      city,
      clinic,
      license,
      password,
      createdAt: new Date().toISOString(),
      availability: [],
      appointments: [],
      verified: false
    };

    vets.push(newVet);
    saveData(KEY_VETS, vets);

    // Set session and redirect
    setSession({
      type: 'vet',
      id: newVet.id,
      name: newVet.name,
      email: newVet.email,
      specialty: newVet.specialty,
      clinic: newVet.clinic
    });

    showMessage('signupVetSuccess', 'Compte créé avec succès ! Redirection en cours...', 'success');
    
    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance('#signupVetModal');
      modal.hide();
      redirectUser('vet');
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
document.addEventListener('DOMContentLoaded', () => {
  const session = getSession();
  if (session) {
    if (session.type === 'client') {
      redirectUser('client');
    } else if (session.type === 'vet') {
      redirectUser('vet');
    }
  }
});

