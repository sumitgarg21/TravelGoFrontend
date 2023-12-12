const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config({ path: __dirname + '/.env' });
const db_link = process.env.DB_LINK;
const port = process.env.PORT || 5000;
app.listen(port);
var cors = require("cors");
const mongoose = require("mongoose")
mongoose.connect(db_link)
  .then(function (db) {
    console.log("db conncected")
  })
  .catch(function (err) {
    console.log(err)
  })
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Sumit!");
});

app.use("/user", require("./userRouter"));
app.use("/ticket", require("./ticketRouter"));

