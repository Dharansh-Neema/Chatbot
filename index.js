const express = require("express");
const app = express();
const PORT = 8080;

//Setting up the PORT
app.listen(PORT, () => {
  console.log(`Server is listening on PORT:${PORT}`);
});
