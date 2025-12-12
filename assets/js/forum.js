// Forum — Page forum.html

const threads = [
  {
    id: 1,
    title: 'Comment gérer un chat agressif?',
    category: 'comportement',
    author: 'Sarah M.',
    date: '18 Nov 2025',
    replies: 12,
    views: 234,
    content: 'Mon chat devient très agressif quand on le touche. Comment puis-je améliorer son comportement?'
  },
  {
    id: 2,
    title: 'Meilleure marque de croquettes',
    category: 'nutrition',
    author: 'Ahmed B.',
    date: '17 Nov 2025',
    replies: 28,
    views: 456,
    content: 'Quelle est votre marque préférée de croquettes pour chats? Cherche des recommandations.'
  },
  {
    id: 3,
    title: 'Mon chat éternue beaucoup',
    category: 'sante',
    author: 'Fatima L.',
    date: '16 Nov 2025',
    replies: 8,
    views: 167,
    content: 'Mon chat éternue très souvent depuis une semaine. Est-ce normal? Dois-je consulter un vétérinaire?'
  },
  {
    id: 4,
    title: 'Conseils pour jouer avec votre chat',
    category: 'general',
    author: 'Karim K.',
    date: '15 Nov 2025',
    replies: 15,
    views: 389,
    content: 'Partagez vos jeux préférés avec vos chats! J\'adore la canne à pêche.'
  }
];

let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderThreads('all');

  // Filtres catégories
  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.getAttribute('data-category');
      renderThreads(currentCategory);
    });
  });

  // Nouvelle discussion
  document.getElementById('newThreadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newThread = {
      id: Date.now(),
      title: document.getElementById('threadTitle').value,
      category: document.getElementById('threadCategory').value,
      author: 'Vous',
      date: new Date().toLocaleDateString('fr-FR'),
      replies: 0,
      views: 0,
      content: document.getElementById('threadMessage').value
    };
    threads.unshift(newThread);
    bootstrap.Modal.getInstance(document.getElementById('newThreadModal')).hide();
    document.getElementById('newThreadForm').reset();
    renderThreads(currentCategory);
    showNotification('Discussion créée avec succès! 🎉');
  });
});

function renderThreads(category) {
  const list = document.getElementById('threadsList');
  const filtered = category === 'all' ? threads : threads.filter(t => t.category === category);

  if (filtered.length === 0) {
    list.innerHTML = '<div class="text-center py-5"><p class="text-muted">Aucune discussion trouvée</p></div>';
    return;
  }

  list.innerHTML = filtered.map((thread, idx) => {
    const categoryIcons = {
      sante: '🏥',
      nutrition: '🍖',
      comportement: '😺',
      general: '💬'
    };
    return `
      <a href="#" class="list-group-item list-group-item-action border-0 shadow-sm mb-3 rounded-3 hover-lift p-4" style="animation: fadeInUp 0.5s ease ${idx * 0.1}s forwards; opacity: 0;">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="d-flex align-items-center mb-2">
              <span class="fs-5 me-2">${categoryIcons[thread.category]}</span>
              <h6 class="fw-bold mb-0">${thread.title}</h6>
              <span class="badge bg-primary ms-2">${thread.category}</span>
            </div>
            <p class="text-muted small mb-0">${thread.content.substring(0, 100)}...</p>
            <div class="d-flex gap-3 mt-2 small text-muted">
              <span><i class="bi bi-person me-1"></i>${thread.author}</span>
              <span><i class="bi bi-calendar me-1"></i>${thread.date}</span>
            </div>
          </div>
          <div class="col-md-4 text-end">
            <div class="row g-3">
              <div class="col-6">
                <div class="bg-light p-3 rounded">
                  <div class="fw-bold text-primary">${thread.replies}</div>
                  <small class="text-muted">Réponses</small>
                </div>
              </div>
              <div class="col-6">
                <div class="bg-light p-3 rounded">
                  <div class="fw-bold text-success">${thread.views}</div>
                  <small class="text-muted">Vues</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3';
  notification.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  document.body.appendChild(notification);
  const bsNotif = new bootstrap.Toast(notification);
  bsNotif.show();
  setTimeout(() => notification.remove(), 3000);
}
