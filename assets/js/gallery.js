// Galerie — Page gallery.html

const galleryPhotos = [
  { id: 1, name: 'Minou', category: 'cute', description: 'Mon adorable Minou dormir au soleil', url: '🐱' },
  { id: 2, name: 'Félix', category: 'funny', description: 'Félix dans une position hilarante', url: '😹' },
  { id: 3, name: 'Luna', category: 'nature', description: 'Luna sur la fenêtre regardant les oiseaux', url: '🌙' },
  { id: 4, name: 'Tigrou', category: 'cute', description: 'Tigrou endormi en boule', url: '😻' },
  { id: 5, name: 'Whiskers', category: 'selfie', description: 'Selfie avec mon chat Whiskers', url: '📸' },
  { id: 6, name: 'Simba', category: 'funny', description: 'Simba essayant d\'attraper son reflet', url: '🤣' },
];

let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderGallery('all');

  // Filtres
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.getAttribute('data-filter');
      renderGallery(currentFilter);
    });
  });

  // Upload
  document.getElementById('uploadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const photo = {
      id: Date.now(),
      name: document.getElementById('catName').value,
      category: document.getElementById('photoCategory').value,
      description: document.getElementById('photoDesc').value,
      url: document.getElementById('photoUrl').value
    };
    galleryPhotos.unshift(photo);
    bootstrap.Modal.getInstance(document.getElementById('uploadModal')).hide();
    document.getElementById('uploadForm').reset();
    renderGallery(currentFilter);
    showToast('Photo ajoutée avec succès! 🎉');
  });
});

function renderGallery(filter) {
  const grid = document.getElementById('galleryGrid');
  const filtered = filter === 'all' ? galleryPhotos : galleryPhotos.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((photo, idx) => `
    <div class="col-sm-6 col-lg-4 gallery-item" style="animation: fadeInUp 0.5s ease ${idx * 0.1}s forwards;">
      <div class="card border-0 shadow-sm overflow-hidden hover-lift">
        <div class="position-relative bg-light" style="height: 250px; display: flex; align-items: center; justify-content: center; font-size: 5rem; background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);">
          ${photo.url}
          <div class="position-absolute top-0 end-0 p-2">
            <button class="btn btn-sm btn-light" onclick="likePhoto(${photo.id})">
              <i class="bi bi-heart"></i> <span class="like-count-${photo.id}">0</span>
            </button>
          </div>
        </div>
        <div class="card-body">
          <h6 class="card-title fw-bold mb-1">${photo.name}</h6>
          <p class="text-muted small mb-2">${photo.description}</p>
          <span class="badge bg-secondary">${photo.category}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Animation
  document.querySelectorAll('.gallery-item').forEach((el, idx) => {
    el.style.opacity = '0';
    el.style.animation = `fadeInUp 0.5s ease ${idx * 0.08}s forwards`;
  });
}

function likePhoto(id) {
  const count = document.querySelector(`.like-count-${id}`);
  count.textContent = parseInt(count.textContent) + 1;
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  document.body.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  setTimeout(() => toast.remove(), 3000);
}
