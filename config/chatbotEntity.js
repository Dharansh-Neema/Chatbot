const { dbconfig } = require("./dbconfig");
const createChatBotTable = () => {
  let db = dbconfig();
  db.run(
    `CREATE TABLE CHATBOTS (USERID,ID Integer PRIMARY KEY AUTOINCREMENT,NAME VARCHAR(50),CREATED Integer,FOREIGN KEY (USERID) REFERENCES USERS (ID))`
  );
  console.log("CHATBOTS table is created");
};
module.exports = createChatBotTable;
