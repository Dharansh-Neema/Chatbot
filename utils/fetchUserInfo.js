const { dbconfig } = require("../config/dbconfig");
function fetchUserInfo(userId) {
  let db = dbconfig();
  let sql = `SELECT * FROM USERS WHERE ID=?`;
  return new Promise((resolve, reject) => {
    db.get(sql, [userId], (err, user) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      if (!user) {
        res.status(404).json({
          success: false,
          error: "No user found for the requested ID",
        });
      }
      resolve(user);
    });
  });
}
module.exports = fetchUserInfo;
