import React, { useState } from "react";
import "../assets/Modal.css";
import API from "@services/api";

function Login({ closeLoginModal }) {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post(`/login/users`, {
      pseudo,
      password,
    })
      .then((res) => {
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("loggedIn", true);
        closeLoginModal();
        window.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="modal">
      <div
        aria-hidden="true"
        onClick={closeLoginModal}
        className="modal-overlay"
      />
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="modal-close-button"
            onClick={closeLoginModal}
          >
            &times;
          </button>
        </div>
        <div className="modal-message">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Pseudo"
                required
                onChange={(e) => setPseudo(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Se connecter</button>
            <div />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
