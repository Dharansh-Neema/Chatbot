const router = require("express").Router();
const {
  chatbotCreate,
  chatbotlist,
  deleteChatbot,
  chatbotUsingId,
} = require("../controllers/chatbot");

router.route("/users/:userId/chatbots").post(chatbotCreate).get(chatbotlist);
router.route("/chatbots/:chatbotId").get(chatbotUsingId).delete(deleteChatbot);
module.exports = router;
