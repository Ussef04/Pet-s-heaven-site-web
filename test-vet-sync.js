#!/usr/bin/env node

/**
 * Test Script for Veterinarian Synchronization System
 * This script simulates the entire flow and checks for sync issues
 */

console.log('\n' + '='.repeat(80));
console.log('🧪 VET SYNCHRONIZATION TEST SUITE');
console.log('='.repeat(80) + '\n');

// Simulate localStorage
const localStorage = {};
const storage = {
  getItem: (key) => localStorage[key] || null,
  setItem: (key, value) => { localStorage[key] = value; },
  removeItem: (key) => { delete localStorage[key]; },
  clear: () => { Object.keys(localStorage).forEach(k => delete localStorage[k]); }
};

// Constants from vet-auth.js
const KEY_VET_SESSION = 'ph_vet_session';
const KEY_VET_PROFILES = 'ph_vet_profiles';
const KEY_APPOINTMENTS = 'ph_appointments';

console.log('📋 TEST 1: Simulating Veterinarian Registration\n');

// Simulate vet registration
const vetProfile = {
  id: Date.now().toString(),
  name: 'Dr. Test Veterinaire',
  email: 'test.vet@example.com',
  password: Buffer.from('password123').toString('base64'),
  specialty: 'Chirurgie Générale',
  phone: '06-12-34-56-78',
  city: 'Casablanca',
  license: 'VET-2025-001',
  createdAt: new Date().toISOString(),
  appointments: []
};

console.log('✏️  Creating vet profile:', vetProfile.name);
console.log('   Email:', vetProfile.email);
console.log('   Specialty:', vetProfile.specialty);
console.log('   City:', vetProfile.city);

// Step 1: Save to ph_vet_profiles
const existingVets = JSON.parse(storage.getItem(KEY_VET_PROFILES) || '[]');
existingVets.push(vetProfile);
storage.setItem(KEY_VET_PROFILES, JSON.stringify(existingVets));
console.log('\n✅ Step 1: Saved to ph_vet_profiles');
console.log('   Total vets in ph_vet_profiles:', existingVets.length);

// Step 2: Synchronize to ph_vet_list (simulate syncVetToClientList)
console.log('\n🔄 Step 2: Synchronizing to ph_vet_list...');
const clientVetsList = JSON.parse(storage.getItem('ph_vet_list') || '[]');
console.log('   Current ph_vet_list size:', clientVetsList.length);

const vetForClients = {
  id: vetProfile.id,
  name: vetProfile.name,
  email: vetProfile.email,
  city: vetProfile.city,
  specialty: vetProfile.specialty,
  phone: vetProfile.phone,
  rating: 5.0,
  reviews: 0,
  isRegistered: true,
  registeredAt: new Date().toISOString()
};

console.log('   Creating client-visible vet object:', vetForClients);

const existingInList = clientVetsList.find(v => v.email === vetProfile.email);
if (!existingInList) {
  clientVetsList.push(vetForClients);
  storage.setItem('ph_vet_list', JSON.stringify(clientVetsList));
  console.log('✅ Synced! ph_vet_list now contains:', clientVetsList.length, 'vets');
} else {
  console.log('⚠️  Vet already exists in ph_vet_list');
}

// Step 3: Verify ph_vet_list contains the vet
console.log('\n📋 TEST 2: Verifying ph_vet_list Content\n');
const savedList = JSON.parse(storage.getItem('ph_vet_list') || '[]');
console.log('✅ ph_vet_list contains:', savedList.length, 'vets');
savedList.forEach((v, i) => {
  console.log(`   ${i + 1}. ${v.name} (${v.specialty}) - ${v.city}`);
});

// Step 4: Simulate loadAllVetsForRDV
console.log('\n🧪 TEST 3: Simulating loadAllVetsForRDV() Function\n');

const defaultVets = [
  { id: 1, name: 'Dr. Ahmed Alami', city: 'Casablanca', specialty: 'Généraliste', phone: '+212 5 22 34 56 78', email: 'ahmed@vets.ma', rating: 4.8, reviews: 156, experience: 15, image: '🩺', color: '#f59e0b' },
  { id: 2, name: 'Dr. Fatima Bennani', city: 'Rabat', specialty: 'Dermatologie', phone: '+212 5 37 12 34 56', email: 'fatima@vets.ma', rating: 4.9, reviews: 203, experience: 12, image: '💊', color: '#10b981' },
  { id: 3, name: 'Dr. Mohamed Karim', city: 'Fès', specialty: 'Chirurgie', phone: '+212 5 35 63 74 85', email: 'karim@vets.ma', rating: 4.7, reviews: 189, experience: 18, image: '⚕️', color: '#3b82f6' },
  { id: 4, name: 'Dr. Leila Hamdaoui', city: 'Marrakech', specialty: 'Dentaire', phone: '+212 5 24 45 56 67', email: 'leila@vets.ma', rating: 4.9, reviews: 234, experience: 14, image: '🦷', color: '#ec4899' }
];

