const router = require("express").Router();
const {
  startconversation,
  allconversation,
  updateConversation,
  deleteconversation,
  singleConversation,
} = require("../controllers/conversation");
router
  .route("/chatbots/:chatbotId/conversations")
  .post(startconversation)
  .get(allconversation);
router
  .route("/conversations/:conversationId")
  .get(singleConversation)
  .put(updateConversation)
  .delete(deleteconversation);
module.exports = router;
