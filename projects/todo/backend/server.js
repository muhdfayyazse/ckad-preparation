/**
 * Created by Syed Afzal
 */
//require("./config/config");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const API_PORT = process.env.BACKEND_API_PORT || "5000";

const app = express();

//connection from db here
db.connect(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//  adding routes
require("./routes")(app);

app.on("ready", () => {
  app.listen(API_PORT, () => {
    console.log("Server is up on port", API_PORT);
  });
});

module.exports = app;
