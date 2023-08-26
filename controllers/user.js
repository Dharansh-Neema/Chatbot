const { dbconfig } = require("../config/dbconfig");
const bcrypt = require("bcryptjs");
exports.home = async (req, res) => {
  res.send("<h1>Hello, Welcome to ChatConvo </h1>");
};

//create users routes
exports.createusers = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    let db = dbconfig();
    //Hashing the password with 10 round of salts
    password = await bcrypt.hash(password, 10);
    db.run(
      `INSERT INTO USERS (NAME,EMAIL,PASSWORD) VALUES (?,?,?)`,
      [name, email, password],
      (err) => {
        if (err) {
          console.log(err);
          res.status(401).json({
            success: false,
            message: "Something went wrong while inserting into Database",
          });
        }
        console.log("User created successfully");
        res.status(200).json({
          success: true,
          message: `Congratulations ${name}, You have successfully signed up for CHATBOT-TALKS`,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Something went wrong while creating users",
    });
  }
};

//get all user routes
exports.getallusers = async (req, res) => {
  try {
    let db = dbconfig();
    let sql = `SELECT * FROM USERS`;
    db.all(sql, (err, row) => {
      if (err) {
        console.log(err);
        res.status(501).json({
          success: false,
          message: "Something went wrong while fetching all users",
        });
      }
      console.log(row);
      res.status(200).json({
        success: true,
        row,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//get the users from their :id

exports.getuserfromid = async (req, res) => {
  try {
    const id = req.params.id;
    let db = dbconfig();
    console.log(id);
    let sql = `SELECT * FROM USERS WHERE ID=?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.log(err);
        res.status(501).json({
          success: false,
          message: `Something went wrong while fetching ID:${id}`,
        });
        return;
      }
      if (!row) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json({
        success: true,
        row,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
exports.updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let { name } = req.body;
    let db = dbconfig();
    let sql = `UPDATE USERS SET name=? WHERE ID=?`;
    db.run(sql, [name, id], (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: `Something went wrong while updating ID:${id}`,
        });
      }
      res.status(200).json({
        success: true,
        message: `ID:${id} has been updated successfully `,
      });
      return;
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    let db = dbconfig();
    let sql = `DELETE FROM USERS WHERE ID=?`;
    db.run(sql, [id], (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: `Something went wrong while Deleting ID:${id}`,
        });
      }
      res.status(200).json({
        success: true,
        message: `ID:${id} has been deleted successfully `,
      });
      return;
    });
  } catch (error) {}
};
