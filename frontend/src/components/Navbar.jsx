import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import "../assets/Navbar.css";

function Navbar() {
  const { isSignupModal, setIsSignupModal } = useContext(MainContext);
  const { isLoginModal, setIsLoginModal } = useContext(MainContext);

  const closeSignupModal = () => {
    setIsSignupModal(false);
    if (localStorage.getItem("loggedIn")) {
      window.location.reload();
    }
  };

  const closeLoginModal = () => {
    setIsLoginModal(false);
    if (localStorage.getItem("loggedIn")) {
      window.location.reload();
    }
  };

  return (
    <nav>
      {localStorage.getItem("loggedIn") ? (
        <ul className="logged-in-navbar">
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Accueil</li>
          </NavLink>
          <NavLink
            to="/mes-favoris"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Favoris</li>
          </NavLink>
          <NavLink
            to="/forum"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Forum</li>
          </NavLink>
          <Logout />
        </ul>
      ) : (
        <ul className="not-logged-in-navbar">
          <div>
            <button type="button" onClick={() => setIsSignupModal(true)}>
              S'inscrire
            </button>
          </div>
          <div>
            <button type="button" onClick={() => setIsLoginModal(true)}>
              Se connecter
            </button>
          </div>
        </ul>
      )}
      {isSignupModal === true && <Signup closeSignupModal={closeSignupModal} />}
      {isLoginModal === true && <Login closeLoginModal={closeLoginModal} />}
    </nav>
  );
}

export default Navbar;
