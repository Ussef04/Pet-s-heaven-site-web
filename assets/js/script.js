// Met l'année automatique dans le footer
document.addEventListener('DOMContentLoaded', function() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Ajouter les événements pour les boutons de la section héros
  setupHeroButtons();
});

// Petit effet d'apparition sur l'image d'accueil
window.addEventListener('load', function() {
  const img = document.querySelector('img');
  if (img) {
    img.style.opacity = 0;
    img.style.transition = 'opacity 1.5s ease';
    setTimeout(() => img.style.opacity = 1, 300);
  }
});
// === Helpers LocalStorage (démo) ===
const KEY_USERS = 'ph_users';         // liste d'utilisateurs [{name,email,password}]
const KEY_SESSION = 'ph_session';     // {name,email}

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(KEY_USERS) || '[]'); }
  catch { return []; }
}
function saveUsers(list) {
  localStorage.setItem(KEY_USERS, JSON.stringify(list));
}
function getSession() {
  try { return JSON.parse(localStorage.getItem(KEY_SESSION) || 'null'); }
  catch { return null; }
}
function setSession(sess) {
  if (sess) localStorage.setItem(KEY_SESSION, JSON.stringify(sess));
  else localStorage.removeItem(KEY_SESSION);
}

// === UI state navbar ===
function updateAuthUI() {
  const session = getSession();
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const accountMenu = document.getElementById('accountMenu');
  const helloUser = document.getElementById('helloUser');
  // Client links
  const discoverLink = document.getElementById('discoverLink');
  const productsLink = document.getElementById('productsLink');
  const rdvLink = document.getElementById('rdvLink');
  const mePetsLink = document.getElementById('mePetsLink');
  // Vet links
  const vetsLink = document.getElementById('vetsLink');
  const partnerLink = document.getElementById('partnerLink');

  if (!accountMenu) return;

  if (session) {
    if (btnLogin) btnLogin.classList.add('d-none');
    if (btnSignup) btnSignup.classList.add('d-none');
    accountMenu.classList.remove('d-none');
    if (helloUser) helloUser.textContent = `Bonjour, ${session.name || session.email}`;

    // Afficher/masquer les liens selon le type de compte
    const isVet = session.type === 'vet';
    
    // Client links
    if (discoverLink) discoverLink.classList.toggle('d-none', isVet);
    if (productsLink) productsLink.classList.toggle('d-none', isVet);
    if (rdvLink) rdvLink.classList.toggle('d-none', isVet);
    if (mePetsLink) mePetsLink.classList.toggle('d-none', isVet);
    
    // Vet links
    if (vetsLink) vetsLink.classList.toggle('d-none', !isVet);
    if (partnerLink) partnerLink.classList.toggle('d-none', !isVet);
    
    // Ajouter/retirer le lien candidatures pour les vétérinaires
    addVetSpecificMenuItems(isVet);
  } else {
    if (btnLogin) btnLogin.classList.remove('d-none');
    if (btnSignup) btnSignup.classList.remove('d-none');
    accountMenu.classList.add('d-none');
    
    // Afficher tous les liens quand pas connecté
    if (discoverLink) discoverLink.classList.remove('d-none');
    if (productsLink) productsLink.classList.remove('d-none');
    if (rdvLink) rdvLink.classList.remove('d-none');
    if (mePetsLink) mePetsLink.classList.remove('d-none');
    if (vetsLink) vetsLink.classList.remove('d-none');
    if (partnerLink) partnerLink.classList.remove('d-none');
  }
}

/**
 * Ajoute/retire les éléments du menu spécifiques aux vétérinaires
 */
