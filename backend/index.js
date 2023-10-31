const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors()); //Allows different domain application to interact with each other.
app.use(express.json()); // Giving access to request the body of the request.

app.listen(5000, () => {
  console.log("The server has started at PORT 5000");
});
