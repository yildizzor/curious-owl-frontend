import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/owl-logo.png";

function Navbar() {
  return (
    <>
      <nav className="Navbar">
        <img className="logo" src={logo}></img>
        <ul>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/events">Events</NavLink>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
