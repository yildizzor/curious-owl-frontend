import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { logo, wisdomOwl } from "../utils/constants";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ShowWithTooltip from "./common/ShowWithTooltip";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <>
      <Navbar expand="lg" className="Navbar">
        <Container fluid className="d-flex justify-content-between">
          <Navbar.Brand href="/">
            <Image className="logo" src={logo} />
            <Image className="wisdom-owl-sm" src={wisdomOwl} />
            <Image className="wisdom-owl-sm" src={wisdomOwl} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-content-evenly align-nav-items flex-grow">
              <Image className="wisdom-owl" src={wisdomOwl} />
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/events" className="nav-link">
                Events
              </NavLink>
              {!isLoggedIn && (
                <>
                  <NavLink to="/signup" className="nav-link">
                    Signup
                  </NavLink>
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </>
              )}
              {isLoggedIn && (
                <>
                  <NavLink to="/profile" className="nav-link">
                    Profile
                  </NavLink>
                </>
              )}
              {isLoggedIn && (
                <>
                  <div
                    style={{ color: "blue" }}
                    className="d-flex align-nav-items user-menu "
                  >
                    <span className="user-menu">
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ marginRight: "10px" }}
                      />
                      <span>{user && user.name}</span>
                    </span>
                    <ShowWithTooltip tooltipText={"Logout"}>
                      <Button onClick={logOutUser} className="logout-button">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </Button>
                    </ShowWithTooltip>
                  </div>
                </>
              )}
              <Image className="wisdom-owl" src={wisdomOwl} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
