// Produits — Page products.html

const products = [
  { id: 1, name: 'Croquettes Premium', category: 'food', price: 150, rating: 4.8, image: 'assets/images/croquettes.jpg', description: 'Croquettes nutritives pour chat adulte' },
  { id: 2, name: 'Pâtée Délicieuse', category: 'food', price: 80, rating: 4.9, emoji: '🥘', description: 'Nourriture humide savoureuse' },
  { id: 3, name: 'Balle Souris', category: 'toys', price: 35, rating: 4.7, emoji: '🎾', description: 'Jouet interactif qui bouge seul' },
  { id: 4, name: 'Griffoir Vertical', category: 'toys', price: 200, rating: 4.6, emoji: '🌳', description: 'Griffoir XXL avec plusieurs étages' },
  { id: 5, name: 'Litière Agglomérante', category: 'hygiene', price: 120, rating: 4.5, emoji: '🧼', description: 'Litière écologique et absorbante' },
  { id: 6, name: 'Tapis Chauffant', category: 'accessories', price: 250, rating: 5, emoji: '🔥', description: 'Chauffage doux et réglable pour chat' },
  { id: 7, name: 'Collier GPS', category: 'accessories', price: 350, rating: 4.9, emoji: '📍', description: 'Suivi en temps réel de votre chat' },
  { id: 8, name: 'Brosse Anti-nœuds', category: 'hygiene', price: 90, rating: 4.8, emoji: '💆', description: 'Éliminez les nœuds facilement' },
];

let cart = JSON.parse(localStorage.getItem('ph_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');

  // Event listeners sur les boutons catégories
  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', function() {
      // Mettre à jour le bouton actif
      document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Animation de transition
      const grid = document.getElementById('productGrid');
      grid.style.opacity = '0';
      setTimeout(() => {
        renderProducts(this.getAttribute('data-category'));
        grid.style.opacity = '1';
      }, 200);
    });
  });

  // Ajouter animation de transition aux produits
  const grid = document.getElementById('productGrid');
  if (grid) {
    grid.style.transition = 'opacity 0.3s ease';
  }
});

function renderProducts(category) {
  const grid = document.getElementById('productGrid');
  const filtered = category === 'all' 
    ? products 
    : products.filter(p => p.category === category);

  grid.innerHTML = filtered.map((product, idx) => `
    <div class="col-sm-6 col-lg-3" style="animation: fadeInUp 0.5s ease ${idx * 0.1}s both;">
      <div class="card h-100 border-0 shadow-sm position-relative">
        <div class="position-absolute top-0 end-0 p-2" style="z-index: 10;">
          <span class="badge bg-warning text-dark">⭐ ${product.rating}</span>
        </div>
        <div class="card-body d-flex flex-column">
          ${product.image ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">` : `<div class="display-4 mb-3 text-center">${product.emoji}</div>`}
          <h5 class="card-title">${product.name}</h5>
          <p class="text-muted small">${product.description}</p>
          
          <div class="mb-3">
            <div class="d-flex align-items-baseline gap-2">
              <p class="display-6 fw-bold mb-0">${product.price}</p>
              <span class="fs-6 text-muted">MAD</span>
            </div>
          </div>
          
          <div class="d-grid gap-2 mt-auto">
            <button class="btn btn-primary btn-cart" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}">
              <i class="bi bi-cart-plus me-2"></i>Ajouter au panier
            </button>
            <button class="btn btn-outline-secondary btn-sm">
              <i class="bi bi-heart me-1"></i>Favori
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const productName = this.getAttribute('data-product-name');
      const productPrice = this.getAttribute('data-product-price');
      addToCart(productName, productPrice, this);
    });
  });
}

function addToCart(productName, price, btnEl) {
  // Ajouter au panier
  cart.push({ id: Date.now(), name: productName, price });
  localStorage.setItem('ph_cart', JSON.stringify(cart));
  
  // Animation du bouton
  const originalHTML = btnEl.innerHTML;
  btnEl.innerHTML = '<i class="bi bi-check-circle me-2"></i>Ajouté!';
  btnEl.classList.add('btn-success');
  btnEl.disabled = true;
  
  // Toast de confirmation
  const toast = document.createElement('div');
  toast.className = 'position-fixed bottom-0 end-0 m-3 p-3';
  toast.style.zIndex = '2000';
  toast.style.animation = 'slideInRight 0.4s ease';
  toast.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" style="border-radius: 10px; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3); border: none;">
      <i class="bi bi-bag-check me-2"></i><strong>${productName}</strong> ajouté au panier!
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    btnEl.innerHTML = originalHTML;
    btnEl.classList.remove('btn-success');
    btnEl.disabled = false;
  }, 2000);
  
  setTimeout(() => {
    toast.querySelector('.btn-close').click();
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
