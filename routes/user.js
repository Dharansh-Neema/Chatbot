const router = require("express").Router();
const passport = require("../passport-config");
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
router.route("/users/login").post(
  passport.authenticate("local", {
    successRedirect: "/",
  })
);
module.exports = router;
