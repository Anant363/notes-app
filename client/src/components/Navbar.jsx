import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav id="navbar">
      <div id="logo">
        <i className="fa-solid fa-book-bookmark"></i>
        <Link className="navLink" to="/">MyNotes</Link>
      </div>
      <div id="links">
        {!user ? (
          <>
            <Link className="navLink" to="/login">Login</Link>
            <Link className="navLink" to="/register">Register</Link>
          </>
        ) : (
          <>
            <span id="welcomeMsg">Welcome, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
