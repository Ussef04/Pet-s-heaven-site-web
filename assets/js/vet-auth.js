// === VET AUTHENTICATION SYSTEM ===
// Manage veterinarian login, signup, and dashboard redirection

const KEY_VET_SESSION = 'ph_vet_session';
const KEY_VET_PROFILES = 'ph_vet_profiles';
const KEY_APPOINTMENTS = 'ph_appointments';

// === SIGNUP VET FORM HANDLER ===
function setupVetSignupForm() {
  const form = document.getElementById('signupVetForm');
  console.log('🔧 [setupVetSignupForm] Looking for form... Found:', form ? 'YES' : 'NO');
  
  if (!form) {
    console.warn('❌ [setupVetSignupForm] #signupVetForm not found in DOM!');
    return;
  }

  console.log('✅ [setupVetSignupForm] Form found, adding listener...');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('📤 [SignupForm Submit] Form submitted!');

    const errorDiv = document.getElementById('signupVetError');
    const successDiv = document.getElementById('signupVetSuccess');

    // Clear previous messages
    errorDiv.classList.add('d-none');
    successDiv.classList.add('d-none');

    // Validate passwords match
    const password = document.getElementById('signupVetPassword').value;
    const passwordConfirm = document.getElementById('signupVetPasswordConfirm').value;

    console.log('🔐 [SignupForm] Validating passwords...');
    if (password !== passwordConfirm) {
      console.warn('❌ [SignupForm] Passwords do not match!');
      errorDiv.textContent = 'Les mots de passe ne correspondent pas.';
      errorDiv.classList.remove('d-none');
      return;
    }

    // Create vet profile
    const vetProfile = {
      id: Date.now().toString(),
      name: document.getElementById('signupVetName').value,
      email: document.getElementById('signupVetEmail').value,
      password: btoa(password), // Simple base64 encoding (NOT secure - for demo only)
      specialty: document.getElementById('signupVetSpecialty').value,
      phone: document.getElementById('signupVetPhone').value,
      city: document.getElementById('signupVetCity').value,
      license: document.getElementById('signupVetLicense').value,
      createdAt: new Date().toISOString(),
      appointments: []
    };

    console.log('🐕 [SignupForm] Created vet profile:', vetProfile);

    // Check if email already exists
    const existingVets = JSON.parse(localStorage.getItem(KEY_VET_PROFILES) || '[]');
    console.log('📋 [SignupForm] Checking existing vets... Found:', existingVets.length);
    
    if (existingVets.some(v => v.email === vetProfile.email)) {
      console.warn('❌ [SignupForm] Email already exists:', vetProfile.email);
      errorDiv.textContent = 'Cet email est déjà utilisé.';
      errorDiv.classList.remove('d-none');
      return;
    }

    // Save to localStorage
    existingVets.push(vetProfile);
    localStorage.setItem(KEY_VET_PROFILES, JSON.stringify(existingVets));
    console.log('✅ [SignupForm] Saved to ph_vet_profiles. Total vets:', existingVets.length);

    // === SYNCHRONIZE WITH VET LIST ===
    // Add to vets list for client visibility
    console.log('🔄 [SignupForm] Syncing vet to client list...');
    syncVetToClientList(vetProfile);
    console.log('✅ [SignupForm] Sync completed!');

    // Create session and redirect
    const session = {
      id: vetProfile.id,
      name: vetProfile.name,
      email: vetProfile.email,
      type: 'vet',
      specialty: vetProfile.specialty,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem(KEY_VET_SESSION, JSON.stringify(session));
    console.log('✅ [SignupForm] Session created and saved');

    // Show success message
    successDiv.textContent = '✓ Profil créé avec succès ! Redirection en cours...';
    successDiv.classList.remove('d-none');

    // Redirect to vet dashboard
    console.log('🚀 [SignupForm] Redirecting to vet-dashboard.html in 1.5s...');
    setTimeout(() => {
      window.location.href = 'vet-dashboard.html';
    }, 1500);
  });
}

// === LOGIN VET FORM HANDLER ===
function setupVetLoginForm() {
  const form = document.getElementById('loginVetForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errorDiv = document.getElementById('loginVetError');
    errorDiv.classList.add('d-none');

    const email = document.getElementById('loginVetEmail').value;
    const password = document.getElementById('loginVetPassword').value;
    const rememberMe = document.getElementById('rememberMeVet').checked;

    // Find vet by email and password
    const vets = JSON.parse(localStorage.getItem(KEY_VET_PROFILES) || '[]');
    const vet = vets.find(v => v.email === email && v.password === btoa(password));

    if (!vet) {
      errorDiv.textContent = 'Email ou mot de passe incorrect.';
      errorDiv.classList.remove('d-none');
      return;
    }

    // Create session
    const session = {
      id: vet.id,
      name: vet.name,
      email: vet.email,
      type: 'vet',
      specialty: vet.specialty,
      loginTime: new Date().toISOString(),
      rememberMe: rememberMe
    };

    localStorage.setItem(KEY_VET_SESSION, JSON.stringify(session));

    // Redirect to vet dashboard
    window.location.href = 'vet-dashboard.html';
  });
}

