import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const PatientDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentUser,
    doctors,
    getUpcomingAppointments,
    getPastAppointments,
    getPrescriptionsByPatient,
    getLabReportsByPatient,
    getHealthRecordsByPatient,
    getMedicineOrdersByPatient,
    getNotificationsByUser,
    getUnreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment,
    createMedicineOrder,
    searchDoctors,
    getSpecializations,
    getCities,
    getDoctorById,
    updateUserProfile
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

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    city: '',
    consultationType: '',
    maxFee: '',
    minRating: ''
  });
  
  // Booking states
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    type: 'Clinic',
    symptoms: ''
  });

  // Get data
  const upcomingAppointments = getUpcomingAppointments(currentUser.id);
  const pastAppointments = getPastAppointments(currentUser.id);
  const prescriptions = getPrescriptionsByPatient(currentUser.id);
  const labReports = getLabReportsByPatient(currentUser.id);
  const healthRecords = getHealthRecordsByPatient(currentUser.id);
  const medicineOrders = getMedicineOrdersByPatient(currentUser.id);
  const notifications = getNotificationsByUser(currentUser.id);
  const unreadCount = getUnreadNotificationsCount(currentUser.id);

  // Filtered doctors
  const filteredDoctors = searchDoctors(searchQuery, {
    specialization: filters.specialization,
    city: filters.city,
    consultationType: filters.consultationType,
    maxFee: filters.maxFee ? parseInt(filters.maxFee) : null,
    minRating: filters.minRating ? parseFloat(filters.minRating) : null
  });

  const specializations = getSpecializations();
  const cities = getCities();

  // Get next appointment
  const nextAppointment = upcomingAppointments[0];

  // Handle booking
  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorModal(true);
  };

  const handleStartBooking = () => {
    setShowDoctorModal(false);
    setShowBookingModal(true);
    setBookingStep(1);
    setBookingData({ date: '', time: '', type: 'Clinic', symptoms: '' });
  };

  const handleConfirmBooking = () => {
    if (!bookingData.date || !bookingData.time || !bookingData.symptoms) {
      alert('Please fill in all required fields');
      return;
    }
    
    bookAppointment(
      selectedDoctor.id,
      currentUser.id,
      bookingData.date,
      bookingData.time,
      bookingData.type,
      bookingData.symptoms
    );
    
    setShowBookingModal(false);
    setSelectedDoctor(null);
    setBookingData({ date: '', time: '', type: 'Clinic', symptoms: '' });
    alert('Appointment booked successfully!');
  };

  const handleCancelAppointment = (appointmentId) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(appointmentId);
    }
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleConfirmReschedule = (newDate, newTime) => {
    rescheduleAppointment(selectedAppointment.id, newDate, newTime);
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
  };

  const handleOrderMedicines = (prescription) => {
    const medicines = prescription.medicines.map(med => ({
      name: med.name,
      quantity: 1,
      price: Math.random() * 20 + 5 // Mock price
    }));
    createMedicineOrder(prescription.id, currentUser.id, medicines, '123 Main St, New York, NY');
    alert('Medicine order placed successfully!');
  };

  // Generate available dates (next 14 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  return (
    <div className="patient-dashboard">
      {/* Header with greeting and notifications */}
      <div className="dashboard-header">
        <div className="greeting">
          <h1>Hello, {currentUser.name.split(' ')[0]} 👋</h1>
          <p>Welcome back! Here's your health summary</p>
        </div>
        <div className="header-actions">
          <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
            <span className="bell-icon">🔔</span>
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </div>
          <div className="user-avatar">
            {currentUser.name.charAt(0)}
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
                    {notification.type === 'labReport' && '🧪'}
                    {notification.type === 'order' && '📦'}
                    {notification.type === 'reminder' && '⏰'}
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

      {/* Navigation Tabs */}
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
          className={`nav-tab ${activeSection === 'prescriptions' ? 'active' : ''}`}
          onClick={() => handleSectionChange('prescriptions')}
        >
          <span>💊</span> Prescriptions
        </button>
        <button 
          className={`nav-tab ${activeSection === 'labReports' ? 'active' : ''}`}
          onClick={() => handleSectionChange('labReports')}
        >
          <span>🧪</span> Lab Reports
        </button>
        <button 
          className={`nav-tab ${activeSection === 'orders' ? 'active' : ''}`}
          onClick={() => handleSectionChange('orders')}
        >
          <span>📦</span> Orders
        </button>
        <button 
          className={`nav-tab ${activeSection === 'records' ? 'active' : ''}`}
          onClick={() => handleSectionChange('records')}
        >
          <span>📋</span> Health Records
        </button>
        <button 
          className={`nav-tab ${activeSection === 'profile' ? 'active' : ''}`}
          onClick={() => handleSectionChange('profile')}
        >
          <span>👤</span> Profile
        </button>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
        
        {/* ==================== DASHBOARD HOME ==================== */}
        {activeSection === 'dashboard' && (
          <div className="section-dashboard">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card stat-primary">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <div className="stat-value">{upcomingAppointments.length}</div>
                  <div className="stat-label">Upcoming Appointments</div>
                </div>
              </div>
              <div className="stat-card stat-success">
                <div className="stat-icon">💊</div>
                <div className="stat-info">
                  <div className="stat-value">{prescriptions.filter(p => p.status === 'Active').length}</div>
                  <div className="stat-label">Active Prescriptions</div>
                </div>
              </div>
              <div className="stat-card stat-info">
                <div className="stat-icon">🧪</div>
                <div className="stat-info">
                  <div className="stat-value">{labReports.length}</div>
                  <div className="stat-label">Lab Reports</div>
                </div>
              </div>
              <div className="stat-card stat-warning">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <div className="stat-value">{medicineOrders.filter(o => o.status !== 'Delivered').length}</div>
                  <div className="stat-label">Pending Orders</div>
                </div>
              </div>
            </div>

            {/* Next Appointment Card */}
            {nextAppointment && (
              <div className="next-appointment-card">
                <div className="card-badge">Next Appointment</div>
                <div className="appointment-details">
                  <div className="doctor-info">
                    <div className="doctor-avatar">
                      <img src={getDoctorById(nextAppointment.doctorId)?.imageUrl} alt={getDoctorById(nextAppointment.doctorId)?.name} />
                    </div>
                    <div className="doctor-text">
                      <h3>{getDoctorById(nextAppointment.doctorId)?.name}</h3>
                      <p>{getDoctorById(nextAppointment.doctorId)?.specialization}</p>
                    </div>
                  </div>
                  <div className="appointment-meta">
                    <div className="meta-item">
                      <span className="meta-icon">📅</span>
                      <span>{new Date(nextAppointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">⏰</span>
                      <span>{nextAppointment.time}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">{nextAppointment.type === 'Video' ? '📹' : '🏥'}</span>
                      <span>{nextAppointment.type} Consultation</span>
                    </div>
                  </div>
                  <div className="appointment-actions">
                    {nextAppointment.type === 'Video' && nextAppointment.status === 'Confirmed' && (
                      <button className="btn-join">
                        <span>📹</span> Join Now
                      </button>
                    )}
                    <button className="btn-reschedule" onClick={() => handleReschedule(nextAppointment)}>
                      Reschedule
                    </button>
                    <button className="btn-cancel" onClick={() => handleCancelAppointment(nextAppointment.id)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => handleSectionChange('appointments')}>
                  <span className="action-icon">📅</span>
                  <span>Book Appointment</span>
                </button>
                <button className="action-btn" onClick={() => handleSectionChange('labReports')}>
                  <span className="action-icon">📤</span>
                  <span>Upload Report</span>
                </button>
                <button className="action-btn" onClick={() => handleSectionChange('orders')}>
                  <span className="action-icon">💊</span>
                  <span>Order Medicines</span>
                </button>
                <button className="action-btn" onClick={() => handleSectionChange('records')}>
                  <span className="action-icon">📋</span>
                  <span>View Records</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {pastAppointments.slice(0, 3).map(apt => (
                  <div key={apt.id} className="activity-item">
                    <div className="activity-icon">✅</div>
                    <div className="activity-content">
                      <div className="activity-title">
                        Consultation with {getDoctorById(apt.doctorId)?.name}
                      </div>
                      <div className="activity-date">{apt.date}</div>
                    </div>
                    <span className="activity-badge completed">Completed</span>
                  </div>
                ))}
                {prescriptions.slice(0, 2).map(pres => (
                  <div key={pres.id} className="activity-item">
                    <div className="activity-icon">💊</div>
                    <div className="activity-content">
                      <div className="activity-title">
                        Prescription from {getDoctorById(pres.doctorId)?.name}
                      </div>
                      <div className="activity-date">{new Date(pres.createdAt).toLocaleDateString()}</div>
                    </div>
                    <span className="activity-badge active">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== APPOINTMENTS SECTION ==================== */}
        {activeSection === 'appointments' && (
          <div className="section-appointments">
            {/* Search & Filters */}
            <div className="search-section">
              <h2>Find & Book Doctors</h2>
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search doctors by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filters-row">
                <select
                  value={filters.specialization}
                  onChange={(e) => setFilters({...filters, specialization: e.target.value})}
                >
                  <option value="">All Specializations</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                <select
                  value={filters.city}
                  onChange={(e) => setFilters({...filters, city: e.target.value})}
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <select
                  value={filters.consultationType}
                  onChange={(e) => setFilters({...filters, consultationType: e.target.value})}
                >
                  <option value="">All Types</option>
                  <option value="Video">Video Consultation</option>
                  <option value="Clinic">Clinic Visit</option>
                </select>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters({...filters, minRating: e.target.value})}
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>

            {/* Doctors List */}
            <div className="doctors-grid">
              {filteredDoctors.map(doctor => (
                <div key={doctor.id} className="doctor-card" onClick={() => handleSelectDoctor(doctor)}>
                  <div className="doctor-card-header">
                    <div className="doctor-avatar-large">
                      <img src={doctor.imageUrl} alt={doctor.name} />
                    </div>
                    <div className="doctor-rating">
                      <span>⭐</span> {doctor.rating} ({doctor.reviews})
                    </div>
                  </div>
                  <div className="doctor-card-body">
                    <h3>{doctor.name}</h3>
                    <p className="specialization">{doctor.specialization}</p>
                    <p className="experience">{doctor.experience} experience</p>
                    <p className="location">📍 {doctor.location}, {doctor.city}</p>
                    <div className="consultation-types">
                      {doctor.consultationType.map(type => (
                        <span key={type} className={`type-badge ${type.toLowerCase()}`}>
                          {type === 'Video' ? '📹' : '🏥'} {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="doctor-card-footer">
                    <div className="fee">
                      <span className="fee-label">Consultation Fee</span>
                      <span className="fee-amount">${doctor.fee}</span>
                    </div>
                    <button className="book-btn">Book Now</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Appointments */}
            <div className="appointments-section">
              <h2>📅 Upcoming Appointments ({upcomingAppointments.length})</h2>
              {upcomingAppointments.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📭</span>
                  <h3>No Upcoming Appointments</h3>
                  <p>Book an appointment with a doctor above</p>
                </div>
              ) : (
                <div className="appointments-list">
                  {upcomingAppointments.map(apt => {
                    const doctor = getDoctorById(apt.doctorId);
                    return (
                      <div key={apt.id} className="appointment-card">
                        <div className="apt-doctor">
                          <div className="apt-avatar">
                            <img src={doctor?.imageUrl} alt={doctor?.name} />
                          </div>
                          <div className="apt-info">
                            <h4>{doctor?.name}</h4>
                            <p>{doctor?.specialization}</p>
                          </div>
                        </div>
                        <div className="apt-details">
                          <div className="apt-detail">
                            <span>📅</span> {apt.date}
                          </div>
                          <div className="apt-detail">
                            <span>⏰</span> {apt.time}
                          </div>
                          <div className="apt-detail">
                            <span>{apt.type === 'Video' ? '📹' : '🏥'}</span> {apt.type}
                          </div>
                        </div>
                        <div className={`apt-status status-${apt.status.toLowerCase()}`}>
                          {apt.status}
                        </div>
                        <div className="apt-actions">
                          {apt.type === 'Video' && apt.status === 'Confirmed' && (
                            <button className="btn-sm btn-primary">Join</button>
                          )}
                          <button className="btn-sm btn-secondary" onClick={() => handleReschedule(apt)}>
                            Reschedule
                          </button>
                          <button className="btn-sm btn-danger" onClick={() => handleCancelAppointment(apt.id)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Past Appointments */}
            <div className="appointments-section">
              <h2>📜 Past Appointments ({pastAppointments.length})</h2>
              {pastAppointments.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📋</span>
                  <h3>No Past Appointments</h3>
                </div>
              ) : (
                <div className="appointments-list">
                  {pastAppointments.map(apt => {
                    const doctor = getDoctorById(apt.doctorId);
                    return (
                      <div key={apt.id} className="appointment-card past">
                        <div className="apt-doctor">
                          <div className="apt-avatar">
                            <img src={doctor?.imageUrl} alt={doctor?.name} />
                          </div>
                          <div className="apt-info">
                            <h4>{doctor?.name}</h4>
                            <p>{doctor?.specialization}</p>
                          </div>
                        </div>
                        <div className="apt-details">
                          <div className="apt-detail">
                            <span>📅</span> {apt.date}
                          </div>
                          {apt.diagnosis && (
                            <div className="apt-detail">
                              <span>🩺</span> {apt.diagnosis}
                            </div>
                          )}
                        </div>
                        <div className={`apt-status status-completed`}>
                          Completed
                        </div>
                        <div className="apt-actions">
                          {apt.prescriptionId && (
                            <button className="btn-sm btn-secondary" onClick={() => handleSectionChange('prescriptions')}>
                              View Prescription
                            </button>
                          )}
                          <button className="btn-sm btn-primary" onClick={() => handleSelectDoctor(doctor)}>
                            Book Again
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== PRESCRIPTIONS SECTION ==================== */}
        {activeSection === 'prescriptions' && (
          <div className="section-prescriptions">
            <h2>💊 My Prescriptions</h2>
            {prescriptions.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">💊</span>
                <h3>No Prescriptions</h3>
                <p>Your prescriptions will appear here after consultations</p>
              </div>
            ) : (
              <div className="prescriptions-grid">
                {prescriptions.map(pres => {
                  const doctor = getDoctorById(pres.doctorId);
                  return (
                    <div key={pres.id} className="prescription-card">
                      <div className="pres-header">
                        <div className="pres-id">Prescription #{pres.id}</div>
                        <div className={`pres-status status-${pres.status.toLowerCase()}`}>
                          {pres.status}
                        </div>
                      </div>
                      <div className="pres-doctor">
                        <span>👨‍⚕️</span> {doctor?.name}
                      </div>
                      <div className="pres-date">
                        <span>📅</span> {new Date(pres.createdAt).toLocaleDateString()}
                      </div>
                      {pres.diagnosis && (
                        <div className="pres-diagnosis">
                          <span>🩺</span> Diagnosis: {pres.diagnosis}
                        </div>
                      )}
                      <div className="pres-medicines">
                        <h4>Medicines</h4>
                        <ul>
                          {pres.medicines.map((med, idx) => (
                            <li key={idx}>
                              <div className="med-name">💊 {med.name}</div>
                              <div className="med-details">
                                {med.dosage} • {med.frequency} • {med.duration}
                              </div>
                              {med.instructions && (
                                <div className="med-instructions">📝 {med.instructions}</div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {pres.notes && (
                        <div className="pres-notes">
                          <h4>Doctor's Notes</h4>
                          <p>{pres.notes}</p>
                        </div>
                      )}
                      <div className="pres-actions">
                        <button className="btn-download">
                          <span>📄</span> Download PDF
                        </button>
                        <button className="btn-order" onClick={() => handleOrderMedicines(pres)}>
                          <span>🛒</span> Order Medicines
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================== LAB REPORTS SECTION ==================== */}
        {activeSection === 'labReports' && (
          <div className="section-lab-reports">
            <div className="section-header">
              <h2>🧪 Lab Reports</h2>
              <button className="btn-upload">
                <span>📤</span> Upload Report
              </button>
            </div>
            {labReports.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🧪</span>
                <h3>No Lab Reports</h3>
                <p>Upload your lab reports to keep track of your health</p>
              </div>
            ) : (
              <div className="reports-grid">
                {labReports.map(report => (
                  <div key={report.id} className="report-card">
                    <div className="report-icon">📋</div>
                    <div className="report-info">
                      <h4>{report.name}</h4>
                      <p className="report-type">{report.type}</p>
                      <p className="report-date">📅 {report.date}</p>
                      <p className="report-doctor">👨‍⚕️ {report.doctor}</p>
                      <p className="report-lab">🏥 {report.lab}</p>
                    </div>
                    {report.results && (
                      <div className="report-results">
                        <h5>Results</h5>
                        <div className="results-grid">
                          {Object.entries(report.results).map(([key, value]) => (
                            <div key={key} className="result-item">
                              <span className="result-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="result-value">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="report-actions">
                      <button className="btn-view">👁️ View</button>
                      <button className="btn-download">📥 Download</button>
                      <button className="btn-share">📤 Share</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== MEDICINE ORDERS SECTION ==================== */}
        {activeSection === 'orders' && (
          <div className="section-orders">
            <h2>📦 Medicine Orders</h2>
            {medicineOrders.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📦</span>
                <h3>No Orders Yet</h3>
                <p>Order medicines from your prescriptions</p>
              </div>
            ) : (
              <div className="orders-list">
                {medicineOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-id">
                        <span className="order-icon">📦</span>
                        Order #{order.trackingId}
                      </div>
                      <div className={`order-status status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </div>
                    </div>
                    <div className="order-timeline">
                      <div className={`timeline-step ${['Processing', 'Shipped', 'Delivered'].includes(order.status) ? 'completed' : ''}`}>
                        <span>📝</span> Order Placed
                      </div>
                      <div className={`timeline-step ${['Shipped', 'Delivered'].includes(order.status) ? 'completed' : ''}`}>
                        <span>📦</span> Shipped
                      </div>
                      <div className={`timeline-step ${order.status === 'Delivered' ? 'completed' : ''}`}>
                        <span>✅</span> Delivered
                      </div>
                    </div>
                    <div className="order-medicines">
                      <h4>Items</h4>
                      {order.medicines.map((med, idx) => (
                        <div key={idx} className="order-med-item">
                          <span>💊 {med.name}</span>
                          <span>x{med.quantity}</span>
                          <span>${med.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <div className="order-total">
                        Total: <strong>${order.totalAmount.toFixed(2)}</strong>
                      </div>
                      <div className="order-dates">
                        <span>📅 Ordered: {order.orderDate}</span>
                        {order.deliveryDate && <span>🚚 Delivered: {order.deliveryDate}</span>}
                      </div>
                      <div className="order-actions">
                        <button className="btn-track">🔍 Track Order</button>
                        {order.status === 'Delivered' && <button className="btn-reorder">🔄 Re-order</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==================== HEALTH RECORDS SECTION ==================== */}
        {activeSection === 'records' && (
          <div className="section-records">
            <h2>📋 Health Records</h2>
            <div className="records-timeline">
              {healthRecords.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📋</span>
                  <h3>No Health Records</h3>
                  <p>Your medical history will be tracked here</p>
                </div>
              ) : (
                healthRecords.sort((a, b) => new Date(b.date) - new Date(a.date)).map(record => (
                  <div key={record.id} className="record-item">
                    <div className="record-date-marker">
                      <div className="record-month">{new Date(record.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                      <div className="record-day">{new Date(record.date).getDate()}</div>
                      <div className="record-year">{new Date(record.date).getFullYear()}</div>
                    </div>
                    <div className="record-content">
                      <div className={`record-type-badge type-${record.type.toLowerCase()}`}>
                        {record.type === 'Diagnosis' && '🩺'}
                        {record.type === 'Vaccination' && '💉'}
                        {record.type === 'Surgery' && '🏥'}
                        {record.type === 'Allergy' && '⚠️'}
                        {record.type}
                      </div>
                      <h4>{record.title}</h4>
                      <p>{record.description}</p>
                      <div className="record-doctor">👨‍⚕️ {record.doctor}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ==================== PROFILE SECTION ==================== */}
        {activeSection === 'profile' && (
          <div className="section-profile">
            <h2>👤 My Profile</h2>
            <div className="profile-grid">
              {/* Personal Info */}
              <div className="profile-card">
                <h3>Personal Information</h3>
                <div className="profile-field">
                  <label>Full Name</label>
                  <div className="field-value">{currentUser.name}</div>
                </div>
                <div className="profile-field">
                  <label>Email</label>
                  <div className="field-value">{currentUser.email}</div>
                </div>
                <div className="profile-field">
                  <label>Phone</label>
                  <div className="field-value">{currentUser.phone || 'Not provided'}</div>
                </div>
                {currentUser.profile && (
                  <>
                    <div className="profile-row">
                      <div className="profile-field">
                        <label>Age</label>
                        <div className="field-value">{currentUser.profile.age || 'Not provided'}</div>
                      </div>
                      <div className="profile-field">
                        <label>Gender</label>
                        <div className="field-value">{currentUser.profile.gender || 'Not provided'}</div>
                      </div>
                    </div>
                    <div className="profile-row">
                      <div className="profile-field">
                        <label>Blood Group</label>
                        <div className="field-value">{currentUser.profile.bloodGroup || 'Not provided'}</div>
                      </div>
                      <div className="profile-field">
                        <label>Height</label>
                        <div className="field-value">{currentUser.profile.height || 'Not provided'}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Health Summary */}
              {currentUser.profile && (
                <div className="profile-card">
                  <h3>Health Summary</h3>
                  <div className="profile-field">
                    <label>Allergies</label>
                    <div className="tags-list">
                      {currentUser.profile.allergies?.length > 0 ? (
                        currentUser.profile.allergies.map((allergy, idx) => (
                          <span key={idx} className="tag tag-danger">{allergy}</span>
                        ))
                      ) : (
                        <span className="no-data">No known allergies</span>
                      )}
                    </div>
                  </div>
                  <div className="profile-field">
                    <label>Medical Conditions</label>
                    <div className="tags-list">
                      {currentUser.profile.conditions?.length > 0 ? (
                        currentUser.profile.conditions.map((condition, idx) => (
                          <span key={idx} className="tag tag-warning">{condition}</span>
                        ))
                      ) : (
                        <span className="no-data">No conditions</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Emergency Contact */}
              {currentUser.profile?.emergencyContact && (
                <div className="profile-card">
                  <h3>Emergency Contact</h3>
                  <div className="profile-field">
                    <label>Name</label>
                    <div className="field-value">{currentUser.profile.emergencyContact.name || 'Not provided'}</div>
                  </div>
                  <div className="profile-field">
                    <label>Phone</label>
                    <div className="field-value">{currentUser.profile.emergencyContact.phone || 'Not provided'}</div>
                  </div>
                  <div className="profile-field">
                    <label>Relation</label>
                    <div className="field-value">{currentUser.profile.emergencyContact.relation || 'Not provided'}</div>
                  </div>
                </div>
              )}

              {/* Insurance */}
              {currentUser.profile?.insurance && (
                <div className="profile-card">
                  <h3>Insurance Details</h3>
                  <div className="profile-field">
                    <label>Provider</label>
                    <div className="field-value">{currentUser.profile.insurance.provider || 'Not provided'}</div>
                  </div>
                  <div className="profile-field">
                    <label>Policy Number</label>
                    <div className="field-value">{currentUser.profile.insurance.policyNo || 'Not provided'}</div>
                  </div>
                  <div className="profile-field">
                    <label>Valid Till</label>
                    <div className="field-value">{currentUser.profile.insurance.validTill || 'Not provided'}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ==================== DOCTOR DETAIL MODAL ==================== */}
      {showDoctorModal && selectedDoctor && (
        <div className="modal-overlay" onClick={() => setShowDoctorModal(false)}>
          <div className="modal doctor-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDoctorModal(false)}>×</button>
            <div className="doctor-profile">
              <div className="doctor-profile-header">
                <div className="doctor-profile-avatar">
                  <img src={selectedDoctor.imageUrl} alt={selectedDoctor.name} />
                </div>
                <div className="doctor-profile-info">
                  <h2>{selectedDoctor.name}</h2>
                  <p className="doctor-spec">{selectedDoctor.specialization}</p>
                  <p className="doctor-exp">{selectedDoctor.experience} experience</p>
                  <div className="doctor-rating-large">
                    <span>⭐ {selectedDoctor.rating}</span>
                    <span>({selectedDoctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="doctor-profile-body">
                <div className="profile-section">
                  <h4>About</h4>
                  <p>{selectedDoctor.about}</p>
                </div>
                <div className="profile-section">
                  <h4>Education</h4>
                  <p>{selectedDoctor.education}</p>
                </div>
                <div className="profile-section">
                  <h4>Location</h4>
                  <p>📍 {selectedDoctor.location}, {selectedDoctor.city}</p>
                </div>
                <div className="profile-section">
                  <h4>Languages</h4>
                  <div className="tags-list">
                    {selectedDoctor.languages.map(lang => (
                      <span key={lang} className="tag">{lang}</span>
                    ))}
                  </div>
                </div>
                <div className="profile-section">
                  <h4>Consultation Types</h4>
                  <div className="tags-list">
                    {selectedDoctor.consultationType.map(type => (
                      <span key={type} className={`tag tag-${type.toLowerCase()}`}>
                        {type === 'Video' ? '📹' : '🏥'} {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="profile-section">
                  <h4>Consultation Fee</h4>
                  <p className="fee-large">${selectedDoctor.fee}</p>
                </div>
              </div>
              <div className="doctor-profile-footer">
                <button className="btn-book-large" onClick={handleStartBooking}>
                  <span>📅</span> Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== BOOKING MODAL ==================== */}
      {showBookingModal && selectedDoctor && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingModal(false)}>×</button>
            <div className="booking-header">
              <h2>Book Appointment</h2>
              <p>with {selectedDoctor.name}</p>
            </div>
            
            <div className="booking-steps">
              <div className={`step ${bookingStep >= 1 ? 'active' : ''}`}>1. Type</div>
              <div className={`step ${bookingStep >= 2 ? 'active' : ''}`}>2. Date & Time</div>
              <div className={`step ${bookingStep >= 3 ? 'active' : ''}`}>3. Confirm</div>
            </div>

            {bookingStep === 1 && (
              <div className="booking-step-content">
                <h3>Select Consultation Type</h3>
                <div className="consultation-types-select">
                  {selectedDoctor.consultationType.map(type => (
                    <label 
                      key={type} 
                      className={`type-option ${bookingData.type === type ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={bookingData.type === type}
                        onChange={(e) => setBookingData({...bookingData, type: e.target.value})}
                      />
                      <span className="type-icon">{type === 'Video' ? '📹' : '🏥'}</span>
                      <span className="type-name">{type} Consultation</span>
                      <span className="type-desc">
                        {type === 'Video' ? 'Connect online via video call' : 'Visit the clinic in person'}
                      </span>
                    </label>
                  ))}
                </div>
                <button className="btn-next" onClick={() => setBookingStep(2)}>
                  Continue <span>→</span>
                </button>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="booking-step-content">
                <h3>Select Date & Time</h3>
                <div className="date-picker">
                  <h4>Available Dates</h4>
                  <div className="dates-grid">
                    {getAvailableDates().map(date => (
                      <button
                        key={date}
                        className={`date-btn ${bookingData.date === date ? 'selected' : ''}`}
                        onClick={() => setBookingData({...bookingData, date, time: ''})}
                      >
                        <span className="date-day">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="date-num">{new Date(date).getDate()}</span>
                        <span className="date-month">{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
                      </button>
                    ))}
                  </div>
                </div>
                {bookingData.date && (
                  <div className="time-picker">
                    <h4>Available Slots</h4>
                    <div className="times-grid">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          className={`time-btn ${bookingData.time === time ? 'selected' : ''}`}
                          onClick={() => setBookingData({...bookingData, time})}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="step-buttons">
                  <button className="btn-back" onClick={() => setBookingStep(1)}>
                    <span>←</span> Back
                  </button>
                  <button 
                    className="btn-next" 
                    onClick={() => setBookingStep(3)}
                    disabled={!bookingData.date || !bookingData.time}
                  >
                    Continue <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="booking-step-content">
                <h3>Confirm Booking</h3>
                <div className="booking-summary">
                  <div className="summary-row">
                    <span>Doctor</span>
                    <span>{selectedDoctor.name}</span>
                  </div>
                  <div className="summary-row">
                    <span>Specialization</span>
                    <span>{selectedDoctor.specialization}</span>
                  </div>
                  <div className="summary-row">
                    <span>Date</span>
                    <span>{new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="summary-row">
                    <span>Time</span>
                    <span>{bookingData.time}</span>
                  </div>
                  <div className="summary-row">
                    <span>Type</span>
                    <span>{bookingData.type} Consultation</span>
                  </div>
                  <div className="summary-row">
                    <span>Fee</span>
                    <span className="fee-highlight">${selectedDoctor.fee}</span>
                  </div>
                </div>
                <div className="symptoms-input">
                  <label>Describe your symptoms or reason for visit *</label>
                  <textarea
                    value={bookingData.symptoms}
                    onChange={(e) => setBookingData({...bookingData, symptoms: e.target.value})}
                    placeholder="Enter your symptoms or reason for consultation..."
                    rows="4"
                  />
                </div>
                <div className="step-buttons">
                  <button className="btn-back" onClick={() => setBookingStep(2)}>
                    <span>←</span> Back
                  </button>
                  <button 
                    className="btn-confirm" 
                    onClick={handleConfirmBooking}
                    disabled={!bookingData.symptoms}
                  >
                    <span>✓</span> Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== RESCHEDULE MODAL ==================== */}
      {showRescheduleModal && selectedAppointment && (
        <div className="modal-overlay" onClick={() => setShowRescheduleModal(false)}>
          <div className="modal reschedule-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRescheduleModal(false)}>×</button>
            <h2>Reschedule Appointment</h2>
            <div className="reschedule-content">
              <div className="current-schedule">
                <h4>Current Schedule</h4>
                <p>📅 {selectedAppointment.date} at {selectedAppointment.time}</p>
              </div>
              <div className="new-schedule">
                <h4>Select New Date & Time</h4>
                <div className="dates-grid">
                  {getAvailableDates().slice(0, 7).map(date => (
                    <button
                      key={date}
                      className={`date-btn ${bookingData.date === date ? 'selected' : ''}`}
                      onClick={() => setBookingData({...bookingData, date})}
                    >
                      <span className="date-day">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      <span className="date-num">{new Date(date).getDate()}</span>
                    </button>
                  ))}
                </div>
                {bookingData.date && (
                  <div className="times-grid">
                    {timeSlots.slice(0, 6).map(time => (
                      <button
                        key={time}
                        className={`time-btn ${bookingData.time === time ? 'selected' : ''}`}
                        onClick={() => setBookingData({...bookingData, time})}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                className="btn-confirm"
                onClick={() => handleConfirmReschedule(bookingData.date, bookingData.time)}
                disabled={!bookingData.date || !bookingData.time}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
