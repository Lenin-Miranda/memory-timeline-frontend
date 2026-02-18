import { Link } from "react-scroll";
import Logo from "../../assets/Logo.png";
import "./NavBar.css";

export default function NavBar() {
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
        <Link to="help" smooth={true} duration={500} className="nav__link">
          Login
        </Link>
        <Link to="help" smooth={true} duration={500} className="nav__link">
          Join Now
        </Link>
        <Link to="help" smooth={true} duration={500} className="nav__link">
          Help
        </Link>
      </div>
    </nav>
  );
}
