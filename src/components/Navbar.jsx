import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/navbar-photos/owl-logo.png";
import wisdomOwl from "../assets/navbar-photos/wisdom-owl.png";



function Navbar() {
  return (
    <>
      <nav className="Navbar">
        <img className="logo" src={logo}></img>
       
        <ul>
             <img className="wisdom-owl" src={wisdomOwl}></img>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/events">Events</NavLink>
          <img className="wisdom-owl" src={wisdomOwl}></img>
        </ul>
       
      </nav>
    </>
  );
}

export default Navbar;
