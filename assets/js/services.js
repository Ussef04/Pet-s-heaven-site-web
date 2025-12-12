// Services Premium — Page services.html

const premiumServices = [
  {
    id: 1,
    name: 'Consultation Vétérinaire Virtuelle',
    icon: '🎥',
    price: '150 MAD',
    description: 'Consultez un vétérinaire par vidéo en direct (30 min)',
    features: ['Consultation vidéo en direct', 'Diagnostic préliminaire', 'Ordonnance numérique', 'Suivi 7 jours']
  },
  {
    id: 2,
    name: 'Carnet de Santé Numérique',
    icon: '📋',
    price: '50 MAD/mois',
    description: 'Historique complet et suivi médical de votre chat',
    features: ['Carnet électronique complet', 'Rappels vaccins automatiques', 'Export PDF/CSV', 'Partage avec vétérinaire']
  },
  {
    id: 3,
    name: 'Plan Nutritionnel Personnalisé',
    icon: '🍽️',
    price: '100 MAD/mois',
    description: 'Plan alimentaire adapté aux besoins spécifiques de votre chat',
    features: ['Analyse nutritionnelle', 'Recommandations marques', 'Suivi poids', 'Ajustements réguliers']
  },
  {
    id: 4,
    name: 'Assurance Santé Chat',
    icon: '🛡️',
    price: '200 MAD/mois',
    description: 'Couverture complète des frais vétérinaires',
    features: ['Remboursement 80%', 'Pas de franchise', 'Accidents & maladies', 'Assistance 24/24']
  },
  {
    id: 5,
    name: 'Formation Comportement',
    icon: '🎓',
    price: '300 MAD',
    description: 'Cours en ligne sur le comportement félin',
    features: ['5 modules vidéo', 'Ressources PDF', 'Chat avec expert', 'Certificat inclus']
  },
  {
    id: 6,
    name: 'Grooming À Domicile',
    icon: '✂️',
    price: '250 MAD',
    description: 'Toilettage professionnel à votre domicile',
    features: ['Toiletteur certifié', 'Matériel stérilisé', 'Coupe personnalisée', 'Photos avant/après']
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderServices();
});

function renderServices() {
  const grid = document.getElementById('servicesGrid');

  grid.innerHTML = premiumServices.map((service, idx) => `
    <div class="col-md-6 col-lg-4 animate-in" style="animation: fadeInUp 0.6s ease ${idx * 0.1}s forwards;">
      <div class="card h-100 border-0 shadow-sm overflow-hidden hover-lift">
        <div class="card-header bg-gradient text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; padding: 2rem; text-align: center; font-size: 3rem;">
          ${service.icon}
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fw-bold">${service.name}</h5>
          <p class="text-muted small mb-3">${service.description}</p>
          
          <div class="mb-4">
            <h6 class="fw-bold text-primary">${service.price}</h6>
          </div>

          <ul class="list-unstyled small mb-4 flex-grow-1">
            ${service.features.map(f => `<li class="mb-2"><i class="bi bi-check-circle text-success me-2"></i>${f}</li>`).join('')}
          </ul>

          <button class="btn btn-primary w-100" onclick="buyService('${service.name}')">
            Acheter maintenant
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function buyService(serviceName) {
  alert(`✅ Service "${serviceName}" ajouté au panier!\n\nPour finaliser votre achat, veuillez vous connecter ou créer un compte.`);
}
