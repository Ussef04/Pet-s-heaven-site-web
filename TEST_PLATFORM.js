// === TEST SUITE POUR PET'S HEAVEN PLATFORM ===
// Executez ce script dans la console du navigateur (F12) sur home.html
// ou lancez-le pour pré-remplir des données de test

// ============================================
// 1. INITIALISATION DES DONNÉES DE TEST
// ============================================

function initializeTestData() {
  console.log('🚀 Initialisation des données de test...');

  // Clients de test
  const testClients = [
    {
      id: 'client_1',
      type: 'client',
      name: 'Jean Dupont',
      email: 'jean@test.com',
      phone: '+212 612345678',
      password: 'test123',
      createdAt: new Date().toISOString(),
      pets: [
        {
          id: 'pet_1',
          name: 'Minou',
          type: 'Chat',
          breed: 'Persan',
          age: 3,
          weight: 4.5
        },
        {
          id: 'pet_2',
          name: 'Rex',
          type: 'Chien',
          breed: 'Labrador',
          age: 5,
          weight: 32
        }
      ],
      appointments: []
    },
    {
      id: 'client_2',
      type: 'client',
      name: 'Marie Martin',
      email: 'marie@test.com',
      phone: '+212 687654321',
      password: 'test123',
      createdAt: new Date().toISOString(),
      pets: [
        {
          id: 'pet_3',
          name: 'Bella',
          type: 'Chat',
          breed: 'Siamois',
          age: 2,
          weight: 3.2
        }
      ],
      appointments: []
    }
  ];

  // Vétérinaires de test
  const testVets = [
    {
      id: 'vet_1',
      type: 'vet',
      name: 'Ahmed Ben Ali',
      email: 'ahmed@test.com',
      phone: '+212 612111111',
      specialty: 'Chirurgie',
      city: 'Casablanca',
      clinic: 'Clinique Vétérinaire Casablanca',
      license: 'VET-2024-001',
      password: 'test123',
      createdAt: new Date().toISOString(),
      verified: true,
      availability: [
        { day: 'lundi', status: 'available', startTime: '08:00', endTime: '17:00' },
        { day: 'mardi', status: 'available', startTime: '08:00', endTime: '17:00' },
        { day: 'mercredi', status: 'available', startTime: '09:00', endTime: '16:00' },
        { day: 'jeudi', status: 'available', startTime: '08:00', endTime: '17:00' },
        { day: 'vendredi', status: 'available', startTime: '08:00', endTime: '17:00' },
        { day: 'samedi', status: 'available', startTime: '10:00', endTime: '14:00' }
      ],
      appointments: []
    },
    {
      id: 'vet_2',
      type: 'vet',
      name: 'Fatima Tazi',
      email: 'fatima@test.com',
      phone: '+212 612222222',
      specialty: 'Dermatologie',
      city: 'Rabat',
      clinic: 'Cabinet Vétérinaire Rabat',
      license: 'VET-2024-002',
      password: 'test123',
      createdAt: new Date().toISOString(),
      verified: true,
      availability: [
        { day: 'lundi', status: 'available', startTime: '09:00', endTime: '18:00' },
        { day: 'mercredi', status: 'available', startTime: '09:00', endTime: '18:00' },
        { day: 'vendredi', status: 'available', startTime: '09:00', endTime: '18:00' },
        { day: 'samedi', status: 'available', startTime: '10:00', endTime: '15:00' }
      ],
      appointments: []
    },
    {
      id: 'vet_3',
      type: 'vet',
      name: 'Hassan Boudraa',
      email: 'hassan@test.com',
      phone: '+212 612333333',
      specialty: 'Médecine Générale',
      city: 'Marrakech',
      clinic: 'Clinique Vétérinaire Marrakech',
      license: 'VET-2024-003',
      password: 'test123',
      createdAt: new Date().toISOString(),
      verified: true,
      availability: [
        { day: 'lundi', status: 'available', startTime: '08:00', endTime: '17:00' },
        { day: 'mardi', status: 'available', startTime: '08:00', endTime: '17:00' },
        { day: 'jeudi', status: 'available', startTime: '08:00', endTime: '17:00' },
        { day: 'vendredi', status: 'available', startTime: '08:00', endTime: '17:00' }
      ],
      appointments: []
    }
  ];

  // Produits de test
  const testProducts = [
    {
      id: 'prod_1',
      name: 'Aliment Chien Premium',
      category: 'alimentation',
      description: 'Croquettes de haute qualité pour chiens',
      price: 180,
      quantity: 50
    },
    {
      id: 'prod_2',
      name: 'Aliment Chat Premium',
      category: 'alimentation',
      description: 'Croquettes spécialisées pour chats',
      price: 150,
      quantity: 60
    },
    {
      id: 'prod_3',
      name: 'Jouet Balle',
      category: 'jouets',
      description: 'Balle colorée pour animaux',
      price: 25,
      quantity: 100
    },
    {
      id: 'prod_4',
      name: 'Collier Anti-Puces',
      category: 'accessoires',
      description: 'Collier efficace contre les puces et tiques',
      price: 85,
      quantity: 30
    },
    {
      id: 'prod_5',
      name: 'Brosse pour Chien',
      category: 'toilettage',
      description: 'Brosse ergonomique de qualité',
      price: 65,
      quantity: 40
    }
  ];

  // Rendez-vous de test (environ 5 jours à partir d'aujourd'hui)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const inTwoDays = new Date();
  inTwoDays.setDate(inTwoDays.getDate() + 2);
  const inThreeDays = new Date();
  inThreeDays.setDate(inThreeDays.getDate() + 3);

  const testAppointments = [
    {
      id: 'appt_1',
      clientId: 'client_1',
      clientName: 'Jean Dupont',
      vetId: 'vet_1',
      vetName: 'Dr. Ahmed Ben Ali',
      petId: 'pet_1',
      petName: 'Minou',
      date: tomorrow.toISOString().split('T')[0],
      time: '10:00',
      reason: 'Visite de contrôle',
      status: 'en attente',
      notes: 'Première visite'
    },
    {
      id: 'appt_2',
      clientId: 'client_1',
      clientName: 'Jean Dupont',
      vetId: 'vet_2',
      vetName: 'Dr. Fatima Tazi',
      petId: 'pet_2',
      petName: 'Rex',
      date: inTwoDays.toISOString().split('T')[0],
      time: '14:30',
      reason: 'Problème de peau',
      status: 'confirmé',
      notes: 'Le chien se gratte beaucoup'
    },
    {
      id: 'appt_3',
      clientId: 'client_2',
      clientName: 'Marie Martin',
      vetId: 'vet_1',
      vetName: 'Dr. Ahmed Ben Ali',
      petId: 'pet_3',
      petName: 'Bella',
      date: inThreeDays.toISOString().split('T')[0],
      time: '11:00',
      reason: 'Vaccination annuelle',
      status: 'en attente',
      notes: ''
    }
  ];

  // Sauvegarder dans localStorage
  try {
    localStorage.setItem('ph_clients', JSON.stringify(testClients));
    localStorage.setItem('ph_vets', JSON.stringify(testVets));
    localStorage.setItem('ph_products', JSON.stringify(testProducts));
    localStorage.setItem('ph_appointments', JSON.stringify(testAppointments));
    localStorage.setItem('ph_availability', JSON.stringify([])); // Sera rempli par les vets

    console.log('✅ Données de test initialisées avec succès !');
    console.log('📊 Résumé :');
    console.log(`   - ${testClients.length} clients`);
    console.log(`   - ${testVets.length} vétérinaires`);
    console.log(`   - ${testProducts.length} produits`);
    console.log(`   - ${testAppointments.length} rendez-vous`);
    
    // Afficher les credentials
    console.log('\n🔐 Identifiants de test :');
    console.log('\n📱 Clients :');
    testClients.forEach((client, index) => {
      console.log(`   ${index + 1}. Email: ${client.email} | Mot de passe: ${client.password}`);
    });
    console.log('\n🏥 Vétérinaires :');
    testVets.forEach((vet, index) => {
      console.log(`   ${index + 1}. Email: ${vet.email} | Mot de passe: ${vet.password}`);
    });

    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation :', error);
    return false;
  }
}

