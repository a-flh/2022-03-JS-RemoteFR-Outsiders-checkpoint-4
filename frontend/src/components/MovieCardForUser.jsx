import API from "@services/api";
import React from "react";
import "../assets/MovieCard.css";
import poster from "../assets/poster.jpg";

function MovieCardForUser({ movie, setisMovieDeleted }) {
  const deleteMovie = () => {
    API.delete(`/movies/${movie.id}`)
      .then(() => setisMovieDeleted(true))
      .catch((err) => console.error(err));
  };

  return (
    <div className="movie-container">
      <div className="movie-card">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : poster
          }
          alt="affiche film"
        />
        <h2>{movie.title}</h2>
        {movie.release_date ? <h5>Sorti le {movie.release_date}</h5> : ""}
        <h4>
          {movie.vote_average}/10 <span>⭐</span>
        </h4>

        <ul>
          {movie.genres.split(",").map((genre) => (
            <li key={movie.id}>{genre}</li>
          ))}
        </ul>
        {movie.overview ? <h3>Synopsis</h3> : ""}
        <p>{movie.overview}</p>
      </div>
      <div className="button-container">
        <button type="button" onClick={() => deleteMovie()}>
          Retirer des favoris
        </button>
      </div>
    </div>
  );
}

export default MovieCardForUser;
