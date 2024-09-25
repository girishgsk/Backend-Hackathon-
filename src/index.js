const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8000;
const path = require("path");
const connection = require("../models/connection");
// const { member } = require("../models/db");

//------------app use ---------------
const app = express();

//--------giving static path of files , images stored
const staticFiles = path.join(__dirname, "../files/");
// console.log(staticFiles);
app.use(express.static(staticFiles));

//---------------Routings---------------
const login = require("../routers/login");
const posts = require("../routers/post");

//----------API from router----
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//---------routes------------
app.use(login);
app.use(posts);

///----------Listening app --------------
app.listen(port, () => {
  console.log(`The app is listening on ${port} port `);
});
