// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require("./db");

// app.use(cors()); //Allows different domain application to interact with each other.
// app.use(express.json()); // Giving access to request the body of the request.

// app.post("/insert-timeperiod", async (req, res) => {
//   try {
//     const data = req.body;

//     for (const item of data) {
//       const { timeperiod, monday, tuesday, wednesday, thursday, friday } = item;
//       const query =
//         "INSERT INTO S5 ( timeperiod, monday, tuesday, wednesday, thursday, friday) VALUES ($1, $2, $3, $4, $5, $6)";
//       await pool.query(query, [
//         timeperiod,
//         monday,
//         tuesday,
//         wednesday,
//         thursday,
//         friday,
//       ]);
//     }

//     res.status(200).json({ message: "Time periods inserted successfully" });
//   } catch (error) {
//     console.error("Error inserting values:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.post("/insert-subandfaculty", async (req, res) => {
//   try {
//     const subAndFacultyData = req.body; // Assuming the data structure is an array with objects

//     for (const item of subAndFacultyData) {
//       const { subject, faculty } = item; // Extract id, subject, and faculty
//       const query =
//         "INSERT INTO S5_sub_fac ( sub_name, fac_name) VALUES ( $1, $2)";
//       await pool.query(query, [subject, faculty]);
//     }

//     res
//       .status(200)
//       .json({ message: "Data inserted into subandfaculty table successfully" });
//   } catch (error) {
//     console.error("Error inserting data into subandfaculty table:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.post("/search", async (req, res) => {
//   try {
//     const { semester, facultyName } = req.body;

//     const query = `
//         SELECT S5.id, S5.timeperiod,
//           CASE WHEN S5.monday = S5_sub_fac.sub_name THEN S5_sub_fac.sub_name END AS monday,
//           CASE WHEN s5.tuesday = S5_sub_fac.sub_name THEN S5_sub_fac.sub_name END AS tuesday,
//           CASE WHEN s5.wednesday = S5_sub_fac.sub_name THEN S5_sub_fac.sub_name END AS wednesday,
//           CASE WHEN s5.thursday = S5_sub_fac.sub_name THEN S5_sub_fac.sub_name END AS thursday,
//           CASE WHEN s5.friday = S5_sub_fac.sub_name THEN S5_sub_fac.sub_name END AS friday
//         FROM S5
//         JOIN S5_sub_fac ON S5.monday = S5_sub_fac.sub_name
//                             OR S5.tuesday = S5_sub_fac.sub_name
//                             OR S5.wednesday = S5_sub_fac.sub_name
//                             OR S5.thursday = S5_sub_fac.sub_name
//                             OR S5.friday = S5_sub_fac.sub_name
//         WHERE S5_sub_fac.fac_name = $1 ORDER BY S5.id;
//       `;

//     const result = await pool.query(query, [facultyName]);

//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error("Error searching data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.delete("/deletetable", async (req, res) => {
//   try {
//     const { semester } = req.body;
//     console.log(semester);
//     const query = `
//         TRUNCATE TABLE  "${semester}";
//         TRUNCATE TABLE  "${semester}_sub_fac";
//       `;
//     await pool.query(query);
//     res.status(200).json("DELETED SUCCESSFULLY.");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// const resetSequenceS5 = `
//     ALTER SEQUENCE "S5_id_seq" RESTART WITH 1;
//   `;
// await pool.query(resetSequenceS5);

// const resetSequenceS5SubFac = `
//   ALTER SEQUENCE "S5_sub_fac_s_id_seq" RESTART WITH 1;
// `;
// await pool.query(resetSequenceS5SubFac);
// app.listen(5000, () => {
//   console.log("The server has started at PORT 5000");
// });

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
        "INSERT INTO S5 ( timeperiod, monday, tuesday, wednesday, thursday, friday) VALUES ($1, $2, $3, $4, $5, $6)";
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
    const subAndFacultyData = req.body; // Assuming the data structure is an array with objects

    for (const item of subAndFacultyData) {
      const { subject, faculty } = item; // Extract id, subject, and faculty
      const query =
        "INSERT INTO S5_sub_fac ( sub_name, fac_name) VALUES ( $1, $2)";
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
    const { semester, facultyName } = req.body;

    const query = `
      SELECT S5.id, S5.timeperiod, 
        CASE WHEN S5.monday = S5_sub_fac.sub_name THEN S5_sub_fac.sub_name END AS monday,
        CASE WHEN s5.tuesday = S5_sub_fac.sub_name THEN S5_sub_fac.sub_name END AS tuesday,
        CASE WHEN s5.wednesday = S5_sub_fac.sub_name THEN S5_sub_fac.sub_name END AS wednesday,
        CASE WHEN s5.thursday = S5_sub_fac.sub_name THEN S5_sub_fac.sub_name END AS thursday,
        CASE WHEN s5.friday = S5_sub_fac.sub_name THEN S5_sub_fac.sub_name END AS friday
      FROM S5
      JOIN S5_sub_fac ON S5.monday = S5_sub_fac.sub_name
                          OR S5.tuesday = S5_sub_fac.sub_name
                          OR S5.wednesday = S5_sub_fac.sub_name
                          OR S5.thursday = S5_sub_fac.sub_name
                          OR S5.friday = S5_sub_fac.sub_name
      WHERE S5_sub_fac.fac_name = $1 ORDER BY S5.id;
    `;

    const result = await pool.query(query, [facultyName]);

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

    // Truncate tables with RESTART IDENTITY to reset sequences
    const truncateQuery = `
      TRUNCATE TABLE "${semester}" RESTART IDENTITY;
      TRUNCATE TABLE "${semester}_sub_fac" RESTART IDENTITY;
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
