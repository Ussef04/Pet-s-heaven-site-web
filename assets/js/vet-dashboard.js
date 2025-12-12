// === CONSTANTS ===
const KEY_SESSION = 'ph_session';
const KEY_VETS = 'ph_vets';
const KEY_APPOINTMENTS = 'ph_appointments';
const KEY_AVAILABILITY = 'ph_availability';
const KEY_CLIENTS = 'ph_clients';
const KEY_VET_REGISTRATIONS = 'ph_vet_registrations';

// === UTILITY FUNCTIONS ===
function loadData(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(KEY_SESSION) || 'null');
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem(KEY_SESSION);
  window.location.href = 'vet-home.html';
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  const session = getSession();

  // Check if user is logged in and is a vet
  if (!session || session.type !== 'vet') {
    window.location.href = 'index.html';
    return;
  }

  // Update user info
  updateUserInfo(session);

  // Setup navigation
  setupNavigation();

  // Load and display data
  loadDashboardData();

  // Setup logout button
  document.getElementById('logoutBtn').addEventListener('click', logout);

  // Setup clinic form
  setupClinicForm();

  // Update year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// === UPDATE USER INFO ===
function updateUserInfo(session) {
  document.getElementById('userName').textContent = 'Dr. ' + (session.name || 'Vétérinaire');
  document.getElementById('userSpecialty').textContent = session.specialty || 'Médecine Générale';
  
  // Create avatar from first letter
  const firstLetter = (session.name || 'V').charAt(0).toUpperCase();
  document.getElementById('userAvatar').textContent = firstLetter;
}

// === NAVIGATION SETUP ===
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item-custom');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked item
      item.classList.add('active');
      
      // Get section name
      const sectionName = item.getAttribute('data-section');
      
      // Update page title and icon
      const icon = item.querySelector('i').className;
      const text = item.querySelector('span').textContent;
      document.getElementById('pageTitle').innerHTML = `<i class="${icon}"></i><span>${text}</span>`;
      
      // Show/hide sections
      showSection(sectionName);
    });
  });
}

function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('[class^="section-"]').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  const section = document.querySelector(`.section-${sectionName}`);
  if (section) {
    section.classList.add('active');
  }
}

function navigateToSection(sectionName) {
  const navItems = document.querySelectorAll('.nav-item-custom');
  navItems.forEach(item => {
    if (item.getAttribute('data-section') === sectionName) {
      item.click();
    }
  });
}

// === LOAD DASHBOARD DATA ===
function loadDashboardData() {
  const session = getSession();
  if (!session) return;

  // Load vet data
  const vets = loadData(KEY_VETS);
  const vet = vets.find(v => v.id === session.id);

  if (vet) {
    // Update form fields
    document.getElementById('vetName').value = vet.name;
    document.getElementById('vetEmail').value = vet.email;
    document.getElementById('vetPhone').value = vet.phone || '';
    document.getElementById('vetSpecialty').value = vet.specialty;
    document.getElementById('vetCity').value = vet.city || '';
    document.getElementById('vetClinic').value = vet.clinic || '';
    document.getElementById('vetLicense').value = vet.license;

    // Update stats
    const appointments = loadData(KEY_APPOINTMENTS);
    const vetAppointments = appointments.filter(a => a.vetId === session.id);
    const pendingAppointments = vetAppointments.filter(a => a.status === 'en attente');
    
    document.getElementById('statAppointments').textContent = vetAppointments.length;
    document.getElementById('statPending').textContent = pendingAppointments.length;
    
    // Count unique clients
    const uniqueClients = new Set(vetAppointments.map(a => a.clientId)).size;
    document.getElementById('statClients').textContent = uniqueClients;

    // Load appointments
    loadAppointments(session.id);

    // Load availability
    loadAvailability(session.id);

    // Load vet applications/registrations
    loadVetApplications(session.email);
  }
}

