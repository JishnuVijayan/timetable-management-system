import React from "react";
import "../styles/UserpageUser.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";

export default function UserpageUser() {
  const [semester, setSemester] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  console.log(semester);
  console.log(facultyName);

  const handleSearch = async () => {
    try {
      const values = { semester, facultyName };
      const response = await axios.post(
        "http://localhost:5000/search",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSearchResult(response.data);
      console.log(response.data);
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>USERS</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="Headings">
          <h3>Enter the Semester :</h3>
          <h3>Enter the Faculty name :</h3>
        </div>
        <div className="Textfield2">
          <TextField
            id="standard-basic"
            variant="standard"
            style={{ width: 350, paddingBottom: 10, paddingTop: 10 }}
            onChange={(e) => setSemester(e.target.value)}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            style={{ width: 350, paddingBottom: 20 }}
            onChange={(e) => setFacultyName(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button class="button3" onClick={handleSearch}>
              <span class="button-content" style={{ fontSize: 19 }}>
                Find
              </span>
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