function addVetSpecificMenuItems(isVet) {
  const dropdownMenu = document.querySelector('#accountMenu .dropdown-menu');
  if (!dropdownMenu) return;

  // Vérifier si les liens spécifiques aux vétérinaires existent déjà
  const existingCandidaturesLink = document.getElementById('menuCandidatures');
  const existingDashboardLink = document.getElementById('menuVetDashboard');
  
  if (isVet) {
    // Ajouter le lien tableau de bord vétérinaire s'il n'existe pas
    if (!existingDashboardLink) {
      const dividers = dropdownMenu.querySelectorAll('hr');
      const lastDivider = dividers[dividers.length - 1];
      const liBeforeDivider = lastDivider.parentElement;
      
      const liDashboard = document.createElement('li');
      liDashboard.innerHTML = `<a class="dropdown-item dropdown-item-premium" href="vet-dashboard.html" id="menuVetDashboard" style="padding: 10px 16px; color: #374151; transition: all 0.3s ease;"><i class="bi bi-speedometer2 me-2" style="color: #8b5cf6; font-weight: 700;"></i>Tableau de Bord</a>`;
      liBeforeDivider.parentElement.insertBefore(liDashboard, liBeforeDivider);
    }
    
    // Ajouter le lien candidatures s'il n'existe pas
    if (!existingCandidaturesLink) {
      const dividers = dropdownMenu.querySelectorAll('hr');
      const lastDivider = dividers[dividers.length - 1];
      const liBeforeDivider = lastDivider.parentElement;
      
      const li = document.createElement('li');
      li.innerHTML = `<a class="dropdown-item dropdown-item-premium" href="#candidaturesSection" id="menuCandidatures" style="padding: 10px 16px; color: #374151; transition: all 0.3s ease; cursor: pointer;" onclick="scrollToCandidatures(event)"><i class="bi bi-file-earmark-check me-2" style="color: #8b5cf6; font-weight: 700;"></i>Nos Partenaires</a>`;
      liBeforeDivider.parentElement.insertBefore(li, liBeforeDivider);
    }
  } else {
    // Retirer les liens spécifiques aux vétérinaires si c'est un client
    if (existingCandidaturesLink) {
      existingCandidaturesLink.parentElement.remove();
    }
    if (existingDashboardLink) {
      existingDashboardLink.parentElement.remove();
    }
  }
}

