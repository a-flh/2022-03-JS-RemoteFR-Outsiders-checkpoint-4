import Navbar from "@components/Navbar";
import React, { useEffect, useState } from "react";
import Moment from "moment";
import API from "@services/api";
import "../assets/Forum.css";
import { useNavigate } from "react-router-dom";
import TopicCard from "@components/TopicCard";

function Forum() {
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const date = Moment().format("DD-MM-YYYY [à] hh[h]mm");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [isTopicSent, setIsTopicSent] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/");
    }
    API.get("/topics")
      .then((res) => {
        setTopics(res.data);
        setIsTopicSent(false);
      })
      .catch((err) => console.error(err));
  }, [isTopicSent]);

  const addTopic = (e) => {
    e.preventDefault();
    API.post("/add-topic", { userId, date, content })
      .then(() => {
        setContent("");
        setIsTopicSent(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Movizz le Retour</h1>
      <Navbar />
      <form className="add-topic" onSubmit={addTopic}>
        <input
          type="text"
          required
          placeholder="Une idée de topic ?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Poster</button>
      </form>
      <div className="topics-container">
        {topics &&
          topics
            .map((topic) => {
              return <TopicCard key={topic.id} topic={topic} />;
            })
            .reverse()}
      </div>
    </div>
  );
}

export default Forum;
