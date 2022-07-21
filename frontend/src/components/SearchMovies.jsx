import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "../assets/common.css";
import "../assets/SearchMovies.css";

function SearchMovies() {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("a");
  const [sortGoodBad, setSortGoodBad] = useState("");
  const apiKey = "8b3e8af5c0e9e0a359483a16acf719e2";

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&language=fr-FR`
      )
      .then((res) => {
        setMoviesData(res.data.results);
      });
  }, [search]);

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Rechercher un film"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="btn-sort-container">
          <button
            type="button"
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Best <span>&#10138;</span>
          </button>
          <button
            type="button"
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Worst <span>&#10136;</span>
          </button>
        </div>
      </div>
      <div className="result">
        {moviesData
          .slice(0, 20)
          .sort((a, b) => {
            if (sortGoodBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            }
            if (sortGoodBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
            return "";
          })
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
}

export default SearchMovies;
