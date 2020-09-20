const express = require("express");
const mongoose = require("./src/database");


mongoose._connect();

const app = express();
app.use(express.json())
app.use("/user",require("./routes/users.js"))

const PORT = process.env.PORT || 5000
app.listen(5000, (err) => {
  if (err) console.log(err.message);
  console.log(`server is running on port ${PORT}`);
});
