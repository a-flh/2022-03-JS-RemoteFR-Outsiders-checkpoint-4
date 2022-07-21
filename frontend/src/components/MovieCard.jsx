import API from "@services/api";
import React, { useState } from "react";
import "../assets/MovieCard.css";
import poster from "../assets/poster.jpg";

function MovieCard({ movie }) {
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [isMovieAdded, setIsMovieAdded] = useState(false);

  const dateFormater = (date) => {
    const [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const genreFinder = () => {
    const genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i += 1) {
      switch (movie.genre_ids[i]) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => <li key={genre}>{genre}</li>);
  };

  const addMovie = () => {
    API.post(`/add-movies/users/${userId}`, {
      userId,
      poster_path: movie.poster_path,
      title: movie.title,
      release_date: dateFormater(movie.release_date),
      vote_average: movie.vote_average,
      genres: genreFinder(movie.genre_ids)
        .map((el) => el.key)
        .join(","),
      overview: movie.overview,
    })
      .then(() => setIsMovieAdded(true))
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
        {movie.release_date ? (
          <h5>Sorti le {dateFormater(movie.release_date)}</h5>
        ) : (
          ""
        )}
        <h4>
          {movie.vote_average}/10 <span>⭐</span>
        </h4>
        <ul>{movie.genre_ids && genreFinder(movie.genre_ids)}</ul>
        {movie.overview ? <h3>Synopsis</h3> : ""}
        <p>{movie.overview}</p>
      </div>
      <div className="button-container">
        {localStorage.getItem("loggedIn") && (
          <button className="btn" type="button" onClick={() => addMovie()}>
            {isMovieAdded ? "Ajouté !" : "Ajouter aux favoris"}
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
