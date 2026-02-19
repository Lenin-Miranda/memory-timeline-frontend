import { Link } from "react-scroll";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/Logo.png";
import "./NavBar.css";

export default function NavBar({ onLoginClick, onSignupClick }) {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="nav">
      <div className="nav__logo-container">
        <img src={Logo} className="nav__logo" alt="Logo" />
      </div>
      <div className="nav__links">
        <Link to="about" smooth={true} duration={500} className="nav__link">
          About Us
        </Link>
        <Link to="plans" smooth={true} duration={500} className="nav__link">
          Plans
        </Link>

        {isAuthenticated ? (
          <>
            <span className="nav__link">Hi, {user?.name}</span>
            <button onClick={logout} className="nav__link nav__button">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={onLoginClick} className="nav__link nav__button">
              Login
            </button>
            <button onClick={onSignupClick} className="nav__link nav__button">
              Join Now
            </button>
          </>
        )}

        <Link to="help" smooth={true} duration={500} className="nav__link">
          Help
        </Link>
      </div>
    </nav>
  );
}
