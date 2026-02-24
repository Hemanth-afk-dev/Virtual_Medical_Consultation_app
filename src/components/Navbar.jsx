import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useAppContext();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        {currentUser && `🏥 MediConnect - ${currentUser.role}`}
      </div>
      <div className="navbar-user">
        <div className="user-info">
          <div className="user-name">{currentUser?.name}</div>
          <div className="user-role">{currentUser?.role}</div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
