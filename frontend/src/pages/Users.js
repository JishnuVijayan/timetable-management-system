import React from "react";
import UserpageAdmin from "../components/UserpageAdmin";
import UserpageUser from "../components/UserpageUser";
import { Grid } from "@mui/material";
import "../styles/Users.css";

export default function Users() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontSize: 30,
          }}
        >
          Welcome to Timetable management system
        </h2>
      </div>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <UserpageUser />
        </Grid>
      </Grid>
    </div>
  );
}
