import MovieCardForUser from "@components/MovieCardForUser";
import Navbar from "@components/Navbar";
import API from "@services/api";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/MovieCard.css";

function Favorites() {
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [moviesData, setMoviesData] = useState([]);
  const navigate = useNavigate();
  const [isMovieDeleted, setisMovieDeleted] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("loggedIn")) {
      navigate("/");
    }

    API.get(`/movies/users/${userId}`)
      .then((res) => {
        setMoviesData(res.data);
        setisMovieDeleted(false);
      })
      .catch((err) => console.error(err));
  }, [isMovieDeleted]);

  return (
    <div>
      <h1>Movizz le Retour</h1>
      <Navbar />
      <div className="result">
        {moviesData.length !== 0 ? (
          moviesData
            .map((movie) => (
              <MovieCardForUser
                key={movie.id}
                movie={movie}
                setisMovieDeleted={setisMovieDeleted}
              />
            ))
            .reverse()
        ) : (
          <h2 className="no-favorites-sentence">
            Aucun favori à afficher &nbsp;: (
          </h2>
        )}
      </div>
    </div>
  );
}

export default Favorites;
