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
      const { id, timeperiod, monday, tuesday, wednesday, thursday, friday } =
        item;
      const query =
        "INSERT INTO s5 (id, timeperiod, monday, tuesday, wednesday, thursday, friday) VALUES ($1, $2, $3, $4, $5, $6, $7)";
      await pool.query(query, [
        id,
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
    console.error("Error inserting values:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/insert-subandfaculty", async (req, res) => {
  try {
    const subAndFacultyData = req.body; // Assuming the data structure is an array with objects

    for (const item of subAndFacultyData) {
      const { subject, faculty } = item; // Extract id, subject, and faculty
      const query =
        "INSERT INTO subject_faculty ( sub_name, fac_name) VALUES ( $1, $2)";
      await pool.query(query, [subject, faculty]);
    }

    res
      .status(200)
      .json({ message: "Data inserted into subandfaculty table successfully" });
  } catch (error) {
    console.error("Error inserting data into subandfaculty table:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => {
  console.log("The server has started at PORT 5000");
});



