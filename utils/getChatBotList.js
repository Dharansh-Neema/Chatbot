const { dbconfig } = require("../config/dbconfig");

function getchatBotList(userid) {
  return new Promise((resolve, reject) => {
    const db = dbconfig();
    let sql = `SELECT chatbots.id, chatbots.name,users.name
          FROM chatbots
          INNER JOIN users ON chatbots.userid = users.id
          WHERE users.id = ?`;
    db.all(sql, [userid], (err, row) => {
      if (err) reject(err);
      if (!row) reject("No chatbots founds");
      resolve(row);
    });
  });
}

function getaparticularChatbot(chatbotID) {
  return new Promise((resolve, reject) => {
    const db = dbconfig();
    let sql = `SELECT * FROM CHATBOTS WHERE ID=?`;
    db.get(sql, [chatbotID], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

module.exports = { getchatBotList, getaparticularChatbot };
