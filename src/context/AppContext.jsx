import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // Mock users database with email, password, and profile info
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'Admin User', 
      email: 'admin@mediconnect.com', 
      password: 'password123', 
      role: 'Admin',
      phone: '+1 555-0100',
      avatar: null
    },
    { 
      id: 2, 
      name: 'Dr. Sarah Smith', 
      email: 'sarah@mediconnect.com', 
      password: 'password123', 
      role: 'Doctor',
      phone: '+1 555-0101',
      avatar: null
    },
    { 
      id: 3, 
      name: 'Dr. John Doe', 
      email: 'john.doe@mediconnect.com', 
      password: 'password123', 
      role: 'Doctor',
      phone: '+1 555-0102',
      avatar: null
    },
    { 
      id: 4, 
      name: 'Dr. Emily Brown', 
      email: 'emily@mediconnect.com', 
      password: 'password123', 
      role: 'Doctor',
      phone: '+1 555-0103',
      avatar: null
    },
    { 
      id: 5, 
      name: 'John Patient', 
      email: 'john@mediconnect.com', 
      password: 'password123', 
      role: 'Patient',
      phone: '+1 555-0104',
      avatar: null,
      profile: {
        age: 32,
        gender: 'Male',
        bloodGroup: 'O+',
        height: '5\'10"',
        weight: '75 kg',
        allergies: ['Penicillin', 'Dust'],
        conditions: ['Hypertension'],
        emergencyContact: { name: 'Jane Patient', phone: '+1 555-0105', relation: 'Spouse' },
        insurance: { provider: 'BlueCross', policyNo: 'BC-12345', validTill: '2027-12-31' }
      }
    },
    { 
      id: 6, 
      name: 'Jane Patient', 
      email: 'jane@mediconnect.com', 
      password: 'password123', 
      role: 'Patient',
      phone: '+1 555-0105',
      avatar: null,
      profile: {
        age: 28,
        gender: 'Female',
        bloodGroup: 'A+',
        height: '5\'5"',
        weight: '58 kg',
        allergies: ['Sulfa drugs'],
        conditions: [],
        emergencyContact: { name: 'John Patient', phone: '+1 555-0104', relation: 'Spouse' },
        insurance: { provider: 'Aetna', policyNo: 'AE-67890', validTill: '2026-08-15' }
      }
    },
    { 
      id: 7, 
      name: 'Mike Patient', 
      email: 'mike@mediconnect.com', 
      password: 'password123', 
      role: 'Patient',
      phone: '+1 555-0106',
      avatar: null,
      profile: {
        age: 45,
        gender: 'Male',
        bloodGroup: 'B+',
        height: '6\'0"',
        weight: '82 kg',
        allergies: [],
        conditions: ['Diabetes Type 2'],
        emergencyContact: { name: 'Sarah Mike', phone: '+1 555-0107', relation: 'Sister' },
        insurance: { provider: 'United Health', policyNo: 'UH-11223', validTill: '2026-05-20' }
      }
    },
    { 
      id: 8, 
      name: 'Pharmacy Manager', 
      email: 'pharmacy@mediconnect.com', 
      password: 'password123', 
      role: 'Pharmacist',
      phone: '+1 555-0108',
      avatar: null
    },
  ]);

  // Enhanced doctors list with more details
  const [doctors, setDoctors] = useState([
    {
      id: 2,
      name: 'Dr. Sarah Smith',
      specialization: 'Cardiologist',
      experience: '10 years',
      availability: 'Mon-Fri: 9AM-5PM',
      location: 'Downtown Medical Center',
      city: 'New York',
      rating: 4.8,
      reviews: 156,
      fee: 150,
      consultationType: ['Video', 'Clinic'],
      education: 'MD - Cardiology, Harvard Medical School',
      about: 'Dr. Sarah Smith is a renowned cardiologist with over 10 years of experience in treating heart conditions.',
      languages: ['English', 'Spanish'],
      availableSlots: generateTimeSlots(),
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Dr. John Doe',
      specialization: 'Neurologist',
      experience: '8 years',
      availability: 'Tue-Sat: 10AM-6PM',
      location: 'City Neuro Hospital',
      city: 'New York',
      rating: 4.6,
      reviews: 98,
      fee: 180,
      consultationType: ['Video', 'Clinic'],
      education: 'MD - Neurology, Johns Hopkins University',
      about: 'Dr. John Doe specializes in neurological disorders and has helped thousands of patients.',
      languages: ['English'],
      availableSlots: generateTimeSlots(),
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Dr. Emily Brown',
      specialization: 'Pediatrician',
      experience: '12 years',
      availability: 'Mon-Thu: 8AM-4PM',
      location: 'Children\'s Health Center',
      city: 'Brooklyn',
      rating: 4.9,
      reviews: 234,
      fee: 120,
      consultationType: ['Video', 'Clinic'],
      education: 'MD - Pediatrics, Stanford University',
      about: 'Dr. Emily Brown is a compassionate pediatrician dedicated to children\'s health and wellness.',
      languages: ['English', 'French'],
      availableSlots: generateTimeSlots(),
      imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face'
    },
    {
      id: 9,
      name: 'Dr. Michael Chen',
      specialization: 'Dermatologist',
      experience: '6 years',
      availability: 'Mon-Wed: 10AM-6PM',
      location: 'Skin Care Clinic',
      city: 'Manhattan',
      rating: 4.7,
      reviews: 89,
      fee: 130,
      consultationType: ['Video', 'Clinic'],
      education: 'MD - Dermatology, UCLA',
      about: 'Dr. Michael Chen is an expert in skin conditions and cosmetic dermatology.',
      languages: ['English', 'Mandarin'],
      availableSlots: generateTimeSlots(),
      imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face'
    },
    {
      id: 10,
      name: 'Dr. Lisa Anderson',
      specialization: 'Orthopedic',
      experience: '15 years',
      availability: 'Mon-Fri: 9AM-5PM',
      location: 'Bone & Joint Center',
      city: 'Queens',
      rating: 4.5,
      reviews: 178,
      fee: 200,
      consultationType: ['Clinic'],
      education: 'MD - Orthopedics, Columbia University',
      about: 'Dr. Lisa Anderson specializes in sports injuries and joint replacements.',
      languages: ['English'],
      availableSlots: generateTimeSlots(),
      imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face'
    },
    {
      id: 11,
      name: 'Dr. Robert Wilson',
      specialization: 'General Physician',
      experience: '20 years',
      availability: 'Mon-Sat: 8AM-8PM',
      location: 'Family Health Clinic',
      city: 'Bronx',
      rating: 4.4,
      reviews: 312,
      fee: 80,
      consultationType: ['Video', 'Clinic'],
      education: 'MD - General Medicine, NYU',
      about: 'Dr. Robert Wilson provides comprehensive primary care for patients of all ages.',
      languages: ['English', 'Italian'],
      availableSlots: generateTimeSlots(),
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face'
    }
  ]);

  // Appointments array with enhanced data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorId: 2,
      patientId: 5,
      date: '2026-02-25',
      time: '10:00 AM',
      type: 'Video',
      symptoms: 'Regular checkup for blood pressure monitoring',
      status: 'Confirmed',
      prescriptionId: null,
      diagnosis: null,
      notes: null,
      meetingLink: 'https://meet.mediconnect.com/abc123',
      createdAt: '2026-02-20T10:00:00.000Z'
    },
    {
      id: 2,
      doctorId: 4,
      patientId: 5,
      date: '2026-02-15',
      time: '2:00 PM',
      type: 'Clinic',
      symptoms: 'Fever and cold symptoms',
      status: 'Completed',
      prescriptionId: 1,
      diagnosis: 'Viral Flu',
      notes: 'Rest recommended for 3 days. Follow up if symptoms persist.',
      meetingLink: null,
      createdAt: '2026-02-10T08:00:00.000Z'
    }
  ]);

  // Prescriptions array with enhanced data
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      appointmentId: 2,
      patientId: 5,
      doctorId: 4,
      medicines: [
        { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days', instructions: 'After meals' },
        { name: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'Once daily', duration: '7 days', instructions: 'Before bed' },
        { name: 'Vitamin C 1000mg', dosage: '1 tablet', frequency: 'Once daily', duration: '10 days', instructions: 'After breakfast' }
      ],
      notes: 'Take plenty of rest. Drink warm fluids. Avoid cold beverages.',
      diagnosis: 'Viral Flu',
      createdAt: '2026-02-15T14:30:00.000Z',
      status: 'Active'
    }
  ]);

  // Lab Reports
  const [labReports, setLabReports] = useState([
    {
      id: 1,
      patientId: 5,
      name: 'Complete Blood Count (CBC)',
      type: 'Blood Test',
      date: '2026-02-10',
      doctor: 'Dr. Sarah Smith',
      lab: 'City Diagnostics',
      status: 'Completed',
      results: {
        hemoglobin: '14.2 g/dL',
        wbc: '7,500 /μL',
        rbc: '5.1 million/μL',
        platelets: '250,000 /μL'
      },
      fileUrl: null,
      createdAt: '2026-02-10T09:00:00.000Z'
    },
    {
      id: 2,
      patientId: 5,
      name: 'Lipid Profile',
      type: 'Blood Test',
      date: '2026-02-05',
      doctor: 'Dr. Sarah Smith',
      lab: 'City Diagnostics',
      status: 'Completed',
      results: {
        totalCholesterol: '195 mg/dL',
        hdl: '55 mg/dL',
        ldl: '120 mg/dL',
        triglycerides: '150 mg/dL'
      },
      fileUrl: null,
      createdAt: '2026-02-05T11:00:00.000Z'
    }
  ]);

  // Health Records
  const [healthRecords, setHealthRecords] = useState([
    {
      id: 1,
      patientId: 5,
      type: 'Diagnosis',
      title: 'Hypertension Diagnosed',
      description: 'Blood pressure consistently elevated. Started on medication.',
      date: '2025-06-15',
      doctor: 'Dr. Sarah Smith'
    },
    {
      id: 2,
      patientId: 5,
      type: 'Vaccination',
      title: 'COVID-19 Booster',
      description: 'Received COVID-19 booster shot (Pfizer)',
      date: '2025-09-20',
      doctor: 'Dr. Robert Wilson'
    },
    {
      id: 3,
      patientId: 5,
      type: 'Surgery',
      title: 'Appendectomy',
      description: 'Laparoscopic appendectomy performed successfully',
      date: '2024-03-10',
      doctor: 'Dr. Lisa Anderson'
    }
  ]);

  // Medicine orders array
  const [medicineOrders, setMedicineOrders] = useState([
    {
      id: 1,
      prescriptionId: 1,
      patientId: 5,
      medicines: [
        { name: 'Paracetamol 500mg', quantity: 10, price: 5.99 },
        { name: 'Cetirizine 10mg', quantity: 7, price: 8.99 },
        { name: 'Vitamin C 1000mg', quantity: 10, price: 12.99 }
      ],
      totalAmount: 27.97,
      status: 'Delivered',
      orderDate: '2026-02-15',
      deliveryDate: '2026-02-17',
      trackingId: 'MC-2026-001',
      address: '123 Main St, New York, NY 10001',
      createdAt: '2026-02-15T15:00:00.000Z'
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      userId: 5,
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Your appointment with Dr. Sarah Smith is tomorrow at 10:00 AM',
      isRead: false,
      createdAt: '2026-02-24T08:00:00.000Z'
    },
    {
      id: 2,
      userId: 5,
      type: 'prescription',
      title: 'New Prescription',
      message: 'Dr. Emily Brown has added a new prescription for you',
      isRead: true,
      createdAt: '2026-02-15T14:35:00.000Z'
    },
    {
      id: 3,
      userId: 5,
      type: 'labReport',
      title: 'Lab Report Available',
      message: 'Your CBC test results are now available',
      isRead: true,
      createdAt: '2026-02-10T10:00:00.000Z'
    },
    {
      id: 4,
      userId: 5,
      type: 'reminder',
      title: 'Medicine Reminder',
      message: 'Time to take your evening medication',
      isRead: false,
      createdAt: '2026-02-24T18:00:00.000Z'
    }
  ]);

  // ============ INVENTORY MANAGEMENT ============
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', stock: 500, minStock: 100, price: 5.99, unit: 'tablets', supplier: 'PharmaCorp', expiryDate: '2027-06-15' },
    { id: 2, name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 200, minStock: 50, price: 8.99, unit: 'tablets', supplier: 'MediSupply', expiryDate: '2027-08-20' },
    { id: 3, name: 'Vitamin C 1000mg', category: 'Supplements', stock: 350, minStock: 75, price: 12.99, unit: 'tablets', supplier: 'VitaHealth', expiryDate: '2027-12-01' },
    { id: 4, name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 45, minStock: 100, price: 15.99, unit: 'capsules', supplier: 'PharmaCorp', expiryDate: '2026-09-30' },
    { id: 5, name: 'Omeprazole 20mg', category: 'Gastric', stock: 180, minStock: 50, price: 9.99, unit: 'capsules', supplier: 'MediSupply', expiryDate: '2027-03-15' },
    { id: 6, name: 'Metformin 500mg', category: 'Diabetes', stock: 25, minStock: 100, price: 7.99, unit: 'tablets', supplier: 'DiabeCare', expiryDate: '2027-01-20' },
    { id: 7, name: 'Atorvastatin 10mg', category: 'Cardiovascular', stock: 150, minStock: 75, price: 18.99, unit: 'tablets', supplier: 'HeartMeds', expiryDate: '2027-05-10' },
    { id: 8, name: 'Losartan 50mg', category: 'Cardiovascular', stock: 120, minStock: 50, price: 14.99, unit: 'tablets', supplier: 'HeartMeds', expiryDate: '2027-07-25' },
    { id: 9, name: 'Ibuprofen 400mg', category: 'Pain Relief', stock: 80, minStock: 100, price: 6.99, unit: 'tablets', supplier: 'PharmaCorp', expiryDate: '2027-04-18' },
    { id: 10, name: 'Azithromycin 250mg', category: 'Antibiotics', stock: 60, minStock: 40, price: 22.99, unit: 'tablets', supplier: 'MediSupply', expiryDate: '2026-11-30' },
  ]);

  // ============ SYSTEM SETTINGS ============
  const [systemSettings, setSystemSettings] = useState({
    consultationFee: 100,
    platformCommission: 10,
    maintenanceMode: false,
    notificationsEnabled: true,
    autoApproveOrders: false,
    deliveryCharge: 5.99,
    freeDeliveryThreshold: 50,
  });

  // ============ DOCTOR VERIFICATION DATA ============
  const [doctorVerifications, setDoctorVerifications] = useState([
    { doctorId: 2, status: 'Verified', verifiedAt: '2025-01-15', documents: ['License', 'Degree', 'ID Proof'] },
    { doctorId: 3, status: 'Verified', verifiedAt: '2025-02-20', documents: ['License', 'Degree', 'ID Proof'] },
    { doctorId: 4, status: 'Verified', verifiedAt: '2025-03-10', documents: ['License', 'Degree', 'ID Proof'] },
  ]);

  // Register new user
  const registerUser = (name, email, password, role) => {
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return { success: false, message: 'Email already registered. Please login instead.' };
    }

    const newUser = {
      id: users.length + 1,
      name,
      email: email.toLowerCase(),
      password,
      role,
      phone: '',
      avatar: null,
      profile: role === 'Patient' ? {
        age: null,
        gender: null,
        bloodGroup: null,
        height: null,
        weight: null,
        allergies: [],
        conditions: [],
        emergencyContact: { name: '', phone: '', relation: '' },
        insurance: { provider: '', policyNo: '', validTill: '' }
      } : undefined
    };

    setUsers([...users, newUser]);

    if (role === 'Doctor') {
      const newDoctor = {
        id: newUser.id,
        name: newUser.name,
        specialization: 'General Physician',
        experience: 'New',
        availability: 'Mon-Fri: 9AM-5PM',
        location: 'Medical Center',
        city: 'New York',
        rating: 0,
        reviews: 0,
        fee: 100,
        consultationType: ['Video', 'Clinic'],
        education: '',
        about: '',
        languages: ['English'],
        availableSlots: generateTimeSlots()
      };
      setDoctors([...doctors, newDoctor]);
    }

    return { success: true, message: 'Account created successfully!' };
  };

  // Login user with email and password
  const loginUser = (email, password, role) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && 
             u.password === password && 
             u.role === role
    );
    
    if (user) {
      setCurrentUser({ ...user });
      return { success: true };
    }
    
    const emailExists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      if (emailExists.role !== role) {
        return { success: false, message: `This email is registered as ${emailExists.role}. Please select correct role.` };
      }
      return { success: false, message: 'Invalid password. Please try again.' };
    }
    
    return { success: false, message: 'Account not found. Please use one of the demo credentials below.' };
  };

  // Logout user
  const logoutUser = () => {
    setCurrentUser(null);
  };

  // Update user profile
  const updateUserProfile = (userId, profileData) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, ...profileData } : u
    ));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, ...profileData });
    }
  };

  // Book appointment with enhanced data
  const bookAppointment = (doctorId, patientId, date, time, type, symptoms) => {
    const appointment = {
      id: appointments.length + 1,
      doctorId,
      patientId,
      date,
      time,
      type,
      symptoms,
      status: 'Pending',
      prescriptionId: null,
      diagnosis: null,
      notes: null,
      meetingLink: type === 'Video' ? `https://meet.mediconnect.com/${Math.random().toString(36).substr(2, 9)}` : null,
      createdAt: new Date().toISOString(),
    };
    setAppointments([...appointments, appointment]);

    // Add notification
    addNotification(patientId, 'appointment', 'Appointment Booked', 
      `Your appointment has been booked for ${date} at ${time}`);

    return appointment;
  };

  // Update appointment status
  const updateAppointmentStatus = (appointmentId, status, additionalData = {}) => {
    setAppointments(
      appointments.map((app) =>
        app.id === appointmentId
          ? { ...app, status, ...additionalData }
          : app
      )
    );
  };

  // Cancel appointment
  const cancelAppointment = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'Cancelled');
  };

  // Reschedule appointment
  const rescheduleAppointment = (appointmentId, newDate, newTime) => {
    updateAppointmentStatus(appointmentId, 'Rescheduled', { date: newDate, time: newTime });
  };

  // Add prescription with enhanced data
  const addPrescription = (appointmentId, patientId, doctorId, medicines, notes, diagnosis) => {
    const prescription = {
      id: prescriptions.length + 1,
      appointmentId,
      patientId,
      doctorId,
      medicines,
      notes,
      diagnosis,
      createdAt: new Date().toISOString(),
      status: 'Active',
    };
    setPrescriptions([...prescriptions, prescription]);
    updateAppointmentStatus(appointmentId, 'Completed', { prescriptionId: prescription.id, diagnosis, notes });

    addNotification(patientId, 'prescription', 'New Prescription', 
      'A new prescription has been added by your doctor');

    return prescription;
  };

  // Create medicine order with enhanced data
  const createMedicineOrder = (prescriptionId, patientId, medicines, address) => {
    const totalAmount = medicines.reduce((sum, med) => sum + (med.price * med.quantity), 0);
    const order = {
      id: medicineOrders.length + 1,
      prescriptionId,
      patientId,
      medicines,
      totalAmount,
      status: 'Processing',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: null,
      trackingId: `MC-2026-${String(medicineOrders.length + 1).padStart(3, '0')}`,
      address,
      createdAt: new Date().toISOString(),
    };
    setMedicineOrders([...medicineOrders, order]);

    addNotification(patientId, 'order', 'Order Placed', 
      `Your medicine order #${order.trackingId} has been placed`);

    return order;
  };

  // Update medicine order status
  const updateMedicineOrderStatus = (orderId, status, deliveryDate = null) => {
    setMedicineOrders(
      medicineOrders.map((order) =>
        order.id === orderId ? { ...order, status, deliveryDate: deliveryDate || order.deliveryDate } : order
      )
    );
  };

  // Add lab report
  const addLabReport = (patientId, reportData) => {
    const report = {
      id: labReports.length + 1,
      patientId,
      ...reportData,
      createdAt: new Date().toISOString()
    };
    setLabReports([...labReports, report]);

    addNotification(patientId, 'labReport', 'Lab Report Available', 
      `Your ${reportData.name} report is now available`);

    return report;
  };

  // Add health record
  const addHealthRecord = (patientId, recordData) => {
    const record = {
      id: healthRecords.length + 1,
      patientId,
      ...recordData,
      date: new Date().toISOString().split('T')[0]
    };
    setHealthRecords([...healthRecords, record]);
    return record;
  };

  // Add notification
  const addNotification = (userId, type, title, message) => {
    const notification = {
      id: notifications.length + 1,
      userId,
      type,
      title,
      message,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications([...notifications, notification]);
  };

  // Mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = (userId) => {
    setNotifications(
      notifications.map((n) =>
        n.userId === userId ? { ...n, isRead: true } : n
      )
    );
  };

  // Get appointments by doctor
  const getAppointmentsByDoctor = (doctorId) => {
    return appointments.filter((app) => app.doctorId === doctorId);
  };

  // Get appointments by patient
  const getAppointmentsByPatient = (patientId) => {
    return appointments.filter((app) => app.patientId === patientId);
  };

  // Get upcoming appointments
  const getUpcomingAppointments = (patientId) => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(
      (app) => app.patientId === patientId && 
               app.date >= today && 
               !['Cancelled', 'Completed'].includes(app.status)
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Get past appointments
  const getPastAppointments = (patientId) => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(
      (app) => app.patientId === patientId && 
               (app.date < today || app.status === 'Completed')
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Get prescriptions by patient
  const getPrescriptionsByPatient = (patientId) => {
    return prescriptions.filter((pres) => pres.patientId === patientId);
  };

  // Get lab reports by patient
  const getLabReportsByPatient = (patientId) => {
    return labReports.filter((report) => report.patientId === patientId);
  };

  // Get health records by patient
  const getHealthRecordsByPatient = (patientId) => {
    return healthRecords.filter((record) => record.patientId === patientId);
  };

  // Get medicine orders by patient
  const getMedicineOrdersByPatient = (patientId) => {
    return medicineOrders.filter((order) => order.patientId === patientId);
  };

  // Get notifications by user
  const getNotificationsByUser = (userId) => {
    return notifications.filter((n) => n.userId === userId).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  // Get unread notifications count
  const getUnreadNotificationsCount = (userId) => {
    return notifications.filter((n) => n.userId === userId && !n.isRead).length;
  };

  // Get user by id
  const getUserById = (userId) => {
    return users.find((u) => u.id === userId);
  };

  // Get doctor by id
  const getDoctorById = (doctorId) => {
    return doctors.find((d) => d.id === doctorId);
  };

  // Get prescription by id
  const getPrescriptionById = (prescriptionId) => {
    return prescriptions.find((p) => p.id === prescriptionId);
  };

  // Get medicine order by id
  const getMedicineOrderById = (orderId) => {
    return medicineOrders.find((m) => m.id === orderId);
  };

  // ============ DOCTOR-SPECIFIC FUNCTIONS ============

  // Get today's appointments for doctor
  const getTodayAppointmentsForDoctor = (doctorId) => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(
      (app) => app.doctorId === doctorId && app.date === today && !['Cancelled', 'Rejected'].includes(app.status)
    ).sort((a, b) => {
      const timeA = new Date(`2000-01-01 ${a.time}`);
      const timeB = new Date(`2000-01-01 ${b.time}`);
      return timeA - timeB;
    });
  };

  // Get pending appointment requests for doctor
  const getPendingRequestsForDoctor = (doctorId) => {
    return appointments.filter(
      (app) => app.doctorId === doctorId && app.status === 'Pending'
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Get upcoming appointments for doctor
  const getUpcomingAppointmentsForDoctor = (doctorId) => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(
      (app) => app.doctorId === doctorId && 
               app.date >= today && 
               ['Confirmed', 'Accepted'].includes(app.status)
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  // Get completed appointments for doctor
  const getCompletedAppointmentsForDoctor = (doctorId) => {
    return appointments.filter(
      (app) => app.doctorId === doctorId && app.status === 'Completed'
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Get prescriptions by doctor
  const getPrescriptionsByDoctor = (doctorId) => {
    return prescriptions.filter((pres) => pres.doctorId === doctorId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  // Get unique patients for a doctor (patients who had appointments)
  const getPatientsForDoctor = (doctorId) => {
    const patientIds = [...new Set(
      appointments
        .filter((app) => app.doctorId === doctorId)
        .map((app) => app.patientId)
    )];
    return patientIds.map((id) => getUserById(id)).filter(Boolean);
  };

  // Get patient history for doctor (appointments with this doctor only)
  const getPatientHistoryForDoctor = (doctorId, patientId) => {
    return appointments.filter(
      (app) => app.doctorId === doctorId && app.patientId === patientId
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Accept appointment
  const acceptAppointment = (appointmentId) => {
    const appointment = appointments.find((app) => app.id === appointmentId);
    if (appointment) {
      updateAppointmentStatus(appointmentId, 'Confirmed');
      addNotification(appointment.patientId, 'appointment', 'Appointment Confirmed',
        `Your appointment on ${appointment.date} at ${appointment.time} has been confirmed`);
    }
  };

  // Reject appointment
  const rejectAppointment = (appointmentId, reason = '') => {
    const appointment = appointments.find((app) => app.id === appointmentId);
    if (appointment) {
      updateAppointmentStatus(appointmentId, 'Rejected', { rejectionReason: reason });
      addNotification(appointment.patientId, 'appointment', 'Appointment Declined',
        `Your appointment request has been declined. ${reason}`);
    }
  };

  // Complete consultation with notes and diagnosis
  const completeConsultation = (appointmentId, notes, diagnosis) => {
    updateAppointmentStatus(appointmentId, 'Completed', {
      notes,
      diagnosis,
      completedAt: new Date().toISOString()
    });
  };

  // Update doctor profile
  const updateDoctorProfile = (doctorId, profileData) => {
    setDoctors(
      doctors.map((d) =>
        d.id === doctorId ? { ...d, ...profileData } : d
      )
    );
  };

  // Update doctor availability
  const updateDoctorAvailability = (doctorId, availabilityData) => {
    setDoctors(
      doctors.map((d) =>
        d.id === doctorId ? { ...d, ...availabilityData } : d
      )
    );
  };

  // Get follow-up appointments for doctor
  const getFollowUpsDue = (doctorId) => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    return prescriptions
      .filter((pres) => pres.doctorId === doctorId && pres.followUpDate)
      .filter((pres) => {
        const followUpDate = new Date(pres.followUpDate);
        return followUpDate >= today && followUpDate <= nextWeek;
      })
      .map((pres) => ({
        ...pres,
        patient: getUserById(pres.patientId)
      }));
  };

  // Search doctors
  const searchDoctors = (query, filters = {}) => {
    let results = [...doctors];

    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(
        (d) => d.name.toLowerCase().includes(lowerQuery) ||
               d.specialization.toLowerCase().includes(lowerQuery)
      );
    }

    if (filters.specialization) {
      results = results.filter(
        (d) => d.specialization.toLowerCase() === filters.specialization.toLowerCase()
      );
    }

    if (filters.city) {
      results = results.filter(
        (d) => d.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    if (filters.consultationType) {
      results = results.filter(
        (d) => d.consultationType.includes(filters.consultationType)
      );
    }

    if (filters.maxFee) {
      results = results.filter((d) => d.fee <= filters.maxFee);
    }

    if (filters.minRating) {
      results = results.filter((d) => d.rating >= filters.minRating);
    }

    return results;
  };

  // Get all specializations
  const getSpecializations = () => {
    const specs = [...new Set(doctors.map((d) => d.specialization))];
    return specs.sort();
  };

  // Get all cities
  const getCities = () => {
    const cities = [...new Set(doctors.map((d) => d.city))];
    return cities.sort();
  };

  // ============ PHARMACIST-SPECIFIC FUNCTIONS ============

  // Get all prescriptions with status for pharmacist queue
  const getPrescriptionsForPharmacist = () => {
    return prescriptions.map(pres => {
      const patient = getUserById(pres.patientId);
      const doctor = getDoctorById(pres.doctorId);
      const existingOrder = medicineOrders.find(o => o.prescriptionId === pres.id);
      return {
        ...pres,
        patientName: patient?.name || 'Unknown',
        doctorName: doctor?.name || 'Unknown',
        orderStatus: existingOrder?.status || 'Awaiting Processing',
        orderId: existingOrder?.id || null
      };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  // Get order statistics for pharmacist dashboard
  const getPharmacistStats = () => {
    const pendingPrescriptions = prescriptions.filter(p => 
      !medicineOrders.some(o => o.prescriptionId === p.id)
    ).length;
    const processingOrders = medicineOrders.filter(o => o.status === 'Processing' || o.status === 'Preparing').length;
    const readyOrders = medicineOrders.filter(o => o.status === 'Ready').length;
    const dispatchedOrders = medicineOrders.filter(o => o.status === 'Dispatched' || o.status === 'Out for Delivery').length;
    const deliveredOrders = medicineOrders.filter(o => o.status === 'Delivered').length;
    const lowStockItems = inventory.filter(i => i.stock <= i.minStock).length;
    
    return { pendingPrescriptions, processingOrders, readyOrders, dispatchedOrders, deliveredOrders, lowStockItems };
  };

  // Get low stock items
  const getLowStockItems = () => {
    return inventory.filter(i => i.stock <= i.minStock);
  };

  // Update inventory item
  const updateInventoryItem = (itemId, updates) => {
    setInventory(inventory.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ));
  };

  // Add new inventory item
  const addInventoryItem = (itemData) => {
    const newItem = {
      id: inventory.length + 1,
      ...itemData
    };
    setInventory([...inventory, newItem]);
    return newItem;
  };

  // Process prescription to order (Accept Order)
  const acceptPrescriptionOrder = (prescriptionId, patientId, address = '123 Main St, New York, NY') => {
    const prescription = prescriptions.find(p => p.id === prescriptionId);
    if (!prescription) return null;
    
    const medicines = prescription.medicines.map(med => {
      const inventoryItem = inventory.find(i => i.name.toLowerCase().includes(med.name.toLowerCase().split(' ')[0]));
      return {
        name: med.name,
        quantity: parseInt(med.duration) || 7,
        price: inventoryItem?.price || 10.99
      };
    });
    
    return createMedicineOrder(prescriptionId, patientId, medicines, address);
  };

  // Update order status with timeline
  const updateOrderStatusWithTimeline = (orderId, newStatus) => {
    const statusTimeline = {
      'Processing': 'orderAcceptedAt',
      'Preparing': 'preparingAt',
      'Ready': 'readyAt',
      'Dispatched': 'dispatchedAt',
      'Out for Delivery': 'outForDeliveryAt',
      'Delivered': 'deliveredAt'
    };
    
    const timelineField = statusTimeline[newStatus];
    const updates = { 
      status: newStatus,
      [timelineField]: new Date().toISOString()
    };
    
    if (newStatus === 'Delivered') {
      updates.deliveryDate = new Date().toISOString().split('T')[0];
    }
    
    setMedicineOrders(medicineOrders.map(order =>
      order.id === orderId ? { ...order, ...updates } : order
    ));
    
    const order = medicineOrders.find(o => o.id === orderId);
    if (order) {
      const statusMessages = {
        'Preparing': 'Your medicine order is being prepared',
        'Ready': 'Your medicine order is ready for pickup/delivery',
        'Dispatched': 'Your medicine order has been dispatched',
        'Out for Delivery': 'Your medicine order is out for delivery',
        'Delivered': 'Your medicine order has been delivered'
      };
      addNotification(order.patientId, 'order', 'Order Update', statusMessages[newStatus] || `Order status: ${newStatus}`);
    }
  };

  // ============ ADMIN-SPECIFIC FUNCTIONS ============

  // Get admin dashboard statistics
  const getAdminStats = () => {
    const totalPatients = users.filter(u => u.role === 'Patient').length;
    const totalDoctors = users.filter(u => u.role === 'Doctor').length;
    const totalPharmacists = users.filter(u => u.role === 'Pharmacist').length;
    const totalAppointments = appointments.length;
    const todayAppointments = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length;
    const pendingVerifications = doctors.filter(d => !doctorVerifications.some(v => v.doctorId === d.id && v.status === 'Verified')).length;
    const totalRevenue = medicineOrders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + o.totalAmount, 0);
    const cancelledAppointments = appointments.filter(a => a.status === 'Cancelled').length;
    const completedAppointments = appointments.filter(a => a.status === 'Completed').length;
    
    return { 
      totalPatients, 
      totalDoctors, 
      totalPharmacists, 
      totalAppointments, 
      todayAppointments,
      pendingVerifications,
      totalRevenue,
      cancelledAppointments,
      completedAppointments,
      cancellationRate: totalAppointments > 0 ? ((cancelledAppointments / totalAppointments) * 100).toFixed(1) : 0
    };
  };

  // Get appointments by date range for analytics
  const getAppointmentsByDateRange = (startDate, endDate) => {
    return appointments.filter(a => a.date >= startDate && a.date <= endDate);
  };

  // Get daily appointment counts for chart
  const getDailyAppointmentCounts = (days = 7) => {
    const counts = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = appointments.filter(a => a.date === dateStr).length;
      counts.push({ date: dateStr, count, label: date.toLocaleDateString('en-US', { weekday: 'short' }) });
    }
    
    return counts;
  };

  // Get popular specializations
  const getPopularSpecializations = () => {
    const specCounts = {};
    appointments.forEach(apt => {
      const doctor = getDoctorById(apt.doctorId);
      if (doctor) {
        specCounts[doctor.specialization] = (specCounts[doctor.specialization] || 0) + 1;
      }
    });
    return Object.entries(specCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  // Verify doctor
  const verifyDoctor = (doctorId) => {
    const existing = doctorVerifications.find(v => v.doctorId === doctorId);
    if (existing) {
      setDoctorVerifications(doctorVerifications.map(v =>
        v.doctorId === doctorId ? { ...v, status: 'Verified', verifiedAt: new Date().toISOString() } : v
      ));
    } else {
      setDoctorVerifications([...doctorVerifications, {
        doctorId,
        status: 'Verified',
        verifiedAt: new Date().toISOString(),
        documents: []
      }]);
    }
  };

  // Block/Unblock user
  const toggleUserBlock = (userId) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u
    ));
  };

  // Update system settings
  const updateSystemSettings = (newSettings) => {
    setSystemSettings({ ...systemSettings, ...newSettings });
  };

  // Get doctor verification status
  const getDoctorVerificationStatus = (doctorId) => {
    return doctorVerifications.find(v => v.doctorId === doctorId) || { status: 'Pending' };
  };

  // Get all orders for admin view
  const getAllOrders = () => {
    return medicineOrders.map(order => ({
      ...order,
      patient: getUserById(order.patientId),
      prescription: getPrescriptionById(order.prescriptionId)
    }));
  };

  const value = {
    currentUser,
    setCurrentUser,
    users,
    doctors,
    appointments,
    prescriptions,
    labReports,
    healthRecords,
    medicineOrders,
    notifications,
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    bookAppointment,
    updateAppointmentStatus,
    cancelAppointment,
    rescheduleAppointment,
    addPrescription,
    createMedicineOrder,
    updateMedicineOrderStatus,
    addLabReport,
    addHealthRecord,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    getUpcomingAppointments,
    getPastAppointments,
    getPrescriptionsByPatient,
    getLabReportsByPatient,
    getHealthRecordsByPatient,
    getMedicineOrdersByPatient,
    getNotificationsByUser,
    getUnreadNotificationsCount,
    getUserById,
    getDoctorById,
    getPrescriptionById,
    getMedicineOrderById,
    searchDoctors,
    getSpecializations,
    getCities,
    // Doctor-specific functions
    getTodayAppointmentsForDoctor,
    getPendingRequestsForDoctor,
    getUpcomingAppointmentsForDoctor,
    getCompletedAppointmentsForDoctor,
    getPrescriptionsByDoctor,
    getPatientsForDoctor,
    getPatientHistoryForDoctor,
    acceptAppointment,
    rejectAppointment,
    completeConsultation,
    updateDoctorProfile,
    updateDoctorAvailability,
    getFollowUpsDue,
    // Pharmacist-specific functions
    inventory,
    getPrescriptionsForPharmacist,
    getPharmacistStats,
    getLowStockItems,
    updateInventoryItem,
    addInventoryItem,
    acceptPrescriptionOrder,
    updateOrderStatusWithTimeline,
    // Admin-specific functions
    systemSettings,
    doctorVerifications,
    getAdminStats,
    getAppointmentsByDateRange,
    getDailyAppointmentCounts,
    getPopularSpecializations,
    verifyDoctor,
    toggleUserBlock,
    updateSystemSettings,
    getDoctorVerificationStatus,
    getAllOrders,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Helper function to generate time slots
function generateTimeSlots() {
  const slots = {};
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    slots[dateStr] = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];
  }
  
  return slots;
}

// Custom hook to use AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
