// === MASTER SYNCHRONIZATION SYSTEM ===
// Ensures bidirectional sync between client and vet systems

const SYNC_CONFIG = {
  VET_PROFILES: 'ph_vet_profiles',      // Registered vet accounts
  VET_LIST: 'ph_vet_list',              // Visible vet list for clients
  APPOINTMENTS: 'ph_appointments',      // Client -> Vet appointments
  RDV_CLIENT: 'ph_rdv',                 // Client RDV history
  SESSION: 'ph_session',                // Client session
  VET_SESSION: 'ph_vet_session'         // Vet session
};

class SyncSystem {
  // === INITIALIZE SYNC ===
  static init() {
    // Check and sync on page load
    this.syncVetProfiles();
    this.syncAppointments();
  }

  // === SYNC VET PROFILES TO CLIENT LIST ===
  static syncVetProfiles() {
    const profiles = JSON.parse(localStorage.getItem(SYNC_CONFIG.VET_PROFILES) || '[]');
    const vetList = JSON.parse(localStorage.getItem(SYNC_CONFIG.VET_LIST) || '[]');

    profiles.forEach(profile => {
      // Check if vet is already in client list
      const exists = vetList.find(v => v.email === profile.email);
      
      if (!exists) {
        // Add vet to client list
        vetList.push({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          city: profile.city,
          specialty: profile.specialty,
          phone: profile.phone,
          rating: 5.0,
          reviews: 0,
          isRegistered: true,
          registeredAt: profile.createdAt
        });
      }
    });

    localStorage.setItem(SYNC_CONFIG.VET_LIST, JSON.stringify(vetList));
  }

  // === SYNC APPOINTMENTS ===
  static syncAppointments() {
    const rdvList = JSON.parse(localStorage.getItem(SYNC_CONFIG.RDV_CLIENT) || '[]');
    const appointments = JSON.parse(localStorage.getItem(SYNC_CONFIG.APPOINTMENTS) || '[]');

    rdvList.forEach(rdv => {
      // Check if RDV is already in appointments
      const exists = appointments.find(apt => apt.id === rdv.id.toString());
      
      if (!exists) {
        // Sync RDV to appointments
        const vetList = JSON.parse(localStorage.getItem(SYNC_CONFIG.VET_LIST) || '[]');
        const vetInfo = vetList.find(v => v.name === rdv.vet);

        if (vetInfo) {
          const session = JSON.parse(localStorage.getItem(SYNC_CONFIG.SESSION) || 'null');
          
          appointments.push({
            id: rdv.id.toString(),
            vetEmail: vetInfo.email,
            vetName: vetInfo.name,
            vetCity: vetInfo.city,
            vetSpecialty: vetInfo.specialty,
            clientName: session ? session.name : 'Client',
            clientPhone: session ? session.phone : '',
            petName: rdv.animal,
            petType: rdv.animal,
            date: rdv.date,
            time: rdv.time,
            reason: rdv.reason,
            status: 'pending',
            createdAt: rdv.createdAt,
            notes: '',
            confirmationCode: rdv.confirmationCode
          });
        }
      }
    });

    localStorage.setItem(SYNC_CONFIG.APPOINTMENTS, JSON.stringify(appointments));
  }

  // === GET ALL VETS (CLIENT VIEW) ===
  static getAllVets() {
    const vetList = JSON.parse(localStorage.getItem(SYNC_CONFIG.VET_LIST) || '[]');
    return vetList;
  }

  // === GET VET APPOINTMENTS ===
  static getVetAppointments(vetEmail) {
    const appointments = JSON.parse(localStorage.getItem(SYNC_CONFIG.APPOINTMENTS) || '[]');
    return appointments.filter(apt => apt.vetEmail === vetEmail);
  }

  // === GET CLIENT RDVS ===
  static getClientRDVs() {
    return JSON.parse(localStorage.getItem(SYNC_CONFIG.RDV_CLIENT) || '[]');
  }

  // === UPDATE APPOINTMENT STATUS ===
  static updateAppointmentStatus(aptId, status, notes = '') {
    const appointments = JSON.parse(localStorage.getItem(SYNC_CONFIG.APPOINTMENTS) || '[]');
    const apt = appointments.find(a => a.id === aptId);

    if (apt) {
      apt.status = status;
      apt.notes = notes;
      apt.updatedAt = new Date().toISOString();
      localStorage.setItem(SYNC_CONFIG.APPOINTMENTS, JSON.stringify(appointments));
      return true;
    }
    return false;
  }

  // === REGISTER NEW VET ===
  static registerVet(vetData) {
    // Save to vet profiles
    const profiles = JSON.parse(localStorage.getItem(SYNC_CONFIG.VET_PROFILES) || '[]');
    profiles.push(vetData);
    localStorage.setItem(SYNC_CONFIG.VET_PROFILES, JSON.stringify(profiles));

    // Sync to vet list
    this.syncVetProfiles();

    return vetData;
  }

  // === CREATE APPOINTMENT FROM CLIENT RDV ===
  static createAppointmentFromRDV(rdvData, vetInfo, clientInfo) {
    const appointments = JSON.parse(localStorage.getItem(SYNC_CONFIG.APPOINTMENTS) || '[]');
    
    const appointment = {
      id: rdvData.id.toString(),
      vetEmail: vetInfo.email,
      vetName: vetInfo.name,
      vetCity: vetInfo.city,
      vetSpecialty: vetInfo.specialty,
      clientName: clientInfo.name,
      clientPhone: clientInfo.phone,
      petName: rdvData.animal,
      petType: rdvData.animal,
      date: rdvData.date,
      time: rdvData.time,
      reason: rdvData.reason,
      status: 'pending',
      createdAt: new Date().toISOString(),
      notes: rdvData.details || '',
      confirmationCode: rdvData.confirmationCode
    };

    if (!appointments.find(apt => apt.id === appointment.id)) {
      appointments.push(appointment);
      localStorage.setItem(SYNC_CONFIG.APPOINTMENTS, JSON.stringify(appointments));
    }

    return appointment;
  }

  // === GET SYNC STATUS ===
  static getSyncStatus() {
    return {
      vets: JSON.parse(localStorage.getItem(SYNC_CONFIG.VET_PROFILES) || '[]').length,
      appointments: JSON.parse(localStorage.getItem(SYNC_CONFIG.APPOINTMENTS) || '[]').length,
      clientRDVs: JSON.parse(localStorage.getItem(SYNC_CONFIG.RDV_CLIENT) || '[]').length,
      vetListSize: JSON.parse(localStorage.getItem(SYNC_CONFIG.VET_LIST) || '[]').length,
      lastSync: new Date().toISOString()
    };
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  SyncSystem.init();
});
