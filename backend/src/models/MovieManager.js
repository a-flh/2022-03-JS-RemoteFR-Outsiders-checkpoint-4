const AbstractManager = require("./AbstractManager");

class MovieManager extends AbstractManager {
  static table = "movie";

  insert(movie) {
    return this.connection.query(
      `INSERT into ${MovieManager.table} (userId, poster_path, title, release_date, vote_average, genres, overview) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        movie.userId,
        movie.poster_path,
        movie.title,
        movie.release_date,
        movie.vote_average,
        movie.genres,
        movie.overview,
      ]
    );
  }

  findByUserId(userId) {
    return this.connection
      .query(`SELECT * FROM ${MovieManager.table} WHERE userId = ?`, [userId])
      .then((res) => res[0]);
  }
}

module.exports = MovieManager;
