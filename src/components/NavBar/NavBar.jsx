import { Link } from "react-scroll";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/Logo.png";
import "./NavBar.css";

export default function NavBar({ onLoginClick, onSignupClick }) {
  const { user, logout, isAuthenticated } = useAuth();
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import "./NavBar.css";

export default function NavBar() {
  const location = useLocation();
  const isAbout = location.pathname === "/about";
  const isDashboard = location.pathname === "/dashboard";

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
        {isDashboard ? (
          <RouterLink to="/" className="nav__link">
            Home
          </RouterLink>
        ) : (
          <>
            {isAbout ? (
              <RouterLink to="/" className="nav__link">
                Home
              </RouterLink>
            ) : (
              <>
                <RouterLink to="/about" className="nav__link">
                  About
                </RouterLink>
                <ScrollLink
                  to="plans"
                  smooth={true}
                  duration={500}
                  className="nav__link"
                >
                  Plans
                </ScrollLink>
              </>
            )}
            <RouterLink to="/dashboard" className="nav__link nav__link--cta">
              Add Timeline
            </RouterLink>
          </>
        )}
      </div>
    </nav>
  );
}
