import React from "react";
import API from "../services/api";

function Logout() {
  const handleLogout = (e) => {
    e.preventDefault();
    API.get(`/logout/users`, {
      withCredentials: true,
    })
      .then(() => {
        localStorage.clear();
        window.location = "/";
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <button
        type="button"
        className="button-deconnectmember"
        onClick={handleLogout}
      >
        Se déconnecter
      </button>
    </div>
  );
}

export default Logout;
