import React from "react";
import Box from "@mui/material/Box";
import "../Pages/Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="CommonCentering">
      <Box className="Box">
        <div className="Buttons">
          <button
            className="c-button c-button--gooey"
            onClick={() => navigate("/adminlogin")}
          >
            {" "}
            Admin
            <div className="c-button__blobs">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
          <button
            className="c-button c-button--gooey"
            onClick={() => navigate("/users")}
          >
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
