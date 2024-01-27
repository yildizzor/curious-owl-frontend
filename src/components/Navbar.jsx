import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/navbar-photos/owl-logo.png";
import wisdomOwl from "../assets/navbar-photos/wisdom-owl.png";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <>
      <nav className="Navbar">
        <img className="logo" src={logo}></img>

        <ul>
          <img className="wisdom-owl" src={wisdomOwl}></img>
          <NavLink to="/">Home</NavLink>
          {!isLoggedIn && (
            <>
              <NavLink to="/signup">Signup</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
          {isLoggedIn && (
            <>
              <NavLink to="/profile">Profile</NavLink>
            </>
          )}

          <NavLink to="/events">Events</NavLink>
          {isLoggedIn && (
            <>
              <button onClick={logOutUser}>LogOut</button>
              <span>{user && user.name}</span>
            </>
          )}
          <img className="wisdom-owl" src={wisdomOwl}></img>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
