import API from "@services/api";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MainContext } from "../contexts/MainContext";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";

function Navbar() {
  const { isSignupModal, setIsSignupModal } = useContext(MainContext);
  const { isLoginModal, setIsLoginModal } = useContext(MainContext);
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [pseudo, setPseudo] = useState("");

  useEffect(() => {
    API.get(`/users/${userId}`)
      .then((res) => setPseudo(res.data.pseudo))
      .catch((err) => console.error(err));
  });

  const closeSignupModal = () => {
    setIsSignupModal(false);
  };

  const closeLoginModal = () => {
    setIsLoginModal(false);
  };

  return (
    <nav>
      {localStorage.getItem("loggedIn") ? (
        <ul>
          <NavLink to="*">
            <li>Accueil</li>
          </NavLink>
          <NavLink to="/mes-favoris">
            <li>Favoris</li>
          </NavLink>
          <Logout />
        </ul>
      ) : (
        <ul>
          <NavLink to="*">
            <li>Accueil</li>
          </NavLink>
          <button type="button" onClick={() => setIsSignupModal(true)}>
            S'inscrire
          </button>
          <button type="button" onClick={() => setIsLoginModal(true)}>
            Se connecter
          </button>
        </ul>
      )}
      {isSignupModal === true && <Signup closeSignupModal={closeSignupModal} />}
      {isLoginModal === true && <Login closeLoginModal={closeLoginModal} />}
      <h2>{pseudo}</h2>
    </nav>
  );
}

export default Navbar;
