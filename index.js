const express = require("express");
const app = express();
const PORT = 8080;
//DB config
const { dbconfig } = require("./config/dbconfig");
dbconfig();
//Regular middlewalre
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//Importing routes
const userRoutes = require("./routes/user");
app.use("/", userRoutes);

//Setting up the PORT
app.listen(PORT, () => {
  console.log(`Server is listening on PORT:${PORT}`);
});