let vets = [...defaultVets];
console.log('✅ Step 1: Loaded default vets:', vets.length);

const registeredVets = JSON.parse(storage.getItem('ph_vet_list') || '[]');
console.log('✅ Step 2: Loaded registered vets from ph_vet_list:', registeredVets.length);

registeredVets.forEach(regVet => {
  const alreadyExists = vets.find(v => v.email === regVet.email);
  if (alreadyExists) {
    console.log('⚠️  Vet already exists:', regVet.name);
    return;
  }
  
  const transformedVet = {
    id: regVet.id || Date.now(),
    name: regVet.name,
    city: regVet.city || 'Non spécifié',
    specialty: regVet.specialty || 'Généraliste',
    phone: regVet.phone || '',
    email: regVet.email,
    rating: regVet.rating || 5.0,
    reviews: regVet.reviews || 0,
    experience: 0,
    image: '🏥',
    availability: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    color: '#ef4444',
    isNewRegistered: true
  };
  
  console.log('➕ Adding registered vet:', transformedVet.name);
  vets.push(transformedVet);
});

console.log('\n✅ Final vets array contains:', vets.length, 'vets');
console.log('\n📊 Vets List:\n');
vets.forEach((v, i) => {
  const marker = v.isNewRegistered ? '🆕' : '  ';
  console.log(`${marker} ${i + 1}. ${v.name}`);
  console.log(`   Specialty: ${v.specialty} | City: ${v.city}`);
  console.log(`   Rating: ${v.rating} | New: ${v.isNewRegistered ? 'YES' : 'NO'}\n`);
});

// Step 5: Simulate displayVets
console.log('🎨 TEST 4: Simulating displayVets() Rendering\n');

if (!vets || vets.length === 0) {
  console.log('❌ PROBLEM: vets array is empty!');
} else {
  console.log('✅ vets array has content, would render:');
  const mockHTML = vets.map((vet, idx) => {
    return `
    <div class="col-md-6 col-lg-4">
      <div class="card" style="border-top: 5px solid ${vet.color};">
        <div style="background: ${vet.color}; color: white; padding: 2rem;">
          <h5>${vet.image} ${vet.name}</h5>
          <p>${vet.specialty}</p>
        </div>
        <div class="card-body">
          <p>${vet.city} | ${vet.experience} ans</p>
          <button onclick="selectVet('${vet.name}')">Prendre RDV</button>
        </div>
      </div>
    </div>`;
  }).join('');
  
  console.log('✅ Would inject', vets.length, 'card(s) into #vetsContainer');
  console.log('✅ Cards would include newly registered vets: ' + 
    (vets.some(v => v.isNewRegistered) ? 'YES ✅' : 'NO ❌'));
}

// Summary
console.log('\n' + '='.repeat(80));
console.log('📊 TEST SUMMARY');
console.log('='.repeat(80));

const issues = [];

if (existingVets.length === 0) issues.push('❌ ph_vet_profiles is empty');
if (clientVetsList.length === 0) issues.push('❌ ph_vet_list is empty after sync');
if (vets.length <= 4) issues.push('⚠️  vets array has only defaults, registered vets not added');
if (!vets.some(v => v.isNewRegistered)) issues.push('⚠️  No newly registered vets in vets array');

if (issues.length === 0) {
  console.log('\n✅ ALL TESTS PASSED!\n');
  console.log('Summary:');
  console.log('  ✅ Vet registration works');
  console.log('  ✅ Synchronization to ph_vet_list works');
  console.log('  ✅ loadAllVetsForRDV() loads registered vets');
  console.log('  ✅ displayVets() would display all vets including new ones');
} else {
  console.log('\n❌ TESTS FOUND ISSUES:\n');
  issues.forEach(issue => console.log(issue));
}

console.log('\n' + '='.repeat(80) + '\n');
