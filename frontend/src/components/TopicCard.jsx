import API from "@services/api";
import React, { useState, useEffect } from "react";
import Moment from "moment";
import MessageCard from "./MessageCard";

function TopicCard({ topic }) {
  const [pseudo, setPseudo] = useState("");
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const date = Moment().format("DD-MM-YYYY [à] hh[h]mm");
  const [topicMessage, setTopicMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [messagesNumber, setMessagesNumber] = useState(0);

  useEffect(() => {
    API.get(`/users/${topic.userId}`)
      .then((res) => setPseudo(res.data.pseudo))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    API.get(`/messages/${topic.id}`)
      .then((res) => {
        setMessages(res.data);
        setIsMessageSent(false);
      })
      .catch((err) => console.error(err));
  }, [isMessageSent]);

  useEffect(() => {
    API.get(`/messages-count/${topic.id}`)
      .then((res) => setMessagesNumber(res.data.number))
      .catch((err) => console.error(err));
  }, [isMessageSent]);

  const addMessage = (e) => {
    e.preventDefault();
    API.post("/add-message", {
      topicId: topic.id,
      userId,
      date,
      content: topicMessage,
    })
      .then(() => {
        setTopicMessage("");
        setIsMessageSent(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <details>
      <summary>{topic.content}</summary>
      <p className="topic-date">
        Topic ouvert par <span className="user-pseudo">{pseudo}</span>&nbsp; le{" "}
        {topic.date}
      </p>
      {messagesNumber === 0 && <p>Aucun message n'a été posté</p>}
      {messagesNumber === 1 && <p>{messagesNumber} message posté</p>}
      {messagesNumber > 1 && <p>{messagesNumber} messages postés</p>}
      <form className="form-topic" onSubmit={addMessage}>
        <textarea
          type="text"
          required
          placeholder="Votre message"
          value={topicMessage}
          onChange={(e) => setTopicMessage(e.target.value)}
        />
        <button type="submit">Poster</button>
      </form>
      <div className="message-container">
        {messages &&
          messages
            .sort((a, b) => a.id - b.id)
            .map((message) => {
              return <MessageCard key={message.id} message={message} />;
            })}
      </div>
    </details>
  );
}

export default TopicCard;
