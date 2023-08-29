const { dockStart } = require("@nlpjs/basic");
const { dbconfig } = require("../config/dbconfig");

let db = dbconfig();
exports.startconversation = async (req, res) => {
  try {
    //Setting up chatbot response
    const dock = await dockStart({
      settings: {
        nlp: {
          forceNER: true,
          languages: ["en"],
          corpora: ["E:/Assigment/Dukaan/controllers/corpus.json"],
        },
      },
      use: ["Basic", "LangEn"],
    });
    const manager = dock.get("nlp");
    await manager.train();
    const usertext = req.body.text;
    const userId = req.body.userId;
    const chatbotId = req.params.chatbotId;
    const LASTMESSAGE = Date.now();
    const response = await manager.process("en", usertext);
    let conversation = [
      { user: usertext, bot: response.answer, time: new Date(Date.now()) },
    ];
    let stringConvo = JSON.stringify(conversation);
    // console.log(response);
    let sql =
      "INSERT INTO CONVERSATION(USERID,CHATBOTID,LASTMESSAGE,MESSAGES) VALUES (?,?,?,?)";
    db.run(sql, [userId, chatbotId, LASTMESSAGE, stringConvo], (err) => {
      if (err) {
        res.status(500).json({ sucess: false, error: err.message });
        return;
      }
      console.log("Conversation started");
      res.status(200).json({
        success: true,
        response: conversation,
        result: "New Conversation started",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.allconversation = async (req, res) => {
  try {
    const chatbotId = req.params.chatbotId;
    let response = await new Promise((resolve, reject) => {
      let sql = "SELECT * FROM CONVERSATION WHERE CHATBOTID=?";
      db.all(sql, [chatbotId], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
    // console.log(response);
    response[0].MESSAGES = JSON.parse(response[0].MESSAGES);
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.singleConversation = (req, res) => {
  const conversationId = req.params.conversationId;
  let sql = "SELECT * FROM CONVERSATION WHERE ID=?";
  db.all(sql, [conversationId], (err, row) => {
    if (err) {
      //   console.log(err);
      res.status(400).json({ success: false, error: err.message });
      return;
    }
    row[0].MESSAGES = JSON.parse(row[0].MESSAGES);
    res.status(200).json({ success: true, row });
  });
};

exports.updateConversation = async (req, res) => {
  const conversationId = req.params.conversationId;
  if (!conversationId) throw new Error("ID is required");
  const dock = await dockStart({
    settings: {
      nlp: {
        forceNER: true,
        languages: ["en"],
        corpora: ["E:/Assigment/Dukaan/controllers/corpus.json"],
      },
    },
    use: ["Basic", "LangEn"],
  });
  const manager = dock.get("nlp");
  await manager.train();
  const usertext = req.body.text;
  const response = await manager.process("en", usertext);

  let ExisitingSql = "SELECT * FROM CONVERSATION WHERE ID=?";
  db.get(ExisitingSql, [conversationId], (err, row) => {
    if (err) {
      res.status(400).json({ success: false, error: err.message });
      return;
    }
    let converstaionMessages = JSON.parse(row.MESSAGES);
    let conversation = [
      { user: usertext, bot: response.answer, time: new Date(Date.now()) },
    ];
    const lastmessage = Date.now();
    converstaionMessages.push(conversation);
    let stringConvo = JSON.stringify(converstaionMessages);
    let sql = "UPDATE CONVERSATION SET MESSAGES=? ,LASTMESSAGE=? WHERE ID=?";
    db.run(sql, [stringConvo, lastmessage, conversationId], (err) => {
      if (err) {
        res.status(400).json({
          success: false,
          error: err.message,
          result: "Updation failed",
        });
        return;
      }
      console.log("New Conversation added");
      res.status(200).json({
        success: true,
        messages: converstaionMessages,
        result: "Convrsation Updated successfully",
      });
    });
  });
};

exports.deleteconversation = async (req, res) => {
  const conversationId = req.params.conversationId;
  let sql = "DELETE FROM CONVERSATION WHERE ID=?";
  db.run(sql, [conversationId], (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        error: err.message,
        result: "Deletion of conversation failed",
      });
      return;
    }
    res.status(200).json({
      success: true,
      result: `Deletion of conversation with ID:${conversationId} completed successfully`,
    });
  });
};