// ============================================
// 2. FONCTIONS DE TEST
// ============================================

function testLogin(email, password) {
  console.log(`\n🔐 Test Login : ${email}`);
  
  const clients = JSON.parse(localStorage.getItem('ph_clients') || '[]');
  const vets = JSON.parse(localStorage.getItem('ph_vets') || '[]');

  const clientMatch = clients.find(c => c.email === email && c.password === password);
  if (clientMatch) {
    console.log('✅ Authentification client réussie');
    console.log('   Utilisateur :', clientMatch.name);
    return { success: true, user: clientMatch };
  }

  const vetMatch = vets.find(v => v.email === email && v.password === password);
  if (vetMatch) {
    console.log('✅ Authentification vétérinaire réussie');
    console.log('   Utilisateur :', vetMatch.name);
    return { success: true, user: vetMatch };
  }

  console.log('❌ Identifiants invalides');
  return { success: false };
}

function testGetAllVets() {
  console.log('\n🏥 Récupération de tous les vétérinaires');
  
  const vets = JSON.parse(localStorage.getItem('ph_vets') || '[]');
  console.log(`✅ ${vets.length} vétérinaires trouvés:`);
  vets.forEach(vet => {
    console.log(`   - Dr. ${vet.name} (${vet.specialty}) à ${vet.city}`);
  });
  return vets;
}

function testGetAllClients() {
  console.log('\n👥 Récupération de tous les clients');
  
  const clients = JSON.parse(localStorage.getItem('ph_clients') || '[]');
  console.log(`✅ ${clients.length} clients trouvés:`);
  clients.forEach(client => {
    console.log(`   - ${client.name} (${client.email}) avec ${client.pets.length} animal(aux)`);
  });
  return clients;
}

