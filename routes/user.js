const router = require("express").Router();
const {
  home,
  createusers,
  getallusers,
  getuserfromid,
  updateUser,
  deleteUser,
} = require("../controllers/user");
router.route("/").get(home);
//REST API FOR USERS
router
  .route("/users/:id")
  .get(getuserfromid)
  .put(updateUser)
  .delete(deleteUser);

router.route("/users").post(createusers).get(getallusers);
module.exports = router;
