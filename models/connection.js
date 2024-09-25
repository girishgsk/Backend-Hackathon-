const mongoose = require("mongoose");

//---------create a connection ------------

mongoose
  .connect("mongodb://127.0.0.1:27017/digitalusers")
  .then(() => console.log("The database is connected succesfully"))
  .catch((err) => console.log("OPPs! ,Connection failed", err));
