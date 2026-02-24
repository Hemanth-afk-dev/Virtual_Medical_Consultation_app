import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    currentUser,
    users,
    doctors,
    appointments,
    prescriptions,
    medicineOrders,
    systemSettings,
    doctorVerifications,
    getAdminStats,
    getDailyAppointmentCounts,
    getPopularSpecializations,
    verifyDoctor,
    toggleUserBlock,
    updateSystemSettings,
    getDoctorVerificationStatus,
    getAllOrders,
    getUserById,
    getDoctorById,
    getNotificationsByUser,
    getUnreadNotificationsCount,
    markAllNotificationsAsRead,
  } = useAppContext();

  const [activeSection, setActiveSection] = useState(searchParams.get('section') || 'dashboard');
  const [activeUserTab, setActiveUserTab] = useState('patients');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [tempSettings, setTempSettings] = useState({ ...systemSettings });

  // Sync with URL
  useEffect(() => {
    const section = searchParams.get('section');
    if (section && section !== activeSection) {
      setActiveSection(section);
    }
  }, [searchParams]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSearchParams({ section });
  };

  // Get data
  const stats = getAdminStats();
  const dailyAppointments = getDailyAppointmentCounts(7);
  const popularSpecs = getPopularSpecializations();
  const allOrders = getAllOrders();
  const notifications = getNotificationsByUser(currentUser.id);
  const unreadCount = getUnreadNotificationsCount(currentUser.id);

  // Filter users by role
  const patientUsers = users.filter(u => u.role === 'Patient');
  const doctorUsers = users.filter(u => u.role === 'Doctor');
  const pharmacistUsers = users.filter(u => u.role === 'Pharmacist');

  // Filter users by search
  const filterUsers = (userList) => {
    if (!searchQuery) return userList;
    return userList.filter(u => 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Pending doctor verifications
  const pendingDoctors = doctors.filter(d => {
    const verification = getDoctorVerificationStatus(d.id);
    return verification.status !== 'Verified';
  });

  // Handle verify doctor
  const handleVerifyDoctor = (doctorId) => {
    verifyDoctor(doctorId);
  };

  // Handle block/unblock user
  const handleToggleBlock = (userId) => {
    toggleUserBlock(userId);
  };

  // Save settings
  const handleSaveSettings = () => {
    updateSystemSettings(tempSettings);
    setShowSettingsModal(false);
  };

  // Calculate max for chart
  const maxAppointments = Math.max(...dailyAppointments.map(d => d.count), 1);

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="greeting">
          <h1>Admin Control Panel 👮</h1>
          <p>Welcome back, {currentUser.name}. Manage and monitor the platform.</p>
        </div>
        <div className="header-actions">
          <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
            <span className="bell-icon">🔔</span>
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </div>
          <button className="btn-sm btn-secondary" onClick={() => setShowSettingsModal(true)}>
            ⚙️ Settings
          </button>
          <div className="user-avatar admin-avatar">
            {currentUser.name.charAt(0)}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="dashboard-nav">
        <button 
          className={`nav-tab ${activeSection === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleSectionChange('dashboard')}
        >
          <span>🏠</span> Dashboard
        </button>
        <button 
          className={`nav-tab ${activeSection === 'users' ? 'active' : ''}`}
          onClick={() => handleSectionChange('users')}
        >
          <span>👥</span> Users
        </button>
        <button 
          className={`nav-tab ${activeSection === 'doctors' ? 'active' : ''}`}
          onClick={() => handleSectionChange('doctors')}
        >
          <span>👨‍⚕️</span> Doctor Verification
        </button>
        <button 
          className={`nav-tab ${activeSection === 'appointments' ? 'active' : ''}`}
          onClick={() => handleSectionChange('appointments')}
        >
          <span>📅</span> Appointments
        </button>
        <button 
          className={`nav-tab ${activeSection === 'reports' ? 'active' : ''}`}
          onClick={() => handleSectionChange('reports')}
        >
          <span>📊</span> Reports
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

        {/* ==================== DASHBOARD OVERVIEW ==================== */}
        {activeSection === 'dashboard' && (
          <div className="section-dashboard">
            {/* Stats Grid */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="stat-icon-wrapper blue">
                  <span>👥</span>
                </div>
                <div className="stat-details">
                  <div className="stat-value">{stats.totalPatients}</div>
                  <div className="stat-label">Total Patients</div>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon-wrapper green">
                  <span>👨‍⚕️</span>
                </div>
                <div className="stat-details">
                  <div className="stat-value">{stats.totalDoctors}</div>
                  <div className="stat-label">Total Doctors</div>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon-wrapper purple">
                  <span>💊</span>
                </div>
                <div className="stat-details">
                  <div className="stat-value">{stats.totalPharmacists}</div>
                  <div className="stat-label">Pharmacists</div>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon-wrapper orange">
                  <span>📅</span>
                </div>
                <div className="stat-details">
                  <div className="stat-value">{stats.todayAppointments}</div>
                  <div className="stat-label">Today's Appointments</div>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon-wrapper teal">
                  <span>💰</span>
                </div>
                <div className="stat-details">
                  <div className="stat-value">${stats.totalRevenue.toFixed(2)}</div>
                  <div className="stat-label">Total Revenue</div>
                </div>
              </div>
              <div className="admin-stat-card warning">
                <div className="stat-icon-wrapper yellow">
                  <span>⏳</span>
                </div>
                <div className="stat-details">
                  <div className="stat-value">{stats.pendingVerifications}</div>
                  <div className="stat-label">Pending Verifications</div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="charts-row">
              {/* Appointments Chart */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3>📊 Appointments (Last 7 Days)</h3>
                </div>
                <div className="chart-content">
                  <div className="bar-chart">
                    {dailyAppointments.map((day, idx) => (
                      <div key={idx} className="bar-item">
                        <div className="bar-wrapper">
                          <div 
                            className="bar" 
                            style={{ height: `${(day.count / maxAppointments) * 100}%` }}
                          >
                            <span className="bar-value">{day.count}</span>
                          </div>
                        </div>
                        <div className="bar-label">{day.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Popular Specializations */}
              <div className="chart-card">
                <div className="chart-header">
                  <h3>🏆 Popular Specializations</h3>
                </div>
                <div className="chart-content">
                  <div className="specialization-list">
                    {popularSpecs.slice(0, 5).map((spec, idx) => (
                      <div key={idx} className="spec-item">
                        <div className="spec-info">
                          <span className="spec-rank">#{idx + 1}</span>
                          <span className="spec-name">{spec.name}</span>
                        </div>
                        <div className="spec-bar-wrapper">
                          <div 
                            className="spec-bar" 
                            style={{ width: `${(spec.count / (popularSpecs[0]?.count || 1)) * 100}%` }}
                          ></div>
                          <span className="spec-count">{spec.count} appointments</span>
                        </div>
                      </div>
                    ))}
                    {popularSpecs.length === 0 && (
                      <div className="empty-chart">No appointment data yet</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="quick-stats-row">
              <div className="quick-stat">
                <div className="quick-stat-icon">✅</div>
                <div className="quick-stat-info">
                  <span className="quick-stat-value">{stats.completedAppointments}</span>
                  <span className="quick-stat-label">Completed</span>
                </div>
              </div>
              <div className="quick-stat">
                <div className="quick-stat-icon">❌</div>
                <div className="quick-stat-info">
                  <span className="quick-stat-value">{stats.cancelledAppointments}</span>
                  <span className="quick-stat-label">Cancelled</span>
                </div>
              </div>
              <div className="quick-stat">
                <div className="quick-stat-icon">📈</div>
                <div className="quick-stat-info">
                  <span className="quick-stat-value">{stats.cancellationRate}%</span>
                  <span className="quick-stat-label">Cancellation Rate</span>
                </div>
              </div>
              <div className="quick-stat">
                <div className="quick-stat-icon">📦</div>
                <div className="quick-stat-info">
                  <span className="quick-stat-value">{medicineOrders.length}</span>
                  <span className="quick-stat-label">Total Orders</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== USER MANAGEMENT ==================== */}
        {activeSection === 'users' && (
          <div className="section-users">
            <div className="section-header">
              <h2>👥 User Management</h2>
              <div className="section-filters">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* User Tabs */}
            <div className="user-tabs">
              <button 
                className={`user-tab ${activeUserTab === 'patients' ? 'active' : ''}`}
                onClick={() => setActiveUserTab('patients')}
              >
                👤 Patients ({patientUsers.length})
              </button>
              <button 
                className={`user-tab ${activeUserTab === 'doctors' ? 'active' : ''}`}
                onClick={() => setActiveUserTab('doctors')}
              >
                👨‍⚕️ Doctors ({doctorUsers.length})
              </button>
              <button 
                className={`user-tab ${activeUserTab === 'pharmacists' ? 'active' : ''}`}
                onClick={() => setActiveUserTab('pharmacists')}
              >
                💊 Pharmacists ({pharmacistUsers.length})
              </button>
            </div>

            {/* Users Table */}
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterUsers(
                    activeUserTab === 'patients' ? patientUsers :
                    activeUserTab === 'doctors' ? doctorUsers : pharmacistUsers
                  ).map(user => (
                    <tr key={user.id} className={user.isBlocked ? 'blocked-row' : ''}>
                      <td>#{user.id}</td>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar-small">{user.name.charAt(0)}</div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.phone || '-'}</td>
                      <td>
                        <span className={`badge ${user.isBlocked ? 'badge-danger' : 'badge-success'}`}>
                          {user.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons-cell">
                          <button className="btn-sm btn-secondary">View</button>
                          <button 
                            className={`btn-sm ${user.isBlocked ? 'btn-success' : 'btn-danger'}`}
                            onClick={() => handleToggleBlock(user.id)}
                          >
                            {user.isBlocked ? 'Unblock' : 'Block'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== DOCTOR VERIFICATION ==================== */}
        {activeSection === 'doctors' && (
          <div className="section-doctors">
            <div className="section-header">
              <h2>👨‍⚕️ Doctor Verification</h2>
            </div>

            {/* Pending Verifications */}
            <div className="verification-section">
              <h3>⏳ Pending Verifications ({pendingDoctors.length})</h3>
              {pendingDoctors.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✅</div>
                  <h3>All Caught Up!</h3>
                  <p>No pending doctor verifications</p>
                </div>
              ) : (
                <div className="verification-cards">
                  {pendingDoctors.map(doctor => (
                    <div key={doctor.id} className="verification-card">
                      <div className="verification-header">
                        <div className="doctor-avatar-large">{doctor.name.charAt(0)}</div>
                        <div className="doctor-info">
                          <h4>{doctor.name}</h4>
                          <span className="specialization">{doctor.specialization}</span>
                        </div>
                        <span className="badge badge-warning">Pending</span>
                      </div>
                      <div className="verification-body">
                        <div className="info-grid">
                          <div className="info-item">
                            <span className="label">Experience:</span>
                            <span className="value">{doctor.experience}</span>
                          </div>
                          <div className="info-item">
                            <span className="label">Education:</span>
                            <span className="value">{doctor.education}</span>
                          </div>
                          <div className="info-item">
                            <span className="label">Location:</span>
                            <span className="value">{doctor.location}, {doctor.city}</span>
                          </div>
                          <div className="info-item">
                            <span className="label">Consultation Fee:</span>
                            <span className="value">${doctor.fee}</span>
                          </div>
                        </div>
                        <div className="documents-section">
                          <h5>📄 Required Documents</h5>
                          <div className="document-list">
                            <span className="document-item">✅ Medical License</span>
                            <span className="document-item">✅ Degree Certificate</span>
                            <span className="document-item">✅ ID Proof</span>
                          </div>
                        </div>
                      </div>
                      <div className="verification-actions">
                        <button className="btn btn-danger">Reject</button>
                        <button 
                          className="btn btn-success"
                          onClick={() => handleVerifyDoctor(doctor.id)}
                        >
                          ✅ Approve & Verify
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Verified Doctors */}
            <div className="verification-section">
              <h3>✅ Verified Doctors ({doctors.length - pendingDoctors.length})</h3>
              <div className="verified-doctors-table">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Specialization</th>
                      <th>Verified On</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.filter(d => getDoctorVerificationStatus(d.id).status === 'Verified').map(doctor => {
                      const verification = getDoctorVerificationStatus(doctor.id);
                      return (
                        <tr key={doctor.id}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar-small">{doctor.name.charAt(0)}</div>
                              <span>{doctor.name}</span>
                            </div>
                          </td>
                          <td>{doctor.specialization}</td>
                          <td>{verification.verifiedAt ? new Date(verification.verifiedAt).toLocaleDateString() : '-'}</td>
                          <td>
                            <span className="badge badge-success">Verified</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== APPOINTMENT MONITORING ==================== */}
        {activeSection === 'appointments' && (
          <div className="section-appointments">
            <div className="section-header">
              <h2>📅 Appointment Monitoring</h2>
              <div className="section-filters">
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Appointment Stats */}
            <div className="appointment-stats">
              <div className="apt-stat">
                <span className="apt-stat-value">{stats.totalAppointments}</span>
                <span className="apt-stat-label">Total</span>
              </div>
              <div className="apt-stat completed">
                <span className="apt-stat-value">{stats.completedAppointments}</span>
                <span className="apt-stat-label">Completed</span>
              </div>
              <div className="apt-stat cancelled">
                <span className="apt-stat-value">{stats.cancelledAppointments}</span>
                <span className="apt-stat-label">Cancelled</span>
              </div>
              <div className="apt-stat rate">
                <span className="apt-stat-value">{stats.cancellationRate}%</span>
                <span className="apt-stat-label">Cancellation Rate</span>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="appointments-table-container">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date & Time</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Symptoms</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.filter(apt => 
                    !searchQuery || 
                    getUserById(apt.patientId)?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    getDoctorById(apt.doctorId)?.name.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map(apt => {
                    const patient = getUserById(apt.patientId);
                    const doctor = getDoctorById(apt.doctorId);
                    return (
                      <tr key={apt.id}>
                        <td>#{apt.id}</td>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar-small">{patient?.name?.charAt(0) || '?'}</div>
                            <span>{patient?.name || 'Unknown'}</span>
                          </div>
                        </td>
                        <td>{doctor?.name || 'Unknown'}</td>
                        <td>
                          <div className="datetime-cell">
                            <span className="date">{apt.date}</span>
                            <span className="time">{apt.time}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`type-badge ${apt.type?.toLowerCase()}`}>
                            {apt.type === 'Video' ? '📹' : '🏥'} {apt.type}
                          </span>
                        </td>
                        <td>
                          <span className={`badge badge-${
                            apt.status === 'Completed' ? 'success' :
                            apt.status === 'Cancelled' || apt.status === 'Rejected' ? 'danger' :
                            apt.status === 'Confirmed' || apt.status === 'Accepted' ? 'info' : 'warning'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="symptoms-cell">{apt.symptoms?.substring(0, 30)}...</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== REPORTS & ANALYTICS ==================== */}
        {activeSection === 'reports' && (
          <div className="section-reports">
            <div className="section-header">
              <h2>📊 Reports & Analytics</h2>
              <button className="btn btn-primary">📥 Export Report</button>
            </div>

            {/* Report Cards */}
            <div className="reports-grid">
              <div className="report-card">
                <div className="report-header">
                  <h3>📅 Daily Consultations</h3>
                </div>
                <div className="report-body">
                  <div className="report-stat-large">{stats.todayAppointments}</div>
                  <p>Appointments scheduled for today</p>
                  <div className="report-trend positive">
                    <span>📈 +12% from yesterday</span>
                  </div>
                </div>
              </div>

              <div className="report-card">
                <div className="report-header">
                  <h3>💰 Revenue Summary</h3>
                </div>
                <div className="report-body">
                  <div className="report-stat-large">${stats.totalRevenue.toFixed(2)}</div>
                  <p>Total medicine order revenue</p>
                  <div className="report-breakdown">
                    <span>Orders: {medicineOrders.filter(o => o.status === 'Delivered').length}</span>
                  </div>
                </div>
              </div>

              <div className="report-card">
                <div className="report-header">
                  <h3>👥 User Growth</h3>
                </div>
                <div className="report-body">
                  <div className="user-breakdown">
                    <div className="breakdown-item">
                      <span className="breakdown-label">Patients</span>
                      <span className="breakdown-value">{stats.totalPatients}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Doctors</span>
                      <span className="breakdown-value">{stats.totalDoctors}</span>
                    </div>
                    <div className="breakdown-item">
                      <span className="breakdown-label">Pharmacists</span>
                      <span className="breakdown-value">{stats.totalPharmacists}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="report-card">
                <div className="report-header">
                  <h3>📦 Order Reports</h3>
                </div>
                <div className="report-body">
                  <div className="order-stats">
                    <div className="order-stat-item">
                      <span className="status-dot processing"></span>
                      <span>Processing: {medicineOrders.filter(o => o.status === 'Processing').length}</span>
                    </div>
                    <div className="order-stat-item">
                      <span className="status-dot dispatched"></span>
                      <span>Dispatched: {medicineOrders.filter(o => o.status === 'Dispatched').length}</span>
                    </div>
                    <div className="order-stat-item">
                      <span className="status-dot delivered"></span>
                      <span>Delivered: {medicineOrders.filter(o => o.status === 'Delivered').length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Specializations Report */}
            <div className="report-section">
              <h3>🏆 Top Specializations by Appointments</h3>
              <div className="specialization-report">
                {popularSpecs.map((spec, idx) => (
                  <div key={idx} className="spec-report-item">
                    <div className="spec-rank-badge">{idx + 1}</div>
                    <div className="spec-details">
                      <span className="spec-name">{spec.name}</span>
                      <div className="spec-progress">
                        <div 
                          className="spec-progress-bar"
                          style={{ width: `${(spec.count / (popularSpecs[0]?.count || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="spec-count">{spec.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== SYSTEM SETTINGS ==================== */}
        {activeSection === 'settings' && (
          <div className="section-settings">
            <div className="section-header">
              <h2>⚙️ System Settings</h2>
            </div>

            <div className="settings-grid">
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3>💰 Fee Configuration</h3>
                </div>
                <div className="settings-card-body">
                  <div className="setting-item">
                    <label>Default Consultation Fee ($)</label>
                    <input
                      type="number"
                      value={tempSettings.consultationFee}
                      onChange={(e) => setTempSettings({...tempSettings, consultationFee: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="setting-item">
                    <label>Platform Commission (%)</label>
                    <input
                      type="number"
                      value={tempSettings.platformCommission}
                      onChange={(e) => setTempSettings({...tempSettings, platformCommission: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="setting-item">
                    <label>Delivery Charge ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={tempSettings.deliveryCharge}
                      onChange={(e) => setTempSettings({...tempSettings, deliveryCharge: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="setting-item">
                    <label>Free Delivery Threshold ($)</label>
                    <input
                      type="number"
                      value={tempSettings.freeDeliveryThreshold}
                      onChange={(e) => setTempSettings({...tempSettings, freeDeliveryThreshold: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-card-header">
                  <h3>🔧 System Options</h3>
                </div>
                <div className="settings-card-body">
                  <div className="setting-item toggle">
                    <label>Enable Notifications</label>
                    <div 
                      className={`toggle-switch ${tempSettings.notificationsEnabled ? 'active' : ''}`}
                      onClick={() => setTempSettings({...tempSettings, notificationsEnabled: !tempSettings.notificationsEnabled})}
                    >
                      <div className="toggle-thumb"></div>
                    </div>
                  </div>
                  <div className="setting-item toggle">
                    <label>Auto-Approve Orders</label>
                    <div 
                      className={`toggle-switch ${tempSettings.autoApproveOrders ? 'active' : ''}`}
                      onClick={() => setTempSettings({...tempSettings, autoApproveOrders: !tempSettings.autoApproveOrders})}
                    >
                      <div className="toggle-thumb"></div>
                    </div>
                  </div>
                  <div className="setting-item toggle">
                    <label>Maintenance Mode</label>
                    <div 
                      className={`toggle-switch ${tempSettings.maintenanceMode ? 'active' : ''}`}
                      onClick={() => setTempSettings({...tempSettings, maintenanceMode: !tempSettings.maintenanceMode})}
                    >
                      <div className="toggle-thumb"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button className="btn btn-secondary" onClick={() => setTempSettings({...systemSettings})}>
                Reset Changes
              </button>
              <button className="btn btn-primary" onClick={handleSaveSettings}>
                💾 Save Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="modal-overlay" onClick={() => setShowSettingsModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⚙️ Quick Settings</h2>
              <button className="modal-close" onClick={() => setShowSettingsModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="quick-settings">
                <div className="setting-item toggle">
                  <label>Maintenance Mode</label>
                  <div 
                    className={`toggle-switch ${tempSettings.maintenanceMode ? 'active' : ''}`}
                    onClick={() => setTempSettings({...tempSettings, maintenanceMode: !tempSettings.maintenanceMode})}
                  >
                    <div className="toggle-thumb"></div>
                  </div>
                </div>
                <div className="setting-item toggle">
                  <label>Notifications</label>
                  <div 
                    className={`toggle-switch ${tempSettings.notificationsEnabled ? 'active' : ''}`}
                    onClick={() => setTempSettings({...tempSettings, notificationsEnabled: !tempSettings.notificationsEnabled})}
                  >
                    <div className="toggle-thumb"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowSettingsModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveSettings}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
