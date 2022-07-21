const AbstractManager = require("./AbstractManager");

class TopicManager extends AbstractManager {
  static table = "topic";

  insert(topic) {
    return this.connection.query(
      `insert into ${TopicManager.table} (userId, date, content) values (?, ?, ?)`,
      [topic.userId, topic.date, topic.content]
    );
  }
}

module.exports = TopicManager;
