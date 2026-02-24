import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const DoctorDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentUser,
    doctors,
    getTodayAppointmentsForDoctor,
    getPendingRequestsForDoctor,
    getUpcomingAppointmentsForDoctor,
    getCompletedAppointmentsForDoctor,
    getPrescriptionsByDoctor,
    getPatientsForDoctor,
    getPatientHistoryForDoctor,
    getLabReportsByPatient,
    getHealthRecordsByPatient,
    getPrescriptionsByPatient,
    getNotificationsByUser,
    getUnreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    acceptAppointment,
    rejectAppointment,
    completeConsultation,
    addPrescription,
    updateDoctorProfile,
    updateDoctorAvailability,
    getUserById,
    getDoctorById,
  } = useAppContext();

  const [activeSection, setActiveSection] = useState(searchParams.get('section') || 'dashboard');

  // Sync activeSection with URL params
  useEffect(() => {
    const section = searchParams.get('section');
    if (section && section !== activeSection) {
      setActiveSection(section);
    }
  }, [searchParams]);

  // Update URL when activeSection changes
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSearchParams({ section });
  };

  const [activeAppointmentTab, setActiveAppointmentTab] = useState('pending');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showPatientRecordsModal, setShowPatientRecordsModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientRecordTab, setPatientRecordTab] = useState('appointments');

  // Get doctor profile
  const doctorProfile = getDoctorById(currentUser.id);

  // Consultation form
  const [consultationNotes, setConsultationNotes] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  // Prescription form
  const [prescriptionData, setPrescriptionData] = useState({
    medicines: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
    notes: '',
    diagnosis: '',
    followUpDate: ''
  });

  // Availability settings
  const [availabilitySettings, setAvailabilitySettings] = useState({
    workingHours: doctorProfile?.availability || 'Mon-Fri: 9AM-5PM',
    videoConsultation: doctorProfile?.consultationType?.includes('Video') || true,
    clinicConsultation: doctorProfile?.consultationType?.includes('Clinic') || true,
    leaveDays: []
  });

  // Get data
  const todayAppointments = getTodayAppointmentsForDoctor(currentUser.id);
  const pendingRequests = getPendingRequestsForDoctor(currentUser.id);
  const upcomingAppointments = getUpcomingAppointmentsForDoctor(currentUser.id);
  const completedAppointments = getCompletedAppointmentsForDoctor(currentUser.id);
  const myPrescriptions = getPrescriptionsByDoctor(currentUser.id);
  const myPatients = getPatientsForDoctor(currentUser.id);
  const notifications = getNotificationsByUser(currentUser.id);
  const unreadCount = getUnreadNotificationsCount(currentUser.id);

  // Handle accept appointment
  const handleAccept = (appointmentId) => {
    acceptAppointment(appointmentId);
  };

  // Handle reject appointment
  const handleReject = (appointmentId) => {
    const reason = prompt('Reason for rejection (optional):');
    rejectAppointment(appointmentId, reason || '');
  };

  // Start consultation
  const handleStartConsultation = (appointment) => {
    setSelectedAppointment(appointment);
    setConsultationNotes('');
    setDiagnosis('');
    setShowConsultationModal(true);
  };

  // View patient records
  const handleViewPatientRecords = (patientId) => {
    const patient = getUserById(patientId);
    setSelectedPatient(patient);
    setPatientRecordTab('appointments');
    setShowPatientRecordsModal(true);
  };

  // Complete consultation
  const handleCompleteConsultation = () => {
    if (!diagnosis) {
      alert('Please enter a diagnosis');
      return;
    }
    completeConsultation(selectedAppointment.id, consultationNotes, diagnosis);
    setShowConsultationModal(false);
    setShowPrescriptionModal(true);
  };

  // Add medicine row
  const addMedicineRow = () => {
    setPrescriptionData({
      ...prescriptionData,
      medicines: [...prescriptionData.medicines, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
    });
  };

  // Remove medicine row
  const removeMedicineRow = (index) => {
    const newMedicines = prescriptionData.medicines.filter((_, i) => i !== index);
    setPrescriptionData({ ...prescriptionData, medicines: newMedicines });
  };

  // Update medicine field
  const updateMedicine = (index, field, value) => {
    const newMedicines = [...prescriptionData.medicines];
    newMedicines[index][field] = value;
    setPrescriptionData({ ...prescriptionData, medicines: newMedicines });
  };

  // Save prescription
  const handleSavePrescription = () => {
    const validMedicines = prescriptionData.medicines.filter(m => m.name && m.dosage);
    if (validMedicines.length === 0) {
      alert('Please add at least one medicine');
      return;
    }

    addPrescription(
      selectedAppointment.id,
      selectedAppointment.patientId,
      currentUser.id,
      validMedicines,
      prescriptionData.notes,
      diagnosis || prescriptionData.diagnosis
    );

    setShowPrescriptionModal(false);
    setPrescriptionData({
      medicines: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
      notes: '',
      diagnosis: '',
      followUpDate: ''
    });
    alert('Prescription saved and sent to patient!');
  };

  // Skip prescription
  const handleSkipPrescription = () => {
    setShowPrescriptionModal(false);
    setPrescriptionData({
      medicines: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
      notes: '',
      diagnosis: '',
      followUpDate: ''
    });
  };

  // Save availability
  const handleSaveAvailability = () => {
    const consultationType = [];
    if (availabilitySettings.videoConsultation) consultationType.push('Video');
    if (availabilitySettings.clinicConsultation) consultationType.push('Clinic');

    updateDoctorAvailability(currentUser.id, {
      availability: availabilitySettings.workingHours,
      consultationType
    });
    alert('Availability settings saved!');
  };

  // Get patient data for records modal
  const getPatientAppointments = () => {
    if (!selectedPatient) return [];
    return getPatientHistoryForDoctor(currentUser.id, selectedPatient.id);
  };

  const getPatientPrescriptions = () => {
    if (!selectedPatient) return [];
    return getPrescriptionsByPatient(selectedPatient.id).filter(p => p.doctorId === currentUser.id);
  };

  const getPatientLabReports = () => {
    if (!selectedPatient) return [];
    return getLabReportsByPatient(selectedPatient.id);
  };

  const getPatientHealthRecords = () => {
    if (!selectedPatient) return [];
    return getHealthRecordsByPatient(selectedPatient.id);
  };

  return (
    <div className="doctor-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="greeting">
          <h1>Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, Dr. {currentUser.name.split(' ').pop()} 👋</h1>
          <p>{doctorProfile?.specialization} • {doctorProfile?.location}</p>
        </div>
        <div className="header-actions">
          <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
            <span className="bell-icon">🔔</span>
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </div>
          <div className="user-avatar doctor-avatar">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={() => markAllNotificationsAsRead(currentUser.id)}>
                Mark all read
              </button>
            )}
          </div>
          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="empty-notifications">No notifications</div>
            ) : (
              notifications.slice(0, 5).map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {notification.type === 'appointment' && '📅'}
                    {notification.type === 'prescription' && '💊'}
                    {notification.type === 'message' && '💬'}
                  </div>
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="dashboard-nav">
        <button 
          className={`nav-tab ${activeSection === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleSectionChange('dashboard')}
        >
          <span>🏠</span> Dashboard
        </button>
        <button 
          className={`nav-tab ${activeSection === 'appointments' ? 'active' : ''}`}
          onClick={() => handleSectionChange('appointments')}
        >
          <span>📅</span> Appointments
        </button>
        <button 
          className={`nav-tab ${activeSection === 'patients' ? 'active' : ''}`}
          onClick={() => handleSectionChange('patients')}
        >
          <span>👥</span> Patients
        </button>
        <button 
          className={`nav-tab ${activeSection === 'prescriptions' ? 'active' : ''}`}
          onClick={() => handleSectionChange('prescriptions')}
        >
          <span>💊</span> Prescriptions
        </button>
        <button 
          className={`nav-tab ${activeSection === 'schedule' ? 'active' : ''}`}
          onClick={() => handleSectionChange('schedule')}
        >
          <span>📆</span> Schedule
        </button>
        <button 
          className={`nav-tab ${activeSection === 'settings' ? 'active' : ''}`}
          onClick={() => handleSectionChange('settings')}
        >
          <span>⚙️</span> Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">

        {/* ==================== DASHBOARD HOME ==================== */}
        {activeSection === 'dashboard' && (
          <div className="section-dashboard">
            {/* Stats Row */}
            <div className="stats-grid">
              <div className="stat-card stat-primary">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <div className="stat-value">{todayAppointments.length}</div>
                  <div className="stat-label">Today's Appointments</div>
                </div>
              </div>
              <div className="stat-card stat-warning">
                <div className="stat-icon">⏳</div>
                <div className="stat-info">
                  <div className="stat-value">{pendingRequests.length}</div>
                  <div className="stat-label">Pending Requests</div>
                </div>
              </div>
              <div className="stat-card stat-info">
                <div className="stat-icon">📋</div>
                <div className="stat-info">
                  <div className="stat-value">{upcomingAppointments.length}</div>
                  <div className="stat-label">Upcoming</div>
                </div>
              </div>
              <div className="stat-card stat-success">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <div className="stat-value">{myPatients.length}</div>
                  <div className="stat-label">Total Patients</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => { handleSectionChange('appointments'); setActiveAppointmentTab('pending'); }}>
                  <span className="action-icon">📋</span>
                  <span>View Requests</span>
                </button>
                <button className="action-btn" onClick={() => handleSectionChange('patients')}>
                  <span className="action-icon">👥</span>
                  <span>Patient Records</span>
                </button>
                <button className="action-btn" onClick={() => handleSectionChange('schedule')}>
                  <span className="action-icon">📆</span>
                  <span>Set Availability</span>
                </button>
                <button className="action-btn" onClick={() => handleSectionChange('prescriptions')}>
                  <span className="action-icon">💊</span>
                  <span>Prescriptions</span>
                </button>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="today-schedule">
              <h2>📅 Today's Schedule</h2>
              {todayAppointments.length === 0 ? (
                <div className="empty-state small">
                  <span className="empty-icon">😊</span>
                  <h3>No Appointments Today</h3>
                  <p>Enjoy your free day!</p>
                </div>
              ) : (
                <div className="schedule-list">
                  {todayAppointments.map(apt => {
                    const patient = getUserById(apt.patientId);
                    return (
                      <div key={apt.id} className="schedule-item">
                        <div className="schedule-time">
                          <span className="time">{apt.time}</span>
                          <span className={`type-badge ${apt.type.toLowerCase()}`}>
                            {apt.type === 'Video' ? '📹' : '🏥'} {apt.type}
                          </span>
                        </div>
                        <div className="schedule-patient">
                          <div className="patient-avatar">{patient?.name.charAt(0)}</div>
                          <div className="patient-info">
                            <h4>{patient?.name}</h4>
                            <p>{patient?.profile?.age} yrs • {patient?.profile?.gender}</p>
                          </div>
                        </div>
                        <div className="schedule-symptoms">
                          <span className="symptom-label">Symptoms:</span>
                          <p>{apt.symptoms}</p>
                        </div>
                        <div className="schedule-actions">
                          <button className="btn-start" onClick={() => handleStartConsultation(apt)}>
                            {apt.type === 'Video' ? '📹 Join' : '🩺 Start'}
                          </button>
                          <button className="btn-record" onClick={() => handleViewPatientRecords(apt.patientId)}>
                            📋 Records
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pending Requests Preview */}
            {pendingRequests.length > 0 && (
              <div className="pending-preview">
                <h2>⏳ Pending Requests ({pendingRequests.length})</h2>
                <div className="pending-list">
                  {pendingRequests.slice(0, 3).map(apt => {
                    const patient = getUserById(apt.patientId);
                    return (
                      <div key={apt.id} className="pending-card">
                        <div className="pending-info">
                          <div className="patient-avatar small">{patient?.name.charAt(0)}</div>
                          <div>
                            <h4>{patient?.name}</h4>
                            <p>{apt.date} • {apt.time} • {apt.type}</p>
                          </div>
                        </div>
                        <div className="pending-actions">
                          <button className="btn-accept" onClick={() => handleAccept(apt.id)}>✓</button>
                          <button className="btn-reject" onClick={() => handleReject(apt.id)}>✕</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {pendingRequests.length > 3 && (
                  <button className="view-all-btn" onClick={() => { setActiveSection('appointments'); setActiveAppointmentTab('pending'); }}>
                    View All Requests →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================== APPOINTMENTS SECTION ==================== */}
        {activeSection === 'appointments' && (
          <div className="section-appointments">
            <div className="appointments-tabs">
              <button 
                className={`apt-tab ${activeAppointmentTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveAppointmentTab('pending')}
              >
                <span>⏳</span> Pending <span className="count">{pendingRequests.length}</span>
              </button>
              <button 
                className={`apt-tab ${activeAppointmentTab === 'today' ? 'active' : ''}`}
                onClick={() => setActiveAppointmentTab('today')}
              >
                <span>📅</span> Today <span className="count">{todayAppointments.length}</span>
              </button>
              <button 
                className={`apt-tab ${activeAppointmentTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveAppointmentTab('upcoming')}
              >
                <span>📋</span> Upcoming <span className="count">{upcomingAppointments.length}</span>
              </button>
              <button 
                className={`apt-tab ${activeAppointmentTab === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveAppointmentTab('completed')}
              >
                <span>✅</span> Completed <span className="count">{completedAppointments.length}</span>
              </button>
            </div>

            {/* Pending Requests Tab */}
            {activeAppointmentTab === 'pending' && (
              <div className="appointments-content">
                {pendingRequests.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">✅</span>
                    <h3>No Pending Requests</h3>
                    <p>All appointment requests have been processed</p>
                  </div>
                ) : (
                  <div className="appointment-list">
                    {pendingRequests.map(apt => {
                      const patient = getUserById(apt.patientId);
                      return (
                        <div key={apt.id} className="doctor-apt-card pending">
                          <div className="apt-patient">
                            <div className="patient-avatar">{patient?.name.charAt(0)}</div>
                            <div className="patient-details">
                              <h4>{patient?.name}</h4>
                              <p>{patient?.profile?.age} yrs • {patient?.profile?.gender} • {patient?.profile?.bloodGroup}</p>
                            </div>
                          </div>
                          <div className="apt-datetime">
                            <div className="date">
                              <span>📅</span> {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </div>
                            <div className="time">
                              <span>⏰</span> {apt.time}
                            </div>
                            <div className={`type ${apt.type.toLowerCase()}`}>
                              {apt.type === 'Video' ? '📹' : '🏥'} {apt.type}
                            </div>
                          </div>
                          <div className="apt-symptoms">
                            <strong>Symptoms:</strong>
                            <p>{apt.symptoms}</p>
                          </div>
                          <div className="apt-card-actions">
                            <button className="btn-accept-lg" onClick={() => handleAccept(apt.id)}>
                              <span>✓</span> Accept
                            </button>
                            <button className="btn-reject-lg" onClick={() => handleReject(apt.id)}>
                              <span>✕</span> Decline
                            </button>
                            <button className="btn-view-record" onClick={() => handleViewPatientRecords(apt.patientId)}>
                              📋 View Records
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Today's Appointments Tab */}
            {activeAppointmentTab === 'today' && (
              <div className="appointments-content">
                {todayAppointments.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">😊</span>
                    <h3>No Appointments Today</h3>
                    <p>Enjoy your free day!</p>
                  </div>
                ) : (
                  <div className="appointment-list">
                    {todayAppointments.map(apt => {
                      const patient = getUserById(apt.patientId);
                      return (
                        <div key={apt.id} className="doctor-apt-card today">
                          <div className="apt-patient">
                            <div className="patient-avatar">{patient?.name.charAt(0)}</div>
                            <div className="patient-details">
                              <h4>{patient?.name}</h4>
                              <p>{patient?.profile?.age} yrs • {patient?.profile?.gender}</p>
                            </div>
                          </div>
                          <div className="apt-datetime">
                            <div className="time large">{apt.time}</div>
                            <div className={`type ${apt.type.toLowerCase()}`}>
                              {apt.type === 'Video' ? '📹' : '🏥'} {apt.type}
                            </div>
                            <div className={`status status-${apt.status.toLowerCase()}`}>{apt.status}</div>
                          </div>
                          <div className="apt-symptoms">
                            <strong>Symptoms:</strong>
                            <p>{apt.symptoms}</p>
                          </div>
                          <div className="apt-card-actions">
                            <button className="btn-start-consult" onClick={() => handleStartConsultation(apt)}>
                              {apt.type === 'Video' ? '📹 Join Video Call' : '🩺 Start Consultation'}
                            </button>
                            <button className="btn-view-record" onClick={() => handleViewPatientRecords(apt.patientId)}>
                              📋 Records
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Upcoming Appointments Tab */}
            {activeAppointmentTab === 'upcoming' && (
              <div className="appointments-content">
                {upcomingAppointments.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">📭</span>
                    <h3>No Upcoming Appointments</h3>
                    <p>You have no scheduled appointments</p>
                  </div>
                ) : (
                  <div className="appointment-list">
                    {upcomingAppointments.map(apt => {
                      const patient = getUserById(apt.patientId);
                      return (
                        <div key={apt.id} className="doctor-apt-card upcoming">
                          <div className="apt-patient">
                            <div className="patient-avatar">{patient?.name.charAt(0)}</div>
                            <div className="patient-details">
                              <h4>{patient?.name}</h4>
                              <p>{patient?.profile?.age} yrs • {patient?.profile?.gender}</p>
                            </div>
                          </div>
                          <div className="apt-datetime">
                            <div className="date">
                              <span>📅</span> {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </div>
                            <div className="time">
                              <span>⏰</span> {apt.time}
                            </div>
                            <div className={`type ${apt.type.toLowerCase()}`}>
                              {apt.type === 'Video' ? '📹' : '🏥'} {apt.type}
                            </div>
                          </div>
                          <div className="apt-symptoms">
                            <strong>Symptoms:</strong>
                            <p>{apt.symptoms}</p>
                          </div>
                          <div className="apt-card-actions">
                            <button className="btn-view-record" onClick={() => handleViewPatientRecords(apt.patientId)}>
                              📋 View Patient Records
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Completed Appointments Tab */}
            {activeAppointmentTab === 'completed' && (
              <div className="appointments-content">
                {completedAppointments.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">📋</span>
                    <h3>No Completed Appointments</h3>
                    <p>Your completed consultations will appear here</p>
                  </div>
                ) : (
                  <div className="appointment-list">
                    {completedAppointments.slice(0, 10).map(apt => {
                      const patient = getUserById(apt.patientId);
                      return (
                        <div key={apt.id} className="doctor-apt-card completed">
                          <div className="apt-patient">
                            <div className="patient-avatar">{patient?.name.charAt(0)}</div>
                            <div className="patient-details">
                              <h4>{patient?.name}</h4>
                              <p>{patient?.profile?.age} yrs • {patient?.profile?.gender}</p>
                            </div>
                          </div>
                          <div className="apt-datetime">
                            <div className="date">
                              <span>📅</span> {apt.date}
                            </div>
                            {apt.diagnosis && (
                              <div className="diagnosis">
                                <span>🩺</span> {apt.diagnosis}
                              </div>
                            )}
                          </div>
                          <div className="apt-card-actions">
                            <button className="btn-view-record" onClick={() => handleViewPatientRecords(apt.patientId)}>
                              📋 View Records
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================== PATIENTS SECTION ==================== */}
        {activeSection === 'patients' && (
          <div className="section-patients">
            <h2>👥 My Patients ({myPatients.length})</h2>
            {myPatients.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">👥</span>
                <h3>No Patients Yet</h3>
                <p>Your patients will appear here after appointments</p>
              </div>
            ) : (
              <div className="patients-grid">
                {myPatients.map(patient => {
                  const patientAppointments = getPatientHistoryForDoctor(currentUser.id, patient.id);
                  const lastVisit = patientAppointments[0];
                  return (
                    <div key={patient.id} className="patient-card" onClick={() => handleViewPatientRecords(patient.id)}>
                      <div className="patient-card-header">
                        <div className="patient-avatar large">{patient.name.charAt(0)}</div>
                        <div className="patient-info">
                          <h3>{patient.name}</h3>
                          <p>{patient.profile?.age} yrs • {patient.profile?.gender}</p>
                        </div>
                      </div>
                      <div className="patient-card-body">
                        <div className="info-row">
                          <span className="label">Blood Group:</span>
                          <span className="value">{patient.profile?.bloodGroup || 'N/A'}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">Total Visits:</span>
                          <span className="value">{patientAppointments.length}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">Last Visit:</span>
                          <span className="value">{lastVisit?.date || 'N/A'}</span>
                        </div>
                        {patient.profile?.allergies?.length > 0 && (
                          <div className="allergies">
                            <span className="label">⚠️ Allergies:</span>
                            <div className="allergy-tags">
                              {patient.profile.allergies.map((a, i) => (
                                <span key={i} className="allergy-tag">{a}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="patient-card-footer">
                        <button className="btn-view-full">View Full Records →</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================== PRESCRIPTIONS SECTION ==================== */}
        {activeSection === 'prescriptions' && (
          <div className="section-prescriptions">
            <h2>💊 My Prescriptions ({myPrescriptions.length})</h2>
            {myPrescriptions.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">💊</span>
                <h3>No Prescriptions Yet</h3>
                <p>Prescriptions you create will appear here</p>
              </div>
            ) : (
              <div className="prescriptions-list">
                {myPrescriptions.map(pres => {
                  const patient = getUserById(pres.patientId);
                  return (
                    <div key={pres.id} className="doctor-pres-card">
                      <div className="pres-header">
                        <div className="pres-patient">
                          <div className="patient-avatar small">{patient?.name.charAt(0)}</div>
                          <div>
                            <h4>{patient?.name}</h4>
                            <p>Prescription #{pres.id}</p>
                          </div>
                        </div>
                        <div className="pres-meta">
                          <span className="pres-date">📅 {new Date(pres.createdAt).toLocaleDateString()}</span>
                          <span className={`pres-status status-${pres.status.toLowerCase()}`}>{pres.status}</span>
                        </div>
                      </div>
                      {pres.diagnosis && (
                        <div className="pres-diagnosis">
                          <span>🩺 Diagnosis:</span> {pres.diagnosis}
                        </div>
                      )}
                      <div className="pres-medicines">
                        <h5>Medicines:</h5>
                        <ul>
                          {pres.medicines.map((med, idx) => (
                            <li key={idx}>
                              <span className="med-name">💊 {med.name}</span>
                              <span className="med-info">{med.dosage} • {med.frequency} • {med.duration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {pres.notes && (
                        <div className="pres-notes">
                          <span>📝 Notes:</span> {pres.notes}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================== SCHEDULE / AVAILABILITY SECTION ==================== */}
        {activeSection === 'schedule' && (
          <div className="section-schedule">
            <h2>📆 Manage Availability</h2>
            <div className="schedule-grid">
              <div className="schedule-card">
                <h3>Working Hours</h3>
                <div className="form-group">
                  <label>Set your working hours</label>
                  <input
                    type="text"
                    value={availabilitySettings.workingHours}
                    onChange={(e) => setAvailabilitySettings({...availabilitySettings, workingHours: e.target.value})}
                    placeholder="e.g., Mon-Fri: 9AM-5PM"
                  />
                </div>
              </div>

              <div className="schedule-card">
                <h3>Consultation Types</h3>
                <div className="toggle-group">
                  <label className="toggle-item">
                    <input
                      type="checkbox"
                      checked={availabilitySettings.videoConsultation}
                      onChange={(e) => setAvailabilitySettings({...availabilitySettings, videoConsultation: e.target.checked})}
                    />
                    <span className="toggle-label">📹 Video Consultation</span>
                    <span className={`toggle-status ${availabilitySettings.videoConsultation ? 'enabled' : 'disabled'}`}>
                      {availabilitySettings.videoConsultation ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                  <label className="toggle-item">
                    <input
                      type="checkbox"
                      checked={availabilitySettings.clinicConsultation}
                      onChange={(e) => setAvailabilitySettings({...availabilitySettings, clinicConsultation: e.target.checked})}
                    />
                    <span className="toggle-label">🏥 Clinic Visit</span>
                    <span className={`toggle-status ${availabilitySettings.clinicConsultation ? 'enabled' : 'disabled'}`}>
                      {availabilitySettings.clinicConsultation ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="schedule-card full-width">
                <h3>Current Profile Info</h3>
                <div className="profile-info-grid">
                  <div className="info-item">
                    <span className="label">Specialization:</span>
                    <span className="value">{doctorProfile?.specialization}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Experience:</span>
                    <span className="value">{doctorProfile?.experience}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Location:</span>
                    <span className="value">{doctorProfile?.location}, {doctorProfile?.city}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Consultation Fee:</span>
                    <span className="value">${doctorProfile?.fee}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Rating:</span>
                    <span className="value">⭐ {doctorProfile?.rating} ({doctorProfile?.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn-save-availability" onClick={handleSaveAvailability}>
              💾 Save Availability Settings
            </button>
          </div>
        )}

        {/* ==================== SETTINGS SECTION ==================== */}
        {activeSection === 'settings' && (
          <div className="section-settings">
            <h2>⚙️ Account Settings</h2>
            <div className="settings-grid">
              <div className="settings-card">
                <h3>Profile Information</h3>
                <div className="settings-info">
                  <div className="info-row">
                    <span className="label">Name:</span>
                    <span className="value">{currentUser.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Email:</span>
                    <span className="value">{currentUser.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Phone:</span>
                    <span className="value">{currentUser.phone || 'Not set'}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Role:</span>
                    <span className="value">{currentUser.role}</span>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <h3>Professional Details</h3>
                <div className="settings-info">
                  <div className="info-row">
                    <span className="label">Specialization:</span>
                    <span className="value">{doctorProfile?.specialization}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Education:</span>
                    <span className="value">{doctorProfile?.education}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Languages:</span>
                    <span className="value">{doctorProfile?.languages?.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================== CONSULTATION MODAL ==================== */}
      {showConsultationModal && selectedAppointment && (
        <div className="modal-overlay" onClick={() => setShowConsultationModal(false)}>
          <div className="modal consultation-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowConsultationModal(false)}>×</button>
            
            <div className="consultation-header">
              <h2>🩺 Consultation</h2>
              <p>Patient: {getUserById(selectedAppointment.patientId)?.name}</p>
            </div>

            <div className="consultation-body">
              {/* Patient Info Panel */}
              <div className="patient-panel">
                <h3>Patient Details</h3>
                {(() => {
                  const patient = getUserById(selectedAppointment.patientId);
                  return (
                    <div className="patient-details-grid">
                      <div className="detail">
                        <span className="label">Age:</span>
                        <span>{patient?.profile?.age} yrs</span>
                      </div>
                      <div className="detail">
                        <span className="label">Gender:</span>
                        <span>{patient?.profile?.gender}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Blood Group:</span>
                        <span>{patient?.profile?.bloodGroup}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Allergies:</span>
                        <span>{patient?.profile?.allergies?.join(', ') || 'None'}</span>
                      </div>
                      <div className="detail">
                        <span className="label">Conditions:</span>
                        <span>{patient?.profile?.conditions?.join(', ') || 'None'}</span>
                      </div>
                    </div>
                  );
                })()}

                <div className="symptoms-section">
                  <h4>Presented Symptoms</h4>
                  <p>{selectedAppointment.symptoms}</p>
                </div>

                {selectedAppointment.type === 'Video' && (
                  <div className="video-section">
                    <button className="btn-video-call">
                      📹 Join Video Call
                    </button>
                    <p className="video-hint">Video consultation will open in a new window</p>
                  </div>
                )}
              </div>

              {/* Notes Section */}
              <div className="notes-panel">
                <h3>Consultation Notes</h3>
                <textarea
                  value={consultationNotes}
                  onChange={(e) => setConsultationNotes(e.target.value)}
                  placeholder="Enter consultation notes..."
                  rows="5"
                />

                <h3>Diagnosis</h3>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Enter diagnosis..."
                />

                <div className="file-upload">
                  <h4>Attach Files (optional)</h4>
                  <div className="upload-area">
                    <span>📎</span>
                    <p>Drop files here or click to upload</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="consultation-footer">
              <button className="btn-cancel" onClick={() => setShowConsultationModal(false)}>
                Cancel
              </button>
              <button className="btn-complete" onClick={handleCompleteConsultation}>
                Complete & Add Prescription →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PRESCRIPTION MODAL ==================== */}
      {showPrescriptionModal && selectedAppointment && (
        <div className="modal-overlay" onClick={() => handleSkipPrescription()}>
          <div className="modal prescription-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => handleSkipPrescription()}>×</button>
            
            <div className="prescription-header">
              <h2>💊 Create Prescription</h2>
              <p>For: {getUserById(selectedAppointment.patientId)?.name}</p>
              {diagnosis && <p className="diagnosis-label">Diagnosis: {diagnosis}</p>}
            </div>

            <div className="prescription-body">
              <div className="medicines-section">
                <h3>Medicines</h3>
                {prescriptionData.medicines.map((med, index) => (
                  <div key={index} className="medicine-row">
                    <div className="medicine-inputs">
                      <input
                        type="text"
                        placeholder="Medicine name"
                        value={med.name}
                        onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Dosage (e.g., 500mg)"
                        value={med.dosage}
                        onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Frequency (e.g., Twice daily)"
                        value={med.frequency}
                        onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., 7 days)"
                        value={med.duration}
                        onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Instructions"
                        value={med.instructions}
                        onChange={(e) => updateMedicine(index, 'instructions', e.target.value)}
                      />
                    </div>
                    {prescriptionData.medicines.length > 1 && (
                      <button className="btn-remove-med" onClick={() => removeMedicineRow(index)}>✕</button>
                    )}
                  </div>
                ))}
                <button className="btn-add-medicine" onClick={addMedicineRow}>
                  + Add Another Medicine
                </button>
              </div>

              <div className="prescription-notes">
                <h3>Additional Notes</h3>
                <textarea
                  value={prescriptionData.notes}
                  onChange={(e) => setPrescriptionData({...prescriptionData, notes: e.target.value})}
                  placeholder="Any special instructions for the patient..."
                  rows="3"
                />
              </div>

              <div className="follow-up-section">
                <h3>Follow-up Date (optional)</h3>
                <input
                  type="date"
                  value={prescriptionData.followUpDate}
                  onChange={(e) => setPrescriptionData({...prescriptionData, followUpDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="prescription-footer">
              <button className="btn-skip" onClick={handleSkipPrescription}>
                Skip Prescription
              </button>
              <button className="btn-save-pres" onClick={handleSavePrescription}>
                💾 Save & Send Prescription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PATIENT RECORDS MODAL ==================== */}
      {showPatientRecordsModal && selectedPatient && (
        <div className="modal-overlay" onClick={() => setShowPatientRecordsModal(false)}>
          <div className="modal patient-records-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPatientRecordsModal(false)}>×</button>
            
            <div className="records-header">
              <div className="patient-banner">
                <div className="patient-avatar large">{selectedPatient.name.charAt(0)}</div>
                <div className="patient-info">
                  <h2>{selectedPatient.name}</h2>
                  <p>{selectedPatient.profile?.age} yrs • {selectedPatient.profile?.gender} • {selectedPatient.profile?.bloodGroup}</p>
                </div>
              </div>
              {selectedPatient.profile?.allergies?.length > 0 && (
                <div className="allergies-warning">
                  ⚠️ Allergies: {selectedPatient.profile.allergies.join(', ')}
                </div>
              )}
            </div>

            <div className="records-tabs">
              <button 
                className={`record-tab ${patientRecordTab === 'appointments' ? 'active' : ''}`}
                onClick={() => setPatientRecordTab('appointments')}
              >
                Past Appointments
              </button>
              <button 
                className={`record-tab ${patientRecordTab === 'prescriptions' ? 'active' : ''}`}
                onClick={() => setPatientRecordTab('prescriptions')}
              >
                Prescriptions
              </button>
              <button 
                className={`record-tab ${patientRecordTab === 'labReports' ? 'active' : ''}`}
                onClick={() => setPatientRecordTab('labReports')}
              >
                Lab Reports
              </button>
              <button 
                className={`record-tab ${patientRecordTab === 'history' ? 'active' : ''}`}
                onClick={() => setPatientRecordTab('history')}
              >
                Medical History
              </button>
            </div>

            <div className="records-content">
              {patientRecordTab === 'appointments' && (
                <div className="records-list">
                  {getPatientAppointments().length === 0 ? (
                    <div className="empty-records">No appointment history with this patient</div>
                  ) : (
                    getPatientAppointments().map(apt => (
                      <div key={apt.id} className="record-item">
                        <div className="record-date">{apt.date}</div>
                        <div className="record-details">
                          <strong>Symptoms:</strong> {apt.symptoms}
                          {apt.diagnosis && <><br/><strong>Diagnosis:</strong> {apt.diagnosis}</>}
                          {apt.notes && <><br/><strong>Notes:</strong> {apt.notes}</>}
                        </div>
                        <div className={`record-status status-${apt.status.toLowerCase()}`}>{apt.status}</div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {patientRecordTab === 'prescriptions' && (
                <div className="records-list">
                  {getPatientPrescriptions().length === 0 ? (
                    <div className="empty-records">No prescriptions for this patient</div>
                  ) : (
                    getPatientPrescriptions().map(pres => (
                      <div key={pres.id} className="record-item prescription">
                        <div className="record-date">{new Date(pres.createdAt).toLocaleDateString()}</div>
                        <div className="record-details">
                          {pres.diagnosis && <><strong>Diagnosis:</strong> {pres.diagnosis}<br/></>}
                          <strong>Medicines:</strong>
                          <ul>
                            {pres.medicines.map((m, i) => (
                              <li key={i}>{m.name} - {m.dosage} ({m.frequency})</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {patientRecordTab === 'labReports' && (
                <div className="records-list">
                  {getPatientLabReports().length === 0 ? (
                    <div className="empty-records">No lab reports available</div>
                  ) : (
                    getPatientLabReports().map(report => (
                      <div key={report.id} className="record-item lab">
                        <div className="record-date">{report.date}</div>
                        <div className="record-details">
                          <strong>{report.name}</strong> - {report.type}
                          <br/><span className="lab-info">Lab: {report.lab}</span>
                        </div>
                        <button className="btn-view-report">View Results</button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {patientRecordTab === 'history' && (
                <div className="records-list">
                  <div className="health-summary">
                    <div className="summary-item">
                      <strong>Conditions:</strong>
                      <span>{selectedPatient.profile?.conditions?.join(', ') || 'None reported'}</span>
                    </div>
                    <div className="summary-item">
                      <strong>Allergies:</strong>
                      <span>{selectedPatient.profile?.allergies?.join(', ') || 'None reported'}</span>
                    </div>
                  </div>
                  {getPatientHealthRecords().length === 0 ? (
                    <div className="empty-records">No medical history records</div>
                  ) : (
                    getPatientHealthRecords().map(record => (
                      <div key={record.id} className="record-item history">
                        <div className="record-date">{record.date}</div>
                        <div className="record-details">
                          <span className={`record-type type-${record.type.toLowerCase()}`}>{record.type}</span>
                          <strong>{record.title}</strong>
                          <p>{record.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
