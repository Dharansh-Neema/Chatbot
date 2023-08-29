const { dbconfig } = require("./dbconfig");

function droptablefxn(tableName) {
  let db = dbconfig();
  let sql = `DROP TABLE IF EXISTS ${tableName}`;
  db.run(sql, [], (err) => {
    if (!err) {
      console.log(`${tableName} Deleted successfully`);
    } else console.log(err.message);
  });
}
module.exports = droptablefxn;
