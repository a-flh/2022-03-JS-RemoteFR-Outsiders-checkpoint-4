import Navbar from "@components/Navbar";
import SearchMovies from "@components/SearchMovies";
import React from "react";

function Home() {
  return (
    <div>
      <h1>Movizz le Retour</h1>
      <Navbar />
      <SearchMovies />
    </div>
  );
}

export default Home;
