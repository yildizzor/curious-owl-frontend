import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/navbar-photos/owl-logo.png";
import wisdomOwl from "../assets/navbar-photos/wisdom-owl.png";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import {
  Container,
  Nav,
  Navbar,
  Image,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Logout
    </Tooltip>
  );

  return (
    <>
      <Navbar expand="lg" className="Navbar">
        <Container fluid className="d-flex justify-content-between">
          <Navbar.Brand href="/">
            <img className="logo" src={logo}></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-content-evenly align-nav-items flex-grow">
              <Image className="wisdom-owl" src={wisdomOwl} />
              <NavLink to="/" className="nav-link">
                Home
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
              <NavLink to="/events" className="nav-link">
                Events
              </NavLink>

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
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <Button onClick={logOutUser} className="logout-button">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </Button>
                    </OverlayTrigger>
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
