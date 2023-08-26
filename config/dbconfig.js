const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
let filePathuser = "E:/Assigment/Dukaan/models/users.db";
const dbconfig = () => {
  if (fs.existsSync(filePathuser)) {
    return new sqlite3.Database(filePathuser);
  }
  let db = new sqlite3.Database(
    "E:/Assigment/Dukaan/models/users.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) {
        console.log("Some error occured while connecting to user db", err);
      }
      createUsertable(db);
      console.log("Connected to user Db successfully");
    }
  );
  return db;
};
const createUsertable = (db) => {
  db.run(
    `CREATE TABLE USERS (ID Integer PRIMARY KEY AUTOINCREMENT,name VARCHAR(50) NOT NULL,email VARCHAR(50) NOT NULL,password VARCHAR(100) NOT NULL)`
  );
  console.log("Table created successfully");
};
module.exports = { dbconfig };
