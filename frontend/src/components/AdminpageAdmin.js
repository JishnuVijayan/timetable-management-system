import React from "react";

import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function AdminpageAdmin() {
  const [inputFormat, setInputFormat] = useState([
    {
      id: 1,
      day: "monday",
    },
    {
      id: 2,
      day: "tuesday",
    },
    {
      id: 3,
      day: "wednesday",
    },
    {
      id: 4,
      day: "thursday",
    },
    {
      id: 5,
      day: "friday",
    },
  ]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Admin</h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 20,
          }}
        >
          <h3>Enter the semester:</h3>
          <TextField
            id="standard-basic"
            variant="standard"
            style={{ paddingTop: 8 }}
          />
        </div>
        {inputFormat.map((day) => (
          <>
            <h3>For {day.day}:</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                columnGap: 10,
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: 10,
                }}
              >
                <h3>1:</h3>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  style={{ width: 60, paddingTop: 8 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: 10,
                }}
              >
                <h3>2:</h3>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  style={{ width: 60, paddingTop: 8 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: 10,
                }}
              >
                <h3>4:</h3>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  style={{ width: 60, paddingTop: 8 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: 10,
                }}
              >
                <h3>5:</h3>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  style={{ width: 60, paddingTop: 8 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: 10,
                }}
              >
                <h3>6:</h3>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  style={{ width: 60, paddingTop: 8 }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  columnGap: 10,
                }}
              >
                <h3>7:</h3>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  style={{ width: 60, paddingTop: 8 }}
                />
              </div>
            </div>
          </>
        ))}
      </div>
      <h3>Subject name and Faculty name: </h3>
      {Array.from({ length: 6 }, () => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 200,
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", columnGap: 10 }}>
            <h3>Subject name: </h3>
            <TextField
              id="standard-basic"
              variant="standard"
              style={{ paddingTop: 8 }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", columnGap: 10 }}>
            <h3>Faculty name: </h3>
            <TextField
              id="standard-basic"
              variant="standard"
              style={{ paddingTop: 8 }}
            />
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button class="button3">
          <span class="button-content" style={{ fontSize: 19 }}>
            Submit
          </span>
        </button>
      </div>
    </div>
  );
}
