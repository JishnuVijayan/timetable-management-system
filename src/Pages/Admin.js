import React from "react";
import UserpageUser from "../Components/UserpageUser";
import { Grid } from "@mui/material";
import AdminpageAdmin from "../Components/AdminpageAdmin";

export default function Admin() {
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
        <Grid item xs={6}>
          <UserpageUser />
        </Grid>
        <div className="Line"></div>
        <Grid item xs={6}>
          <AdminpageAdmin />
        </Grid>
      </Grid>
    </div>
  );
}
