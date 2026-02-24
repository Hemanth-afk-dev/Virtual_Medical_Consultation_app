import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
      </div>

      {/* Navigation */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon-new">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>
            </div>
            <span className="logo-text-new">MediConnect</span>
          </div>
          <div className="nav-links-new">
            <a href="#services">Services</a>
            <a href="#specialties">Specialties</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-actions-new">
            <button className="btn-ghost" onClick={() => navigate('/login')}>Login</button>
            <button className="btn-gradient" onClick={() => navigate('/login')}>Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-new">
        <div className="hero-container-new">
          <div className="hero-content-new">
            <div className="hero-badge-new">
              <span className="badge-dot"></span>
              <span>Trusted by 500K+ Patients</span>
            </div>
            <h1 className="hero-title-new">
              Modern Healthcare
              <span className="gradient-text-new"> Made Simple</span>
            </h1>
            <p className="hero-desc">
              Experience the future of healthcare. Book appointments, consult doctors online, 
              and manage your health journey seamlessly.
            </p>
            
            <div className="search-box-new">
              <div className="search-input-group">
                <span className="search-icon-new">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#94a3b8"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                </span>
                <input type="text" placeholder="Search doctors, hospitals, specialties..." />
              </div>
              <button className="search-btn-new">
                <span>Search</span>
                <span className="btn-shine"></span>
              </button>
            </div>

            <div className="quick-links">
              <span className="quick-label">Popular:</span>
              {['Fever', 'Skin Care', 'Heart', 'Mental Health', 'Dental'].map((item, i) => (
                <button key={i} className="quick-tag">{item}</button>
              ))}
            </div>
          </div>

          <div className="hero-visual-new">
            <div className="visual-card main-visual-card">
              <div className="card-glow"></div>
              <div className="visual-card-header">
                <span className="status-badge online">● Available Now</span>
              </div>
              <div className="doctor-info-new">
                <div className="doctor-avatar-new">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face" alt="Dr. Sarah Johnson" />
                  <div className="avatar-ring"></div>
                </div>
                <div className="doctor-details-new">
                  <h4>Dr. Sarah Johnson</h4>
                  <p>Cardiologist • AIIMS Delhi</p>
                  <div className="doctor-stats">
                    <span className="stat-item-new"><span className="star">★</span> 4.9</span>
                    <span className="stat-item-new">12 yrs exp</span>
                    <span className="stat-item-new">2.8K patients</span>
                  </div>
                </div>
              </div>
              <div className="visual-card-actions">
                <button className="btn-video">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                  Video Call
                </button>
                <button className="btn-book-new">Book Appointment</button>
              </div>
            </div>

            <div className="floating-stat stat-appointments">
              <div className="floating-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#3b82f6"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
              </div>
              <div className="floating-info">
                <strong>50,000+</strong>
                <span>Appointments</span>
              </div>
            </div>

            <div className="floating-stat stat-rating">
              <div className="floating-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1e3a8a"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <div className="floating-info">
                <strong>4.9/5</strong>
                <span>Rating</span>
              </div>
            </div>

            <div className="floating-stat stat-doctors">
              <div className="floating-icon stethoscope">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563eb"><path d="M19 8c0-3.31-2.69-6-6-6h-2v2h2c2.21 0 4 1.79 4 4v3h-2v4c0 2.21-1.79 4-4 4s-4-1.79-4-4v-1H5v1c0 3.31 2.69 6 6 6s6-2.69 6-6v-4h2V8zM7 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
              </div>
              <div className="floating-info">
                <strong>10,000+</strong>
                <span>Doctors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-new" id="services">
        <div className="section-container-new">
          <div className="section-header-new">
            <span className="section-tag">Our Services</span>
            <h2>Comprehensive Healthcare Solutions</h2>
            <p>Everything you need for your health, all in one place</p>
          </div>

          <div className="services-grid-new">
            {[
              { icon: 'video', title: 'Video Consultation', desc: 'Connect with doctors instantly via HD video calls', color: '#3b82f6', bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' },
              { icon: 'hospital', title: 'In-Clinic Visit', desc: 'Book appointments at top hospitals near you', color: '#1e3a8a', bg: 'linear-gradient(135deg, #dbeafe, #93c5fd)' },
              { icon: 'medicine', title: 'Medicine Delivery', desc: 'Get medicines delivered to your doorstep', color: '#2563eb', bg: 'linear-gradient(135deg, #eff6ff, #bfdbfe)' },
              { icon: 'lab', title: 'Lab Tests', desc: 'Home sample collection with accurate results', color: '#1d4ed8', bg: 'linear-gradient(135deg, #dbeafe, #93c5fd)' },
              { icon: 'stethoscope', title: 'Health Packages', desc: 'Comprehensive health checkup packages', color: '#0ea5e9', bg: 'linear-gradient(135deg, #e0f2fe, #7dd3fc)' },
              { icon: 'records', title: 'Medical Records', desc: 'Store and access your records securely', color: '#3b82f6', bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' }
            ].map((service, i) => (
              <div key={i} className="service-card-new" style={{'--accent': service.color}}>
                <div className="service-icon-new" style={{background: service.bg}}>
                  {service.icon === 'video' && <svg width="36" height="36" viewBox="0 0 24 24" fill={service.color}><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>}
                  {service.icon === 'hospital' && <svg width="36" height="36" viewBox="0 0 24 24" fill={service.color}><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>}
                  {service.icon === 'medicine' && <svg width="36" height="36" viewBox="0 0 24 24" fill={service.color}><path d="M4.22 11.29l7.07-7.07c1.95-1.95 5.12-1.95 7.07 0s1.95 5.12 0 7.07l-7.07 7.07c-1.95 1.95-5.12 1.95-7.07 0s-1.95-5.12 0-7.07zm1.41 1.42c-1.17 1.17-1.17 3.07 0 4.24 1.17 1.17 3.07 1.17 4.24 0l3.54-3.54-4.24-4.24-3.54 3.54z"/></svg>}
                  {service.icon === 'lab' && <svg width="36" height="36" viewBox="0 0 24 24" fill={service.color}><path d="M7 2v2h1v14c0 2.21 1.79 4 4 4s4-1.79 4-4V4h1V2H7zm6 16c0 1.1-.9 2-2 2s-2-.9-2-2v-2h4v2zm0-4H9V4h4v10z"/></svg>}
                  {service.icon === 'stethoscope' && <svg width="36" height="36" viewBox="0 0 24 24" fill={service.color}><path d="M19 8c0-3.31-2.69-6-6-6h-2v2h2c2.21 0 4 1.79 4 4v3h-2v4c0 2.21-1.79 4-4 4s-4-1.79-4-4v-1H5v1c0 3.31 2.69 6 6 6s6-2.69 6-6v-4h2V8zM7 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>}
                  {service.icon === 'records' && <svg width="36" height="36" viewBox="0 0 24 24" fill={service.color}><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>}
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button className="service-link-new">
                  Explore <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="stats-banner">
        <div className="stats-container">
          {[
            { value: '10K+', label: 'Doctors', icon: 'doctor' },
            { value: '500K+', label: 'Patients', icon: 'patients' },
            { value: '50+', label: 'Specialties', icon: 'specialty' },
            { value: '100+', label: 'Cities', icon: 'cities' }
          ].map((stat, i) => (
            <div key={i} className="stat-block">
              <span className="stat-icon-new">
                {stat.icon === 'doctor' && <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M19 8c0-3.31-2.69-6-6-6h-2v2h2c2.21 0 4 1.79 4 4v3h-2v4c0 2.21-1.79 4-4 4s-4-1.79-4-4v-1H5v1c0 3.31 2.69 6 6 6s6-2.69 6-6v-4h2V8zM7 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>}
                {stat.icon === 'patients' && <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>}
                {stat.icon === 'specialty' && <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>}
                {stat.icon === 'cities' && <svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>}
              </span>
              <div className="stat-numbers">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specialties Section */}
      <section className="specialties-new" id="specialties">
        <div className="section-container-new">
          <div className="section-header-new">
            <span className="section-tag">Specialties</span>
            <h2>Find the Right Specialist</h2>
            <p>Expert doctors across 50+ medical specialties</p>
          </div>

          <div className="specialties-grid-new">
            {[
              { icon: 'heart', name: 'Cardiology', count: '120+ Doctors', color: '#1e3a8a' },
              { icon: 'brain', name: 'Neurology', count: '85+ Doctors', color: '#2563eb' },
              { icon: 'bone', name: 'Orthopedics', count: '95+ Doctors', color: '#3b82f6' },
              { icon: 'child', name: 'Pediatrics', count: '150+ Doctors', color: '#1d4ed8' },
              { icon: 'stethoscope', name: 'General Medicine', count: '200+ Doctors', color: '#0ea5e9' },
              { icon: 'tooth', name: 'Dentistry', count: '180+ Doctors', color: '#38bdf8' },
              { icon: 'eye', name: 'Ophthalmology', count: '75+ Doctors', color: '#60a5fa' },
              { icon: 'skin', name: 'Dermatology', count: '110+ Doctors', color: '#93c5fd' }
            ].map((specialty, i) => (
              <div key={i} className="specialty-card-colorful" style={{'--color': specialty.color}}>
                <div className="specialty-icon-wrap">
                  {specialty.icon === 'heart' && <svg className="specialty-svg" width="28" height="28" viewBox="0 0 24 24" fill={specialty.color}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>}
                  {specialty.icon === 'brain' && <svg className="specialty-svg" width="28" height="28" viewBox="0 0 24 24" fill={specialty.color}><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>}
                  {specialty.icon === 'bone' && <svg className="specialty-svg" width="28" height="28" viewBox="0 0 24 24" fill={specialty.color}><path d="M8 5c0-.55-.22-1.05-.59-1.41C7.05 3.22 6.55 3 6 3c-1.1 0-2 .9-2 2 0 .55.22 1.05.59 1.41C5 7 5.5 8 6 8v8c-.5 0-1 1-1.41 1.59C4.22 17.95 4 18.45 4 19c0 1.1.9 2 2 2 .55 0 1.05-.22 1.41-.59C8 20 8 19.5 8 19v-8-1c0-.5-1-1-1.59-1.41C6.05 8.22 6 7.55 6 7c0-1.1.9-2 2-2zm8 14c0 .55.22 1.05.59 1.41.37.37.86.59 1.41.59 1.1 0 2-.9 2-2 0-.55-.22-1.05-.59-1.41C19 17 18.5 16 18 16V8c.5 0 1-1 1.41-1.59.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2-.55 0-1.05.22-1.41.59C16 4 16 4.5 16 5v8 1c0 .5 1 1 1.59 1.41.36.36.41.86.41 1.59 0 1.1-.9 2-2 2z"/></svg>}
                  {specialty.icon === 'child' && <svg className="specialty-svg" width="28" height="28" viewBox="0 0 24 24" fill={specialty.color}><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>}
                  {specialty.icon === 'stethoscope' && <svg className="specialty-svg" width="28" height="28" viewBox="0 0 24 24" fill={specialty.color}><path d="M19 8c0-3.31-2.69-6-6-6h-2v2h2c2.21 0 4 1.79 4 4v3h-2v4c0 2.21-1.79 4-4 4s-4-1.79-4-4v-1H5v1c0 3.31 2.69 6 6 6s6-2.69 6-6v-4h2V8zM7 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>}
                  {specialty.icon === 'tooth' && <svg className="specialty-svg" width="28" height="28" viewBox="0 0 24 24" fill={specialty.color}><path d="M12 2C9.24 2 7 4.24 7 7v4.26c0 1 .39 1.96 1.09 2.68l1.82 1.82V21c0 .55.45 1 1 1h2.18c.55 0 1-.45 1-1v-5.24l1.82-1.82c.7-.72 1.09-1.68 1.09-2.68V7c0-2.76-2.24-5-5-5z"/></svg>}
                  {specialty.icon === 'eye' && <svg className="specialty-svg" width="28" height="28" viewBox="0 0 24 24" fill={specialty.color}><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>}
                  {specialty.icon === 'skin' && <svg className="specialty-svg" width="28" height="28" viewBox="0 0 24 24" fill={specialty.color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm10 0c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm-5 7c2.61 0 4.83-1.67 5.65-4H6.35c.82 2.33 3.04 4 5.65 4z"/></svg>}
                </div>
                <div className="specialty-info-new">
                  <h4>{specialty.name}</h4>
                  <span>{specialty.count}</span>
                </div>
                <div className="specialty-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-new" id="about">
        <div className="section-container-new">
          <div className="features-layout">
            <div className="features-content-new">
              <span className="section-tag">Why Choose Us</span>
              <h2>Healthcare Reimagined for the Digital Age</h2>
              <p>We combine technology with care to deliver the best healthcare experience</p>

              <div className="features-list-new">
                {[
                  { icon: 'verified', title: 'Verified Doctors', desc: 'All doctors verified with credentials check', color: '#1e3a8a' },
                  { icon: 'instant', title: 'Instant Booking', desc: 'Book appointments in under 60 seconds', color: '#2563eb' },
                  { icon: 'secure', title: 'Secure & Private', desc: 'Your health data is encrypted and safe', color: '#3b82f6' },
                  { icon: 'support', title: '24/7 Support', desc: 'Round the clock customer assistance', color: '#0ea5e9' }
                ].map((feature, i) => (
                  <div key={i} className="feature-item-new" style={{'--color': feature.color}}>
                    <div className="feature-icon-circle" style={{background: `${feature.color}15`}}>
                      {feature.icon === 'verified' && <svg width="22" height="22" viewBox="0 0 24 24" fill={feature.color}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>}
                      {feature.icon === 'instant' && <svg width="22" height="22" viewBox="0 0 24 24" fill={feature.color}><path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z"/></svg>}
                      {feature.icon === 'secure' && <svg width="22" height="22" viewBox="0 0 24 24" fill={feature.color}><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>}
                      {feature.icon === 'support' && <svg width="22" height="22" viewBox="0 0 24 24" fill={feature.color}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>}
                    </div>
                    <div className="feature-text">
                      <h4>{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="features-visual-new">
              <div className="app-mockup">
                <div className="mockup-screen">
                  <div className="mockup-header">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>
                    <span>MediConnect</span>
                  </div>
                  <div className="mockup-content">
                    <div className="mockup-user">
                      <div className="user-avatar-small">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="User" />
                      </div>
                      <div>
                        <strong>Hi, John!</strong>
                        <span>Your health dashboard</span>
                      </div>
                    </div>
                    <div className="mockup-cards">
                      <div className="mockup-appt">
                        <span className="mockup-label">Upcoming</span>
                        <div className="mockup-doc">
                          <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=50&h=50&fit=crop&crop=face" alt="Dr. Emily Chen" className="doc-img-small" />
                          <div>
                            <strong>Dr. Emily Chen</strong>
                            <span>Tomorrow, 10:00 AM</span>
                          </div>
                        </div>
                      </div>
                      <div className="mockup-quick-actions">
                        <button><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg> Video</button>
                        <button><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4.22 11.29l7.07-7.07c1.95-1.95 5.12-1.95 7.07 0s1.95 5.12 0 7.07l-7.07 7.07c-1.95 1.95-5.12 1.95-7.07 0s-1.95-5.12 0-7.07z"/></svg> Meds</button>
                        <button><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v2h1v14c0 2.21 1.79 4 4 4s4-1.79 4-4V4h1V2H7z"/></svg> Tests</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mockup-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-new">
        <div className="cta-container-new">
          <div className="cta-bg-elements">
            <div className="cta-circle cta-circle-1"></div>
            <div className="cta-circle cta-circle-2"></div>
          </div>
          <div className="cta-content-new">
            <h2>Start Your Health Journey Today</h2>
            <p>Join 500,000+ patients who trust MediConnect for their healthcare needs</p>
            <div className="cta-buttons-new">
              <button className="btn-cta-primary-new" onClick={() => navigate('/login')}>
                <span>Book Appointment</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
              </button>
              <button className="btn-cta-secondary-new">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <span>Talk to Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-new">
        <div className="footer-container-new">
          <div className="footer-top">
            <div className="footer-brand-new">
              <div className="footer-logo-new">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#3b82f6"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>
                <span>MediConnect</span>
              </div>
              <p>Your trusted partner in digital healthcare. Making quality healthcare accessible to everyone.</p>
              <div className="social-links-new">
                <a href="#" className="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg></a>
                <a href="#" className="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.69 2.11 2.95 3.96 2.99-1.45 1.13-3.29 1.79-5.27 1.79-.34 0-.68-.02-1.01-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg></a>
                <a href="#" className="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2C5.61 4 4 5.61 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8c1.99 0 3.6-1.61 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5c.69 0 1.25.56 1.25 1.25S17.94 8 17.25 8 16 7.44 16 6.75s.56-1.25 1.25-1.25zM12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg></a>
                <a href="#" className="social-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M19 3c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14zm-.5 15.5v-5.3c0-1.8-1.46-3.26-3.26-3.26-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4.77 0 1.4.63 1.4 1.4v4.93h2.79zM6.88 8.56c.97 0 1.75-.79 1.75-1.75 0-.97-.78-1.75-1.75-1.75-.97 0-1.75.78-1.75 1.75 0 .96.78 1.75 1.75 1.75zm1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg></a>
              </div>
            </div>

            <div className="footer-links-new">
              <div className="footer-col-new">
                <h4>Company</h4>
                <a href="#">About Us</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
                <a href="#">Blog</a>
              </div>
              <div className="footer-col-new">
                <h4>For Patients</h4>
                <a href="#">Find Doctors</a>
                <a href="#">Video Consult</a>
                <a href="#">Book Tests</a>
                <a href="#">Order Medicines</a>
              </div>
              <div className="footer-col-new">
                <h4>For Doctors</h4>
                <a href="#">Join Network</a>
                <a href="#">Doctor Login</a>
                <a href="#">Resources</a>
              </div>
              <div className="footer-col-new">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Contact Us</a>
                <a href="#">📧 help@mediconnect.com</a>
                <a href="#">📞 1800-123-4567</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-new">
            <span>© 2024 MediConnect. All rights reserved.</span>
            <div className="footer-legal-new">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
