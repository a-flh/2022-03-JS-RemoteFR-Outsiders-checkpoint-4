const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  static table = "user";

  insert(user) {
    return this.connection.query(
      `insert into ${UsersManager.table} (pseudo, email, password) values (?, ?, ?)`,
      [user.pseudo, user.email, user.password]
    );
  }

  findByPseudo(user) {
    return this.connection
      .query(`SELECT * FROM ${UsersManager.table} WHERE pseudo = ?`, [
        user.pseudo,
      ])
      .then((res) => res[0]);
  }

  findById(userId) {
    return this.connection
      .query(`SELECT pseudo FROM ${UsersManager.table} WHERE id = ?`, [userId])
      .then((res) => res[0]);
  }
}

module.exports = UsersManager;
