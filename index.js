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
//creating converstaion table
const createConversationTable = require("./config/conversationEntity");
createConversationTable();
//Regular middlewalre
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Setting up Passport and session
const passport = require("passport");
const session = require("express-session");
let SQLiteStore = require("connect-sqlite3")(session);
app.use(
  session({
    secret: "chatbotsecret",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "users.db", dir: "./models/" }),
  })
);
app.use(passport.initialize());
app.use(passport.authenticate("session"));
//Importing routes
const userRoutes = require("./routes/user");
const chatbotrourtes = require("./routes/chatbot");
const conversation = require("./routes/conversation");
app.use("/", userRoutes, chatbotrourtes, conversation);

//Setting up the PORT
app.listen(PORT, () => {
  console.log(`Server is listening on PORT:${PORT}`);
});
