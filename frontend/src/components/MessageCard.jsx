import API from "@services/api";
import React, { useEffect, useState } from "react";

function MessageCard({ message }) {
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [messagePseudo, setMessagePseudo] = useState("");

  useEffect(() => {
    API.get(`/users/${message.userId}`)
      .then((res) => setMessagePseudo(res.data.pseudo))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className={
        message.userId === userId ? "personal-message-post" : "message-post"
      }
    >
      <div className="message-content">
        <p>{message.content}</p>
      </div>
      <div className="message-infos">
        <p>
          Posté par <span className="user-pseudo">{messagePseudo}</span>&nbsp;
          le {message.date}
        </p>
      </div>
    </div>
  );
}

export default MessageCard;
