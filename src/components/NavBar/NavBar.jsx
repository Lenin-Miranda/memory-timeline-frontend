import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import "./NavBar.css";

export default function NavBar() {
  const location = useLocation();
  const isAbout = location.pathname === "/about";

  return (
    <nav className="nav">
      <div className="nav__logo-container">
        <img src={Logo} className="nav__logo" alt="Logo" />
      </div>
      <div className="nav__links">
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
      </div>
    </nav>
  );
}
