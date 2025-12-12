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
  }
  // Les vétérinaires ne sont plus supportés
}

function openSignupChoice() {
  // Appel direct à la modale d'inscription client
  const signupClientModal = new bootstrap.Modal('#signupClientModal');
  signupClientModal.show();
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
  // Setup hero buttons
  const signupBtnHero = document.getElementById('signupBtnHero');
  const exploreBtnHero = document.getElementById('exploreBtnHero');
  const signupClientChoiceBtn = document.getElementById('signupClientChoiceBtn');
  
  if (signupBtnHero) {
    signupBtnHero.addEventListener('click', () => {
      const clientModal = new bootstrap.Modal('#signupClientModal');
      clientModal.show();
    });
    
    // Add hover effect
    signupBtnHero.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 12px 32px rgba(245, 158, 11, 0.5)';
    });
    
    signupBtnHero.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.4)';
    });
  }
  
  if (exploreBtnHero) {
    exploreBtnHero.addEventListener('click', () => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    });
    
    // Add hover effect
    exploreBtnHero.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(255, 255, 255, 0.2)';
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 12px 32px rgba(255, 255, 255, 0.3)';
    });
    
    exploreBtnHero.addEventListener('mouseleave', function() {
      this.style.background = 'transparent';
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  }
  
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

// === ADVANCED SCROLL ANIMATIONS === 
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.animation = `slideInUp 0.8s ease-out ${index * 0.1}s forwards`;
      
      // Add stagger animation to children
      const children = entry.target.querySelectorAll('[class*="card"]');
      children.forEach((child, childIndex) => {
        child.style.animation = `fadeInScale 0.6s ease-out ${(index * 0.1) + (childIndex * 0.05)}s forwards`;
      });
      
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all interactive elements when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.feature-card, .role-card, .card, section');
  cards.forEach((card) => {
    card.style.opacity = '0';
    scrollObserver.observe(card);
  });

  // Add smooth scroll behavior for buttons
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// === PARALLAX & SCROLL EFFECTS ===
let scrollProgress = 0;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const hero = document.querySelector('[style*="background-image"]');
  if (hero) {
    const scrollPosition = window.scrollY;
    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  }

  // Update scroll progress
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress = (window.scrollY / docHeight) * 100;
  lastScrollY = window.scrollY;

  // Add scroll animation to buttons
  document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary').forEach(btn => {
    if (lastScrollY > 100) {
      btn.style.transform = 'scale(1)';
    }
  });
});

// === BUTTON INTERACTION EFFECTS ===
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });

    button.addEventListener('click', function(e) {
      // Create ripple effect
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'scale-ripple 0.6s ease-out';
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// === AUTO-REDIRECT IF ALREADY LOGGED IN ===
// (Merged into main DOMContentLoaded above)


