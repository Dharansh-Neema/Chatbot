const { dbconfig } = require("./dbconfig");
const createConversationTable = () => {
  let db = dbconfig();
  db.run(
    `CREATE TABLE IF NOT EXISTS CONVERSATION (CHATBOTID Integer,USERID Integer,ID Integer PRIMARY KEY AUTOINCREMENT,MESSAGES TEXT,LASTMESSAGE TIMESTAMP,FOREIGN KEY (USERID) REFERENCES USERS (ID), FOREIGN KEY (CHATBOTID) REFERENCES CHATBOTS(ID) )`
  );
  console.log("CONVERSATION table is created");
};
module.exports = createConversationTable;