// === VET LOGOUT ===
function vetLogout() {
  localStorage.removeItem(KEY_VET_SESSION);
  window.location.href = 'home.html';
}

// === SYNCHRONIZE VET TO CLIENT LIST ===
// When a vet signs up, add them to the visible vet list
function syncVetToClientList(vetProfile) {
  console.log('🔄 [syncVetToClientList] Starting sync for vet:', vetProfile.name);
  
  const clientVetsList = JSON.parse(localStorage.getItem('ph_vet_list') || '[]');
  console.log('📋 [syncVetToClientList] Current ph_vet_list contains:', clientVetsList.length, 'vets');
  
  const vetForClients = {
    id: vetProfile.id,
    name: vetProfile.name,
    email: vetProfile.email,
    city: vetProfile.city,
    specialty: vetProfile.specialty,
    phone: vetProfile.phone,
    rating: 5.0, // New vets start with 5 stars
    reviews: 0,
    isRegistered: true, // Mark as registered via platform
    registeredAt: new Date().toISOString()
  };
  
  console.log('🐕 [syncVetToClientList] New vet object:', vetForClients);
  
  // Check if vet already exists
  const existingVet = clientVetsList.find(v => v.email === vetProfile.email);
  if (existingVet) {
    console.warn('⚠️ [syncVetToClientList] Vet already exists in list:', vetProfile.email);
    return;
  }
  
  clientVetsList.push(vetForClients);
  console.log('➕ [syncVetToClientList] Added vet to list. New total:', clientVetsList.length);
  
  localStorage.setItem('ph_vet_list', JSON.stringify(clientVetsList));
  console.log('✅ [syncVetToClientList] Saved to localStorage:');
  console.log('   ph_vet_list now contains:', JSON.stringify(clientVetsList, null, 2));
}

// === GET VET SESSION ===
function getVetSession() {
  try {
    const session = localStorage.getItem(KEY_VET_SESSION);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}

// === GET ALL APPOINTMENTS FOR VET ===
function getVetAppointments(vetEmail) {
  const appointments = JSON.parse(localStorage.getItem(KEY_APPOINTMENTS) || '[]');
  
  // Filter appointments for this vet
  return appointments.filter(apt => {
    // Check if appointment is for this vet
    return apt.vetEmail === vetEmail || apt.vetName === vetEmail;
  });
}

// === ADD APPOINTMENT FROM CLIENT ===
function addAppointmentForVet(vetEmail, appointmentData) {
  const appointments = JSON.parse(localStorage.getItem(KEY_APPOINTMENTS) || '[]');
  
  const newAppointment = {
    id: Date.now().toString(),
    vetEmail: vetEmail,
    vetName: appointmentData.vetName || '',
    clientName: appointmentData.clientName || '',
    clientPhone: appointmentData.clientPhone || '',
    petName: appointmentData.petName || '',
    petType: appointmentData.petType || '',
    date: appointmentData.date,
    time: appointmentData.time,
    reason: appointmentData.reason || '',
    status: 'pending', // pending, confirmed, completed, cancelled
    createdAt: new Date().toISOString(),
    notes: ''
  };

  appointments.push(newAppointment);
  localStorage.setItem(KEY_APPOINTMENTS, JSON.stringify(appointments));
  
  return newAppointment;
}

// === UPDATE APPOINTMENT STATUS ===
function updateAppointmentStatus(appointmentId, status, notes = '') {
  const appointments = JSON.parse(localStorage.getItem(KEY_APPOINTMENTS) || '[]');
  
  const appointment = appointments.find(apt => apt.id === appointmentId);
  if (appointment) {
    appointment.status = status;
    appointment.notes = notes;
    appointment.updatedAt = new Date().toISOString();
    localStorage.setItem(KEY_APPOINTMENTS, JSON.stringify(appointments));
    return true;
  }
  return false;
}

// === INITIALIZE VET AUTH ===
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 [vet-auth.js] DOMContentLoaded - Initializing vet auth...');
  
  // Setup forms if they exist
  setupVetSignupForm();
  setupVetLoginForm();
  
  console.log('✅ [vet-auth.js] Vet auth initialized!');
});

// === UTILITY FUNCTION FOR DEBUGGING ===
window.checkVetSync = function() {
  console.log('\n🔍 === VET SYNC DEBUG CHECK ===');
  
  const vetProfiles = JSON.parse(localStorage.getItem('ph_vet_profiles') || '[]');
  const vetList = JSON.parse(localStorage.getItem('ph_vet_list') || '[]');
  
  console.log('📋 ph_vet_profiles:', vetProfiles.length, 'vets');
  vetProfiles.forEach(v => console.log(`  - ${v.name} (${v.email})`));
  
  console.log('📋 ph_vet_list:', vetList.length, 'vets');
  vetList.forEach(v => console.log(`  - ${v.name} (${v.email})`));
  
  console.log('=== END DEBUG ===\n');
};

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getVetSession,
    vetLogout,
    getVetAppointments,
    addAppointmentForVet,
    updateAppointmentStatus
  };
}