// === LOAD APPOINTMENTS ===
function loadAppointments(vetId) {
  const appointmentsList = document.getElementById('appointmentsList');
  const appointments = loadData(KEY_APPOINTMENTS);
  const vetAppointments = appointments.filter(a => a.vetId === vetId);

  if (!vetAppointments || vetAppointments.length === 0) {
    appointmentsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">
          <i class="bi bi-calendar-x"></i>
        </div>
        <p>Aucun rendez-vous actuellement</p>
      </div>
    `;
    return;
  }

  let html = '';
  vetAppointments.forEach(appointment => {
    const status = appointment.status || 'en attente';
    let badgeClass = 'badge-pending';
    if (status === 'confirmé') badgeClass = 'badge-confirmed';
    if (status === 'annulé') badgeClass = 'badge-cancelled';
    
    html += `
      <div class="appointment-item">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h5 style="margin: 0; color: var(--primary);">
              <i class="bi bi-person-circle me-2"></i>${appointment.clientName || 'Client'}
            </h5>
            <p style="margin: 0.5rem 0 0 0; color: #6b7280;">
              <i class="bi bi-calendar me-2"></i>${new Date(appointment.date).toLocaleDateString('fr-FR')} à ${appointment.time || 'TBA'}
            </p>
            <p style="margin: 0.25rem 0 0 0; color: #6b7280;">
              <i class="bi bi-paw me-2"></i>${appointment.petName || 'Animal'} - ${appointment.reason || 'Consultation'}
            </p>
            ${appointment.notes ? `<p style="margin: 0.25rem 0 0 0; color: #6b7280;"><i class="bi bi-chat me-2"></i>${appointment.notes}</p>` : ''}
          </div>
          <div class="col-md-4 text-md-end">
            <span class="badge ${badgeClass}" style="font-size: 0.9rem; padding: 0.5rem 1rem; display: inline-block; margin-bottom: 0.5rem;">
              ${status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <div style="margin-top: 0.5rem;">
              ${status === 'en attente' ? `
                <button class="btn btn-sm btn-success" onclick="confirmAppointment('${appointment.id}')" style="margin-right: 0.25rem;">
                  <i class="bi bi-check me-1"></i>Confirmer
                </button>
                <button class="btn btn-sm btn-danger" onclick="cancelAppointment('${appointment.id}')">
                  <i class="bi bi-x me-1"></i>Refuser
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  appointmentsList.innerHTML = html;
}

// === CONFIRM APPOINTMENT ===
function confirmAppointment(appointmentId) {
  const appointments = loadData(KEY_APPOINTMENTS);
  const appointment = appointments.find(a => a.id === appointmentId);
  
  if (appointment) {
    appointment.status = 'confirmé';
    saveData(KEY_APPOINTMENTS, appointments);
    loadDashboardData();
    alert('Rendez-vous confirmé !');
  }
}

// === CANCEL APPOINTMENT ===
function cancelAppointment(appointmentId) {
  if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
    const appointments = loadData(KEY_APPOINTMENTS);
    const appointment = appointments.find(a => a.id === appointmentId);
    
    if (appointment) {
      appointment.status = 'annulé';
      saveData(KEY_APPOINTMENTS, appointments);
      loadDashboardData();
      alert('Rendez-vous annulé');
    }
  }
}

// === LOAD AVAILABILITY ===
function loadAvailability(vetId) {
  const availabilityList = document.getElementById('availabilityList');
  const availability = loadData(KEY_AVAILABILITY);
  const vetAvailability = availability.filter(a => a.vetId === vetId);

  if (!vetAvailability || vetAvailability.length === 0) {
    availabilityList.innerHTML = '<p style="color: #9ca3af;">Aucune disponibilité configurée</p>';
    return;
  }

  let html = '';
  const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  
  daysOfWeek.forEach(day => {
    const dayAvailability = vetAvailability.find(a => a.day === day);
    
    if (dayAvailability) {
      const status = dayAvailability.status === 'available' ? 'Disponible' : 'Indisponible';
      const statusColor = dayAvailability.status === 'available' ? 'success' : 'danger';
      
      html += `
        <div style="padding: 1rem; background: #f8fafc; border-radius: 8px; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="text-transform: capitalize; color: var(--dark-text);">${day}</strong>
            ${dayAvailability.status === 'available' ? `
              <p style="margin: 0.25rem 0 0 0; color: #6b7280; font-size: 0.9rem;">
                <i class="bi bi-clock me-1"></i>${dayAvailability.startTime || '08:00'} - ${dayAvailability.endTime || '17:00'}
              </p>
            ` : ''}
          </div>
          <span class="badge bg-${statusColor}">${status}</span>
        </div>
      `;
    }
  });

  availabilityList.innerHTML = html || '<p style="color: #9ca3af;">Aucune disponibilité configurée</p>';
}

// === SAVE AVAILABILITY ===
function saveAvailability() {
  const session = getSession();
  if (!session) return;

  const day = document.getElementById('daySelect').value;
  const status = document.getElementById('statusSelect').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  if (!day) {
    alert('Veuillez sélectionner un jour');
    return;
  }

  const availability = loadData(KEY_AVAILABILITY);
  
  // Remove existing entry for this day and vet
  const filtered = availability.filter(a => !(a.vetId === session.id && a.day === day));

  // Add new entry
  filtered.push({
    id: Date.now().toString(),
    vetId: session.id,
    day,
    status,
    startTime,
    endTime,
    createdAt: new Date().toISOString()
  });

  saveData(KEY_AVAILABILITY, filtered);

  // Reset form
  document.getElementById('daySelect').value = '';
  document.getElementById('statusSelect').value = 'available';
  document.getElementById('startTime').value = '';
  document.getElementById('endTime').value = '';

  loadAvailability(session.id);
  alert('Disponibilité sauvegardée !');
}

// === CLINIC FORM HANDLER ===
function setupClinicForm() {
  const form = document.getElementById('clinicForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const session = getSession();
    if (!session) return;

    const vets = loadData(KEY_VETS);
    const vet = vets.find(v => v.id === session.id);

    if (vet) {
      vet.phone = document.getElementById('vetPhone').value;
      vet.city = document.getElementById('vetCity').value;
      vet.clinic = document.getElementById('vetClinic').value;

      saveData(KEY_VETS, vets);

      // Update session
      session.clinic = vet.clinic;
      localStorage.setItem(KEY_SESSION, JSON.stringify(session));

      alert('Profil mis à jour avec succès !');
    }
  });
}

// === LOAD VET APPLICATIONS ===
function loadVetApplications(vetEmail) {
  const applicationsSection = document.getElementById('applicationsSection');
  if (!applicationsSection) return;

  const registrations = loadData(KEY_VET_REGISTRATIONS);
  const vetApplications = registrations.filter(r => r.personalInfo && r.personalInfo.email === vetEmail);

  if (!vetApplications || vetApplications.length === 0) {
    applicationsSection.innerHTML = `
      <div class="row">
        <div class="col-md-12">
          <div class="empty-state">
            <div class="empty-state-icon">
              <i class="bi bi-file-earmark-check"></i>
            </div>
            <p>Vous n'avez pas encore soumis de candidature</p>
            <a href="vets-register.html" class="btn btn-primary" style="margin-top: 1rem;">
              <i class="bi bi-plus me-2"></i>Soumettre une candidature
            </a>
          </div>
        </div>
      </div>
    `;
    return;
  }

  let html = '';
  vetApplications.forEach(app => {
    const status = app.status || 'En attente de vérification';
    let statusColor = '#f59e0b'; // warning yellow
    let statusIcon = 'bi-clock-history';
    
    if (status === 'Approuvé') {
      statusColor = '#10b981';
      statusIcon = 'bi-check-circle-fill';
    } else if (status === 'Rejeté') {
      statusColor = '#ef4444';
      statusIcon = 'bi-x-circle-fill';
    } else if (status === 'Entretien planifié') {
      statusColor = '#3b82f6';
      statusIcon = 'bi-calendar2-check';
    }

    const regDate = new Date(app.registrationDate).toLocaleDateString('fr-FR');
    const interviewDate = app.interviewDate ? new Date(app.interviewDate).toLocaleDateString('fr-FR') : 'Non planifié';

    html += `
      <div class="row mb-4">
        <div class="col-md-12">
          <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <div class="row align-items-start">
              <div class="col-md-8">
                <h5 style="color: var(--primary); margin: 0 0 0.5rem 0;">
                  <i class="bi bi-hospital me-2"></i>${app.professionalInfo?.clinicName || 'Clinique'}
                </h5>
                <div style="color: #6b7280; font-size: 0.95rem;">
                  <p style="margin: 0.25rem 0;"><strong>Spécialité :</strong> ${app.professionalInfo?.specialty || 'Non spécifiée'}</p>
                  <p style="margin: 0.25rem 0;"><strong>Expérience :</strong> ${app.professionalInfo?.experience || 0} ans</p>
                  <p style="margin: 0.25rem 0;"><strong>Ville :</strong> ${app.location?.city || 'Non spécifiée'}</p>
                  <p style="margin: 0.25rem 0;"><strong>Téléphone :</strong> ${app.personalInfo?.phone || 'Non fourni'}</p>
                  <p style="margin: 0.25rem 0;"><strong>Date de soumission :</strong> ${regDate}</p>
                </div>
              </div>
              <div class="col-md-4 text-md-end">
                <div style="padding: 1rem; background: #f8fafc; border-radius: 8px; border-left: 4px solid ${statusColor};">
                  <div style="color: ${statusColor}; font-weight: 700; margin-bottom: 0.5rem;">
                    <i class="bi ${statusIcon} me-1"></i>${status}
                  </div>
                  ${status === 'Entretien planifié' ? `
                    <p style="margin: 0.5rem 0 0 0; color: #6b7280; font-size: 0.9rem;">
                      <i class="bi bi-calendar me-1"></i>${interviewDate}
                    </p>
                  ` : ''}
                  ${status === 'En attente de vérification' ? `
                    <a href="vets-register.html" class="btn btn-sm btn-outline-primary" style="margin-top: 0.75rem; width: 100%;">
                      <i class="bi bi-pencil me-1"></i>Modifier
                    </a>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  applicationsSection.innerHTML = html;
}
