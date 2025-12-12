// Blog — Page blog.html

const articles = [
  {
    id: 1,
    title: 'L\'importance de la vaccination chez le chat',
    category: 'sante',
    date: '15 Nov 2025',
    author: 'Dr. Karim',
    excerpt: 'Les vaccins protègent votre chat contre les maladies graves...',
    content: 'Les vaccins sont essentiels pour maintenir la santé de votre chat. Découvrez quels vaccins sont recommandés et le calendrier de vaccination.',
    image: '🏥'
  },
  {
    id: 2,
    title: 'Nutrition optimale pour un chat en bonne santé',
    category: 'nutrition',
    date: '12 Nov 2025',
    author: 'Dr. Alami',
    excerpt: 'Une bonne alimentation est la base de la santé...',
    content: 'Un régime équilibré est crucial pour le bien-être de votre chat. Apprenez à choisir les meilleurs aliments.',
    image: '🍖'
  },
  {
    id: 3,
    title: 'Comprendre le comportement de votre chat',
    category: 'comportement',
    date: '10 Nov 2025',
    author: 'Dr. Bennani',
    excerpt: 'Le langage corporel félin peut être décrypté...',
    content: 'Les chats communiquent de diverses façons. Apprenez à interpréter leurs signaux et à renforcer votre lien.',
    image: '😺'
  },
  {
    id: 4,
    title: 'Soins dentaires: prévention et hygiène',
    category: 'soins',
    date: '08 Nov 2025',
    author: 'Dr. Zioui',
    excerpt: 'Une bonne hygiène dentaire est souvent négligée...',
    content: 'Les problèmes dentaires peuvent causer des maladies graves. Découvrez les meilleures pratiques de prévention.',
    image: '🦷'
  },
  {
    id: 5,
    title: 'Jeux et exercices pour un chat actif',
    category: 'comportement',
    date: '05 Nov 2025',
    author: 'Dr. Hassan',
    excerpt: 'L\'exercice régulier aide à prévenir l\'obésité...',
    content: 'Les jeux stimulent mentalement et physiquement votre chat. Découvrez des activités amusantes et enrichissantes.',
    image: '🎾'
  },
  {
    id: 6,
    title: 'Les parasites: prévention et traitement',
    category: 'sante',
    date: '03 Nov 2025',
    author: 'Dr. Brahim',
    excerpt: 'Les parasites internes et externes menacent la santé...',
    content: 'Protégez votre chat contre les parasites. Connaître les signes et les solutions de prévention est essentiel.',
    image: '🛡️'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderBlog(articles);

  // Filtrage
  document.getElementById('searchBlog').addEventListener('keyup', filterBlog);
  document.getElementById('categoryFilter').addEventListener('change', filterBlog);
});

function filterBlog() {
  const search = document.getElementById('searchBlog').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search) || a.excerpt.toLowerCase().includes(search);
    const matchCategory = !category || a.category === category;
    return matchSearch && matchCategory;
  });

  renderBlog(filtered);
}

function renderBlog(items) {
  const grid = document.getElementById('blogGrid');
  
  if (items.length === 0) {
    grid.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">Aucun article trouvé</p></div>';
    return;
  }

  grid.innerHTML = items.map(article => `
    <div class="col-md-6 col-lg-4 animate-in">
      <div class="card h-100 border-0 shadow-sm hover-lift">
        <div class="card-header bg-gradient text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; padding: 1.5rem; text-align: center; font-size: 3rem;">
          ${article.image}
        </div>
        <div class="card-body d-flex flex-column">
          <span class="badge bg-primary mb-2 w-fit">${article.category}</span>
          <h5 class="card-title fw-bold">${article.title}</h5>
          <p class="text-muted small mb-3">${article.excerpt}</p>
          <p class="text-muted small mb-3">
            <i class="bi bi-person me-1"></i>${article.author} • 
            <i class="bi bi-calendar me-1"></i>${article.date}
          </p>
          <button class="btn btn-primary mt-auto" data-id="${article.id}" onclick="readArticle(${article.id})">
            Lire l'article <i class="bi bi-arrow-right ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Animation
  document.querySelectorAll('.animate-in').forEach((el, idx) => {
    el.style.animation = `fadeInUp 0.5s ease ${idx * 0.1}s forwards`;
  });
}

function readArticle(id) {
  const article = articles.find(a => a.id === id);
  if (article) {
    alert(`📖 ${article.title}\n\n${article.content}\n\n— ${article.author}`);
  }
}
