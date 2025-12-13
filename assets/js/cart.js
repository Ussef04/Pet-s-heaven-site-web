// Gestion du Panier — cart.html

let cart = JSON.parse(localStorage.getItem('ph_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderCartItems();
  updatePricing();
  setupEventListeners();
});

function renderCartItems() {
  const container = document.getElementById('cartItemsContainer');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div style="font-size: 4rem; margin-bottom: 20px;">🛒</div>
        <h4 class="mb-2">Votre panier est vide</h4>
        <p class="text-muted mb-4">Ajoutez des produits pour commencer vos achats</p>
        <a href="products.html" class="btn btn-primary">
          <i class="bi bi-arrow-left me-2"></i>Retour aux Produits
        </a>
      </div>
    `;
    document.getElementById('checkoutBtn').disabled = true;
    return;
  }

  container.innerHTML = cart.map((item, idx) => `
    <div class="cart-item mb-3" style="animation: slideInLeft 0.4s ease ${idx * 0.1}s both;">
      <div class="d-flex justify-content-between align-items-start">
        <div class="flex-grow-1">
          <h6 class="fw-bold mb-1">${item.name}</h6>
          <div class="d-flex align-items-center gap-3">
            <small class="text-muted">
              <i class="bi bi-tag me-1"></i>
              <span id="price-${item.id}" class="fw-500">${item.price}</span> DH
            </small>
            <div class="input-group input-group-sm" style="width: 120px;">
              <button class="btn btn-outline-secondary" onclick="decreaseQty('${item.id}')">
                <i class="bi bi-dash"></i>
              </button>
              <input type="number" class="form-control text-center" id="qty-${item.id}" value="${item.quantity || 1}" readonly>
              <button class="btn btn-outline-secondary" onclick="increaseQty('${item.id}')">
                <i class="bi bi-plus"></i>
              </button>
            </div>
            <strong style="color: #4f46e5; font-size: 1.1rem;">
              <span id="subtotal-${item.id}">${(item.price * (item.quantity || 1)).toFixed(2)}</span> DH
            </strong>
          </div>
        </div>
        <button type="button" class="btn-remove" onclick="removeFromCart('${item.id}')">
          <i class="bi bi-trash3 fs-5"></i>
        </button>
      </div>
    </div>
  `).join('');

  document.getElementById('checkoutBtn').disabled = false;
}

function increaseQty(itemId) {
  const item = cart.find(p => p.id == itemId);
  if (item) {
    item.quantity = (item.quantity || 1) + 1;
    updateCart();
  }
}

function decreaseQty(itemId) {
  const item = cart.find(p => p.id == itemId);
  if (item && (item.quantity || 1) > 1) {
    item.quantity = (item.quantity || 1) - 1;
    updateCart();
  }
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id != itemId);
  localStorage.setItem('ph_cart', JSON.stringify(cart));
  renderCartItems();
  updatePricing();
  
  // Animation toast de suppression
  const toast = document.createElement('div');
  toast.className = 'position-fixed bottom-0 start-50 translate-middle-x mb-3';
  toast.style.zIndex = '2000';
  toast.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show" style="border-radius: 10px; box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3); border: none;">
      <i class="bi bi-trash3 me-2"></i>Article supprimé du panier
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function updateCart() {
  localStorage.setItem('ph_cart', JSON.stringify(cart));
  renderCartItems();
  updatePricing();
}

function updatePricing() {
  // Calculer le sous-total
  let subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  
  // Calculer les frais de livraison
  const shippingMethod = document.querySelector('input[name="shippingMethod"]:checked')?.value || 'standard';
  let shippingCost = 0;
  
  // Vérifier si l'utilisateur est abonné
  const user = JSON.parse(localStorage.getItem('ph_user'));
  const subscription = JSON.parse(localStorage.getItem('ph_subscription'));
  const isSubscribed = user && subscription && subscription.userId === user.email;
  
  if (shippingMethod === 'express') {
    shippingCost = 100;
  } else if (shippingMethod === 'subscribed') {
    // Livraison gratuite pour les abonnés
    if (isSubscribed) {
      shippingCost = 0;
    } else {
      // Si non abonné, afficher un message et revenir à la standard
      alert('Vous devez être abonné pour bénéficier de cette livraison gratuite.');
      document.getElementById('standardShipping').checked = true;
      shippingCost = subtotal < 500 ? 50 : 0;
    }
  } else if (subtotal < 500) {
    shippingCost = 50;
  }
  
  // Total
  const total = subtotal + shippingCost;
  
  // Mettre à jour l'affichage
  document.getElementById('itemCount').textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.getElementById('subtotal').textContent = subtotal.toFixed(2) + ' DH';
  document.getElementById('shippingCost').textContent = shippingCost.toFixed(2) + ' DH';
  document.getElementById('totalPrice').textContent = total.toFixed(2) + ' DH';
  
  // Message de livraison gratuite si abonné
  const freeShippingMsg = document.getElementById('freeShippingMsg');
  if (freeShippingMsg && isSubscribed) {
    freeShippingMsg.innerHTML = '✓ <strong>Livraison gratuite!</strong> Merci pour votre abonnement';
    freeShippingMsg.style.display = 'block';
  } else if (freeShippingMsg) {
    freeShippingMsg.style.display = 'none';
  }
}

function setupEventListeners() {
  // Changement du mode de livraison
  document.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
    radio.addEventListener('change', () => {
      updatePricing();
      
      // Animation du changement
      const label = radio.closest('.form-check');
      label.style.borderColor = '#4f46e5';
      label.style.backgroundColor = 'rgba(79, 70, 229, 0.05)';
      
      setTimeout(() => {
        label.style.borderColor = '#e5e7eb';
        label.style.backgroundColor = 'transparent';
      }, 300);
    });
  });

  // Changement du mode de paiement
  document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', function() {
      // Animation du changement
      const label = this.closest('.form-check');
      label.style.borderColor = '#8b5cf6';
      label.style.backgroundColor = 'rgba(139, 92, 246, 0.05)';
      
      setTimeout(() => {
        label.style.borderColor = '#e5e7eb';
        label.style.backgroundColor = 'transparent';
      }, 300);
    });
  });

  // Bouton de validation
  document.getElementById('checkoutBtn').addEventListener('click', validateAndSubmit);

  // Validation au changement des inputs
  ['fullName', 'phone', 'address', 'city', 'postalCode'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('input', () => {
        field.classList.remove('is-invalid');
      });
    }
  });

  // Format du numéro de carte
  const cardNumberInput = document.getElementById('cardNumber');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '');
      let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
      e.target.value = formattedValue;
    });
  }

  // Format de la date d'expiration
  const cardExpiryInput = document.getElementById('cardExpiry');
  if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      e.target.value = value;
    });
  }

  // Format du CVV
  const cardCVVInput = document.getElementById('cardCVV');
  if (cardCVVInput) {
    cardCVVInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  }
}

function validateAndSubmit() {
  // Vérifier l'authentification
  const user = JSON.parse(localStorage.getItem('ph_user'));
  if (!user) {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
    return;
  }

  // Valider les champs
  const fields = {
    fullName: document.getElementById('fullName'),
    phone: document.getElementById('phone'),
    address: document.getElementById('address'),
    city: document.getElementById('city'),
    postalCode: document.getElementById('postalCode')
  };

  let isValid = true;
  Object.values(fields).forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      isValid = false;
    }
  });

  if (!isValid) {
    alert('Veuillez remplir tous les champs obligatoires');
    return;
  }

  // Valider le téléphone (format basique)
  const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
  if (!phoneRegex.test(fields.phone.value)) {
    fields.phone.classList.add('is-invalid');
    alert('Veuillez entrer un numéro de téléphone valide');
    return;
  }

  // Valider le paiement si par carte
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  if (paymentMethod === 'card') {
    const cardValidation = validateCardPayment();
    if (!cardValidation.valid) {
      alert(cardValidation.message);
      return;
    }
  }

  // Collecter les données de commande
  const order = {
    id: 'CMD-' + Date.now(),
    date: new Date().toLocaleDateString('fr-FR'),
    time: new Date().toLocaleTimeString('fr-FR'),
    customer: {
      name: fields.fullName.value,
      phone: fields.phone.value,
      email: user.email,
      address: fields.address.value,
      city: fields.city.value,
      postalCode: fields.postalCode.value,
      notes: document.getElementById('notes').value
    },
    items: cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      subtotal: item.price * (item.quantity || 1)
    })),
    shipping: {
      method: document.querySelector('input[name="shippingMethod"]:checked').value,
      cost: parseFloat(document.getElementById('shippingCost').textContent)
    },
    payment: {
      method: paymentMethod,
      cardLast4: paymentMethod === 'card' ? document.getElementById('cardNumber').value.slice(-4) : null
    },
    totals: {
      subtotal: parseFloat(document.getElementById('subtotal').textContent),
      shipping: parseFloat(document.getElementById('shippingCost').textContent),
      total: parseFloat(document.getElementById('totalPrice').textContent)
    }
  };

  // Sauvegarder la commande
  let orders = JSON.parse(localStorage.getItem('ph_orders')) || [];
  orders.push(order);
  localStorage.setItem('ph_orders', JSON.stringify(orders));

  // Vider le panier
  cart = [];
  localStorage.setItem('ph_cart', JSON.stringify(cart));

  // Afficher confirmation
  const toastEl = document.getElementById('checkoutToast');
  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  // Redirection après confirmation
  setTimeout(() => {
    window.location.href = 'products.html';
  }, 2500);
}

// Appliquer les animations CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .form-check {
    cursor: pointer;
  }

  .form-check-input {
    cursor: pointer;
  }

  .form-check:has(input:checked) {
    border-color: #4f46e5 !important;
    background-color: rgba(79, 70, 229, 0.05) !important;
  }

  .btn-outline-secondary:hover {
    color: #4f46e5;
    border-color: #4f46e5;
  }

  input.form-control:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 0.2rem rgba(79, 70, 229, 0.25);
  }

  input.form-control.is-invalid {
    border-color: #ef4444;
    box-shadow: 0 0 0 0.2rem rgba(239, 68, 68, 0.25);
  }
`;
document.head.appendChild(style);

// Fonction pour afficher/masquer le formulaire de carte
function togglePaymentForm() {
  const cardForm = document.getElementById('cardPaymentForm');
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  
  if (paymentMethod === 'card') {
    cardForm.style.display = 'block';
    cardForm.style.animation = 'fadeIn 0.3s ease';
  } else {
    cardForm.style.display = 'none';
  }
}

// Fonction de validation de la carte bancaire
function validateCardPayment() {
  const cardholder = document.getElementById('cardholderName').value.trim();
  const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
  const expiry = document.getElementById('cardExpiry').value;
  const cvv = document.getElementById('cardCVV').value;

  // Vérifier le titulaire
  if (!cardholder) {
    return { valid: false, message: 'Veuillez entrer le titulaire de la carte' };
  }

  // Vérifier le numéro de carte (algorithme de Luhn simplifié)
  if (!cardNumber || cardNumber.length !== 16) {
    return { valid: false, message: 'Veuillez entrer un numéro de carte valide (16 chiffres)' };
  }

  if (!/^\d{16}$/.test(cardNumber)) {
    return { valid: false, message: 'Le numéro de carte doit contenir uniquement des chiffres' };
  }

  // Vérifier la date d'expiration
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(expiry)) {
    return { valid: false, message: 'Veuillez entrer une date d\'expiration valide (MM/YY)' };
  }

  // Vérifier si la carte n'est pas expirée
  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
    return { valid: false, message: 'Votre carte a expiré' };
  }

  // Vérifier le CVV
  if (!cvv || cvv.length < 3 || cvv.length > 4) {
    return { valid: false, message: 'Veuillez entrer un CVV valide (3-4 chiffres)' };
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    return { valid: false, message: 'Le CVV doit contenir uniquement des chiffres' };
  }

  return { valid: true };
}
