const AbstractManager = require("./AbstractManager");

class MessageManager extends AbstractManager {
  static table = "message";

  insert(message) {
    return this.connection.query(
      `insert into ${MessageManager.table} (topicId, userId, date, content) values (?, ?, ?, ?)`,
      [message.topicId, message.userId, message.date, message.content]
    );
  }

  findById(topicId) {
    return this.connection.query(
      `SELECT * FROM ${MessageManager.table} WHERE message.topicId = ?`,
      [topicId]
    );
  }

  getMessagesCount(topicId) {
    return this.connection
      .query(
        `SELECT COUNT(id) AS "number" FROM message WHERE message.topicId = ?`,
        [topicId]
      )
      .then((res) => res[0]);
  }
}

module.exports = MessageManager;
