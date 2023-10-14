import React from "react";
import Box from "@mui/material/Box";
import "../Pages/Login.css";

export default function Login() {
  return (
    <div className="CommonCentering">
      <Box
        className="Box"
        sx={{
          width: 300,
          height: 300,
          backgroundColor: "transparent",
        }}
      >
        <div className="Buttons">
          <button className="c-button c-button--gooey">
            {" "}
            Admin
            <div className="c-button__blobs">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
          <button className="c-button c-button--gooey">
            {" "}
            User
            <div className="c-button__blobs">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
        </div>
      </Box>
    </div>
  );
}
