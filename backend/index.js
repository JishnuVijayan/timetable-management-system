const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors()); //Allows different domain application to interact with each other.
app.use(express.json()); // Giving access to request the body of the request.

app.post("/insert-timeperiod", async (req, res) => {
  try {
    const { semester, data } = req.body;

    for (const item of data) {
      const { timeperiod, monday, tuesday, wednesday, thursday, friday } = item;
      const query = `
      INSERT INTO ${semester}_cse
      (timeperiod, monday, tuesday, wednesday, thursday, friday) 
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
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
    console.error("Error inserting values:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/insert-subandfaculty", async (req, res) => {
  try {
    const { semester, subAndFacultyData } = req.body;

    for (const item of subAndFacultyData) {
      const { subject, faculty } = item;
      const query = `
      INSERT INTO ${semester}_cse_sub_fac (sub_name, fac_name) 
      VALUES ($1, $2)
    `;
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


app.post("/search", async (req, res) => {
  try {
    const { semesters, facultyName } = req.body;

    const semesterTables = semesters
      .map(
        (semester) => `
      SELECT '${semester}' AS semester,
             ${semester}_cse.id,
             ${semester}_cse.timeperiod,
             CASE WHEN ${semester}_cse.monday = ${semester}_cse_sub_fac.sub_name THEN ${semester}_cse_sub_fac.sub_name END AS monday,
             CASE WHEN ${semester}_cse.tuesday = ${semester}_cse_sub_fac.sub_name THEN ${semester}_cse_sub_fac.sub_name END AS tuesday,
             CASE WHEN ${semester}_cse.wednesday = ${semester}_cse_sub_fac.sub_name THEN ${semester}_cse_sub_fac.sub_name END AS wednesday,
             CASE WHEN ${semester}_cse.thursday = ${semester}_cse_sub_fac.sub_name THEN ${semester}_cse_sub_fac.sub_name END AS thursday,
             CASE WHEN ${semester}_cse.friday = ${semester}_cse_sub_fac.sub_name THEN ${semester}_cse_sub_fac.sub_name END AS friday
      FROM ${semester}_cse
      JOIN ${semester}_cse_sub_fac ON ${semester}_cse.monday = ${semester}_cse_sub_fac.sub_name
                              OR ${semester}_cse.tuesday = ${semester}_cse_sub_fac.sub_name
                              OR ${semester}_cse.wednesday = ${semester}_cse_sub_fac.sub_name
                              OR ${semester}_cse.thursday = ${semester}_cse_sub_fac.sub_name
                              OR ${semester}_cse.friday = ${semester}_cse_sub_fac.sub_name
      WHERE ${semester}_cse_sub_fac.fac_name = $1
    `
      )
      .join(" UNION ALL ");

    const finalQuery = `
    SELECT DISTINCT ON (result.id)
      result.id,
      result.timeperiod,
      STRING_AGG(result.monday, '') AS monday,
      STRING_AGG(result.tuesday, '') AS tuesday,
      STRING_AGG(result.wednesday, '') AS wednesday,
      STRING_AGG(result.thursday, '') AS thursday,
      STRING_AGG(result.friday, '') AS friday
    FROM (${semesterTables}) AS result
    GROUP BY result.id, result.timeperiod
    ORDER BY result.id, result.timeperiod;
  `;

    const result = await pool.query(finalQuery, [facultyName]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error searching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/deletetable", async (req, res) => {
  try {
    const { semester } = req.body;
    console.log(semester);

    const truncateQuery = `
    TRUNCATE TABLE ${semester}_cse RESTART IDENTITY;
    TRUNCATE TABLE ${semester}_cse_sub_fac RESTART IDENTITY;
  `;
    await pool.query(truncateQuery);

    res.status(200).json("DELETED SUCCESSFULLY.");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error truncating tables or resetting sequences" });
  }
});

app.listen(5000, () => {
  console.log("The server has started at PORT 5000");
});
