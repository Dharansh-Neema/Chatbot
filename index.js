const express = require("express");
const app = express();
const PORT = 8080;
//DB config
const { dbconfig } = require("./config/dbconfig");
dbconfig();
//to drop tables;
// const droptable = require("./config/droptable");
// droptable("CHATBOTS");

//Creating chatbot table
// const createChatBotTable = require("./config/chatbotEntity");
// createChatBotTable();
//Regular middlewalre
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//Importing routes
const userRoutes = require("./routes/user");
const chatbotrourtes = require("./routes/chatbot");
app.use("/", userRoutes, chatbotrourtes);

//Setting up the PORT
app.listen(PORT, () => {
  console.log(`Server is listening on PORT:${PORT}`);
});