// === DOM Ready ===
document.addEventListener('DOMContentLoaded', () => {
  // Année footer auto
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Effet image d’accueil (optionnel)
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    heroImg.style.opacity = 0;
    heroImg.style.transition = 'opacity 1s ease';
    setTimeout(() => heroImg.style.opacity = 1, 200);
  }

  updateAuthUI();

  // Signup
  const signupForm = document.getElementById('signupForm');
  const signupError = document.getElementById('signupError');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim().toLowerCase();
      const password = document.getElementById('signupPassword').value;
      const accountType = document.querySelector('input[name="accountType"]:checked').value || 'client';

      const users = loadUsers();
      if (users.some(u => u.email === email)) {
        if (signupError) signupError.classList.remove('d-none');
        return;
      }
      users.push({ name, email, password, type: accountType });
      saveUsers(users);
      setSession({ name, email, type: accountType });

      // Fermer modale
      const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal')) || new bootstrap.Modal('#signupModal');
      modal.hide();
      updateAuthUI();
    });
  }

  // Login
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;

      const users = loadUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        if (loginError) loginError.classList.remove('d-none');
        return;
      }
      const userType = user.type || 'client';
      setSession({ name: user.name, email: user.email, type: userType });

      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal')) || new bootstrap.Modal('#loginModal');
      modal.hide();
      updateAuthUI();
      
      // Redirection selon le type de compte
      setTimeout(() => {
        if (userType === 'vet') {
          window.location.href = 'vet-dashboard.html';
        } else {
          window.location.href = 'index.html';
        }
      }, 500);
    });
  }

  // Logout
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      setSession(null);
      updateAuthUI();
      window.location.href = 'home.html';
    });
  }

  // ===== SUBSCRIPTION PLANS =====
  const subButtons = document.querySelectorAll('.sub-btn');
  const toastEl = document.getElementById('subToast');
  const subName = document.getElementById('subName');
  const paymentModal = document.getElementById('paymentModal');
  
  if (toastEl && paymentModal) {
    const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
    const paymentBootstrapModal = new bootstrap.Modal(paymentModal);

    subButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const plan = this.getAttribute('data-plan') || 'Plus';
        const planPrices = {
          'Découverte': '0',
          'Plus': '100',
          'Pro': '200'
        };
        const planDescs = {
          'Découverte': 'Plan gratuit',
          'Plus': '12% de réduction',
          'Pro': '20% de réduction'
        };

        // Stocker le plan sélectionné
        localStorage.setItem('ph_subscription_plan', plan);

        // Si le plan est gratuit (Découverte), pas besoin de paiement
        if (planPrices[plan] === '0') {
          // Sauvegarder directement l'abonnement gratuit
          localStorage.setItem('ph_subscription_active', JSON.stringify({
            plan: plan,
            method: 'free',
            date: new Date().toISOString()
          }));

          // Afficher le toast de succès
          document.getElementById('subName').textContent = plan;
          const toast = new bootstrap.Toast(document.getElementById('subToast'), { delay: 4000 });
          toast.show();

          return; // Pas d'ouverture de modal pour le plan gratuit
        }

        // Pour les plans payants, ouvrir la modal de paiement
        // Mettre à jour les infos de paiement
        document.getElementById('paymentPlanName').textContent = plan;
        document.getElementById('paymentAmount').textContent = planPrices[plan] || '0';
        document.getElementById('paymentPlanDesc').textContent = planDescs[plan] || '';
        
        // Réinitialiser la sélection de paiement
        document.querySelectorAll('.payment-method').forEach(m => {
          m.style.borderColor = '#e5e7eb';
          m.style.borderWidth = '2px';
        });
        document.getElementById('paymentFormContainer').innerHTML = '';
        document.getElementById('agreeTerms').checked = false;
        document.getElementById('confirmPaymentBtn').disabled = true;
        
        // Ouvrir la modal de paiement
        paymentBootstrapModal.show();
      });
    });

    // Gestion des modes de paiement
    document.querySelectorAll('.payment-method').forEach(method => {
      method.addEventListener('click', function() {
        // Désélectionner les autres
        document.querySelectorAll('.payment-method').forEach(m => {
          m.style.borderColor = '#e5e7eb';
          m.style.borderWidth = '2px';
        });
        
        // Sélectionner celui-ci
        this.style.borderColor = '#4f46e5';
        this.style.borderWidth = '3px';
        
        const method = this.getAttribute('data-method');
        const container = document.getElementById('paymentFormContainer');
        
        // Afficher le formulaire approprié
        if (method === 'card') {
          container.innerHTML = `
            <div class="mb-3">
              <label class="form-label">Numéro de carte</label>
              <input type="text" class="form-control" placeholder="1234 5678 9012 3456" maxlength="19">
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Date d'expiration</label>
                <input type="text" class="form-control" placeholder="MM/YY" maxlength="5">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">CVC</label>
                <input type="text" class="form-control" placeholder="123" maxlength="3">
              </div>
            </div>
          `;
        } else if (method === 'mobile') {
          container.innerHTML = `
            <div class="mb-3">
              <label class="form-label">Opérateur</label>
              <select class="form-select">
                <option selected>Maroc Telecom</option>
                <option>Orange Maroc</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Numéro de téléphone</label>
              <input type="tel" class="form-control" placeholder="+212 6XX XXX XXX">
            </div>
          `;
        } else if (method === 'transfer') {
          container.innerHTML = `
            <div class="alert alert-info small">
              <strong>Informations bancaires:</strong><br>
              IBAN: MA64 ... (À envoyer par email)
            </div>
            <div class="mb-3">
              <label class="form-label">Référence de virement</label>
              <input type="text" class="form-control" placeholder="Votre numéro de client">
            </div>
          `;
        } else if (method === 'cash') {
          container.innerHTML = `
            <div class="alert alert-info">
              <i class="bi bi-info-circle me-2"></i>
              Le paiement en espèces se fera à la livraison de votre première commande.
            </div>
          `;
        }
        
        // Activer le bouton de confirmation
        document.getElementById('confirmPaymentBtn').disabled = false;
      });
    });

    // Confirmation du paiement
    document.getElementById('confirmPaymentBtn').addEventListener('click', function() {
      const plan = localStorage.getItem('ph_subscription_plan') || 'Plus';
      const method = document.querySelector('.payment-method[style*="rgb(79, 70, 229)"]');
      
      if (!method) {
        alert('Veuillez choisir un mode de paiement');
        return;
      }
      
      const methodName = method.getAttribute('data-method');
      
      // Simuler le traitement du paiement
      this.disabled = true;
      this.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Traitement...';
      
      setTimeout(() => {
        // Sauvegarder l'abonnement
        localStorage.setItem('ph_subscription_active', JSON.stringify({
          plan: plan,
          method: methodName,
          date: new Date().toISOString()
        }));
        
        // Fermer la modal
        paymentBootstrapModal.hide();
        
        // Afficher un message de succès
        const successDiv = document.createElement('div');
        successDiv.className = 'position-fixed top-50 start-50 translate-middle';
        successDiv.style.zIndex = '9999';
        successDiv.innerHTML = `
          <div class="card border-0 rounded-3 shadow-lg" style="width: 400px;">
            <div class="card-body text-center py-5">
              <div style="font-size: 3rem; margin-bottom: 20px;">✨</div>
              <h5 class="card-title fw-bold">Paiement confirmé!</h5>
              <p class="text-muted mb-0">Votre abonnement <strong>${plan}</strong> est maintenant actif.</p>
              <p class="text-muted small mt-3">Un email de confirmation a été envoyé.</p>
              <button class="btn btn-primary mt-4" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
        `;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
          successDiv.querySelector('button').addEventListener('click', () => {
            successDiv.remove();
            location.reload();
          });
        }, 100);
        
        // Réinitialiser le bouton
        setTimeout(() => {
          this.disabled = false;
          this.innerHTML = 'Confirmer le paiement';
        }, 2000);
      }, 1500);
    });
  }
  
  // Créer des confettis simples
  function createConfetti() {
    const colors = ['#4f46e5', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'];
    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      confetti.style.animation = `fall ${2 + Math.random() * 1}s linear forwards`;
      
      // Ajouter l'animation
      if (!document.querySelector('style[data-confetti]')) {
        const style = document.createElement('style');
        style.setAttribute('data-confetti', 'true');
        style.textContent = `
          @keyframes fall {
            to {
              transform: translateY(${window.innerHeight + 20}px) rotate(360deg);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  // Réinitialiser messages d'erreur au focus
  document.querySelectorAll('.form-control, .form-select').forEach(input => {
    input.addEventListener('focus', function() {
      const errorMsg = this.closest('.mb-3')?.querySelector('.text-danger');
      if (errorMsg) errorMsg.classList.add('d-none');
    });
  });
});

// ===== Fonctions utilitaires =====
function showErrorMessage(errorEl, message) {
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('d-none');
    errorEl.style.animation = 'fadeInUp 0.3s ease';
  }
}

function showSuccessMessage(message) {
  // Créer un toast de succès temporaire
  const toast = document.createElement('div');
  toast.className = 'position-fixed bottom-0 end-0 m-3 p-3';
  toast.style.zIndex = '2000';
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

// ===== Setup Hero Buttons =====
function setupHeroButtons() {
  // Bouton "En savoir plus" dans la section héros
  const learnButton = document.getElementById('heroLearnMore');
  if (learnButton) {
    learnButton.addEventListener('click', function() {
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Animation des compteurs de statistiques
  animateCounters();
}

// ===== Animate Statistics Counters =====
function animateCounters() {
  const counterElements = document.querySelectorAll('.stat-counter');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.animated) {
        entry.target.animated = true;
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        const duration = 2000; // 2 secondes
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            entry.target.textContent = target;
            clearInterval(counter);
          } else {
            entry.target.textContent = Math.floor(current);
          }
        }, 16);
      }
    });
  }, observerOptions);

  counterElements.forEach(el => {
    observer.observe(el);
  });
}

// ===== Smooth scroll pour les liens d'ancrage =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Newsletter Handler =====
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = form.querySelector('input[type="email"]').value;
    const name = form.querySelector('input[type="text"]').value;
    const checkbox = document.getElementById('agreeNewsletter').checked;
    
    if (!checkbox) {
      alert('Veuillez accepter de recevoir nos emails');
      return;
    }

    // Save to localStorage
    let subscribers = JSON.parse(localStorage.getItem('ph_subscribers') || '[]');
    const subscriber = { name, email, date: new Date().toISOString() };
    
    if (!subscribers.find(s => s.email === email)) {
      subscribers.push(subscriber);
      localStorage.setItem('ph_subscribers', JSON.stringify(subscribers));
    }

    // Show success message
    form.style.display = 'none';
    document.getElementById('newsletterSuccess').classList.remove('d-none');
    
    // Reset after 3 seconds
    setTimeout(() => {
      form.reset();
      form.style.display = 'flex';
      document.getElementById('newsletterSuccess').classList.add('d-none');
    }, 3000);
  });
});

// ===== FAQ Toggle Handler =====
document.addEventListener('DOMContentLoaded', function() {
  const faqButtons = document.querySelectorAll('.faq-button');
  
  faqButtons.forEach(button => {
    button.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('.bi-chevron-down');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-content').forEach(item => {
        if (item !== content) {
          item.classList.add('d-none');
          const otherIcon = item.previousElementSibling.querySelector('.bi-chevron-down');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });
      
      // Toggle current FAQ
      content.classList.toggle('d-none');
      
      // Animate icon
      if (content.classList.contains('d-none')) {
        icon.style.transform = 'rotate(0deg)';
      } else {
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
});

// === Scroll vers la section Candidatures/Partenaires ===
function scrollToCandidatures(event) {
  event.preventDefault();
  const section = document.getElementById('candidaturesSection');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

