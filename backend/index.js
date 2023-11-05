const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors()); //Allows different domain application to interact with each other.
app.use(express.json()); // Giving access to request the body of the request.

app.post("/insert-timeperiod", async (req, res) => {
  try {
    const data = req.body;

    for (const item of data) {
      const { timeperiod, monday, tuesday, wednesday, thursday, friday } = item;
      const query =
        "INSERT INTO s5 (timeperiod, monday, tuesday, wednesday, thursday, friday) VALUES ($1, $2, $3, $4, $5, $6)";
      await pool.query(query, [
        timeperiod,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
      ]);
    }

    res.status(200).json({ message: "Time periods inserted successfully" });
  } catch (error) {
    console.error("Error inserting time periods:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => {
  console.log("The server has started at PORT 5000");
});
