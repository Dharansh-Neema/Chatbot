const fetchUserInfo = require("../utils/fetchUserInfo");
const { dbconfig } = require("../config/dbconfig");
const {
  getchatBotList,
  getaparticularChatbot,
} = require("../utils/getChatBotList");
exports.chatbotCreate = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) throw new Error("User id is required");
    let db = dbconfig();
    const userInfo = await fetchUserInfo(userId);
    console.log("In main fxn", userInfo);
    const created = Date.now();
    let name = `ChatBot_${userInfo.name}_${userId} `;
    let sql = `INSERT INTO CHATBOTS(USERID,NAME,CREATED) VALUES (?, ?, ?)`;
    db.run(sql, [userId, name, created], (err) => {
      if (err) {
        res.status(500).json({ success: false, error: err.message });
        return;
      }
      res.status(200).json({
        success: true,
        message: `Chatbot created successfully for UserID: ${userId} with name of ${name}`,
      });
      return;
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.chatbotlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await getchatBotList(userId);
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.chatbotUsingId = async (req, res) => {
  try {
    const { chatbotId } = req.params;
    const response = await getaparticularChatbot(chatbotId);
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteChatbot = async (req, res) => {
  const chatbotId = req.params.chatbotId;
  const db = dbconfig();
  let sql = `DELETE FROM CHATBOTS WHERE ID=?`;
  db.run(sql, [chatbotId], (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Unable to delete",
        error: err.message,
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Deleted Chatbot with ID:${chatbotId}`,
    });
  });
};
