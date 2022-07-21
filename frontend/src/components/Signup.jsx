import React, { useState } from "react";
import "../assets/Modal.css";
import API from "@services/api";

function Signup({ closeSignupModal }) {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post(`/auth/users`, {
      pseudo,
      email,
      password,
    })
      .then((res) => {
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("loggedIn", true);
        setIsSignedIn(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="modal">
      <div
        aria-hidden="true"
        onClick={closeSignupModal}
        className="modal-overlay"
      />
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="modal-close-button"
            onClick={closeSignupModal}
          >
            &times;
          </button>
        </div>
        <div className="modal-message">
          {isSignedIn ? (
            <h2>Votre inscription a bien été prise en compte !</h2>
          ) : (
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
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
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
              <div />
              <button type="submit"> S'inscrire</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
