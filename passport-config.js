const passport = require("passport");
const LocalStrategy = require("passport-local");
const { dbconfig } = require("./config/dbconfig");
passport.use(
  new LocalStrategy((email, password, cb) => {
    let db = dbconfig();
    let sql = `SELECT * FROM USERS WHERE EMAIL=? `;
    db.get(sql, [email], async (err, row) => {
      if (err) return cb(err);
      if (!row) {
        return cb(null, false, {
          message: "Incorrect Email or Password.",
        });
      }
      let isPasswordCorrect = await bcrypt.compare(password, row.password);
      if (!isPasswordCorrect) {
        return cb(null, false, {
          message: "Incorrect Email or Password.",
        });
      }
      return cb(null, row);
    });
  })
);

passport.serializeUser((row, done) => {
  console.log("Serialized the user");
  done(null, row.id);
});

passport.deserializeUser((row, done) => {
  process.nextTick(() => {
    return done(null, row);
  });
});
module.exports = passport;