function testGetAppointments(vetId = null) {
  console.log('\n📅 Récupération des rendez-vous');
  
  const appointments = JSON.parse(localStorage.getItem('ph_appointments') || '[]');
  
  let filtered = appointments;
  if (vetId) {
    filtered = appointments.filter(a => a.vetId === vetId);
    console.log(`✅ ${filtered.length} rendez-vous pour le vétérinaire ${vetId}:`);
  } else {
    console.log(`✅ ${filtered.length} rendez-vous au total:`);
  }

  filtered.forEach(appt => {
    console.log(`   - ${appt.clientName} + ${appt.petName} avec Dr. ${appt.vetName}`);
    console.log(`     📅 ${appt.date} à ${appt.time} | Statut: ${appt.status}`);
  });
  return filtered;
}

function testGetProductsByCategory(category) {
  console.log(`\n📦 Récupération des produits (${category})`);
  
  const products = JSON.parse(localStorage.getItem('ph_products') || '[]');
  const filtered = products.filter(p => p.category === category);
  
  console.log(`✅ ${filtered.length} produit(s) trouvé(s):`);
  filtered.forEach(prod => {
    console.log(`   - ${prod.name} : ${prod.price} DH`);
  });
  return filtered;
}

function testDataIntegrity() {
  console.log('\n🔍 Vérification de l\'intégrité des données');
  
  const clients = JSON.parse(localStorage.getItem('ph_clients') || '[]');
  const vets = JSON.parse(localStorage.getItem('ph_vets') || '[]');
  const appointments = JSON.parse(localStorage.getItem('ph_appointments') || '[]');
  const products = JSON.parse(localStorage.getItem('ph_products') || '[]');

  let issues = 0;

  // Vérifier les rendez-vous
  appointments.forEach(appt => {
    const clientExists = clients.find(c => c.id === appt.clientId);
    const vetExists = vets.find(v => v.id === appt.vetId);
    
    if (!clientExists) {
      console.warn(`⚠️  Rendez-vous ${appt.id}: client ${appt.clientId} introuvable`);
      issues++;
    }
    if (!vetExists) {
      console.warn(`⚠️  Rendez-vous ${appt.id}: vétérinaire ${appt.vetId} introuvable`);
      issues++;
    }
  });

  if (issues === 0) {
    console.log('✅ Toutes les données sont intègres');
  } else {
    console.log(`❌ ${issues} problème(s) d'intégrité trouvé(s)`);
  }

  return issues === 0;
}

// ============================================
// 3. AFFICHAGE DU MENU DE TEST
// ============================================

function showTestMenu() {
  console.clear();
  console.log('%c🧪 PET\'S HEAVEN - SUITE DE TEST', 'font-size: 16px; font-weight: bold; color: #4f46e5;');
  console.log('%c═════════════════════════════════════════════════', 'color: #4f46e5;');
  console.log('\n📝 Commandes disponibles:\n');
  
  console.log('%c1. INITIALISATION', 'font-weight: bold; color: #7c3aed;');
  console.log('   initializeTestData()     → Charger les données de test\n');
  
  console.log('%c2. AUTHENTIFICATION', 'font-weight: bold; color: #7c3aed;');
  console.log('   testLogin("jean@test.com", "test123")\n');
  
  console.log('%c3. REQUÊTES', 'font-weight: bold; color: #7c3aed;');
  console.log('   testGetAllVets()         → Tous les vétérinaires');
  console.log('   testGetAllClients()      → Tous les clients');
  console.log('   testGetAppointments()    → Tous les rendez-vous');
  console.log('   testGetAppointments("vet_1")  → RDV d\'un vétérinaire\n');
  
  console.log('%c4. PRODUITS', 'font-weight: bold; color: #7c3aed;');
  console.log('   testGetProductsByCategory("alimentation")\n');
  
  console.log('%c5. VALIDATION', 'font-weight: bold; color: #7c3aed;');
  console.log('   testDataIntegrity()      → Vérifier l\'intégrité\n');
  
  console.log('%c═════════════════════════════════════════════════\n', 'color: #4f46e5;');
}

// ============================================
// 4. EXÉCUTION AUTOMATIQUE
// ============================================

// Au chargement, afficher le menu et initialiser les données
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    showTestMenu();
  });
}

// Faire les fonctions disponibles globalement
window.initializeTestData = initializeTestData;
window.testLogin = testLogin;
window.testGetAllVets = testGetAllVets;
window.testGetAllClients = testGetAllClients;
window.testGetAppointments = testGetAppointments;
window.testGetProductsByCategory = testGetProductsByCategory;
window.testDataIntegrity = testDataIntegrity;
window.showTestMenu = showTestMenu;

console.log('\n💡 Conseil: Tapez showTestMenu() pour afficher ce menu à nouveau');
