import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAppContext();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'Patient',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = ['Admin', 'Doctor', 'Patient', 'Pharmacist'];

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Please enter your password');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      const result = loginUser(formData.email, formData.password, formData.role);

      if (result.success) {
        const roleRoute = {
          Admin: '/admin-dashboard',
          Doctor: '/doctor-dashboard',
          Patient: '/patient-dashboard',
          Pharmacist: '/pharmacist-dashboard',
        };
        navigate(roleRoute[formData.role]);
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
        <div className="auth-shape shape-3"></div>
      </div>

      <div className="auth-card login-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">🏥</span>
            <span className="logo-text">MediConnect</span>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to your dashboard</p>
        </div>

        {success && (
          <div className="auth-alert auth-alert-success">
            <span className="alert-icon">✓</span>
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="auth-alert auth-alert-error">
            <span className="alert-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label className="auth-label">
              <span className="label-icon">📧</span>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="auth-input"
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">
              <span className="label-icon">🔒</span>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="auth-input"
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">
              <span className="label-icon">🎭</span>
              Select Role
            </label>
            <div className="role-selector">
              {roles.map((role) => (
                <label
                  key={role}
                  className={`role-option ${formData.role === role ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                  />
                  <span className="role-icon">
                    {role === 'Admin' && '👮'}
                    {role === 'Doctor' && '👨‍⚕️'}
                    {role === 'Patient' && '👤'}
                    {role === 'Pharmacist' && '💊'}
                  </span>
                  <span className="role-name">{role}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`auth-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing In...
              </>
            ) : (
              <>
                <span>🔐</span>
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <p className="demo-title">🔑 Demo Credentials</p>
          <div className="demo-list">
            <div className="demo-item">
              <span className="demo-role">Admin:</span>
              <span className="demo-email">admin@mediconnect.com</span>
            </div>
            <div className="demo-item">
              <span className="demo-role">Doctor:</span>
              <span className="demo-email">sarah@mediconnect.com</span>
            </div>
            <div className="demo-item">
              <span className="demo-role">Patient:</span>
              <span className="demo-email">john@mediconnect.com</span>
            </div>
            <div className="demo-item">
              <span className="demo-role">Pharmacist:</span>
              <span className="demo-email">pharmacy@mediconnect.com</span>
            </div>
          </div>
          <p className="demo-password">Password for all: <strong>password123</strong></p>
        </div>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
