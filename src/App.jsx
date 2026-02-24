import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import PharmacistDashboard from './pages/PharmacistDashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './styles/index.css';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const { currentUser } = useAppContext();

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute user={currentUser}>
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <Navbar />
                  <div className="page-container">
                    <AdminDashboard />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute user={currentUser}>
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <Navbar />
                  <div className="page-container">
                    <DoctorDashboard />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute user={currentUser}>
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <Navbar />
                  <div className="page-container">
                    <PatientDashboard />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/pharmacist-dashboard"
          element={
            <ProtectedRoute user={currentUser}>
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <Navbar />
                  <div className="page-container">
                    <PharmacistDashboard />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Landing Page - Home Route */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
