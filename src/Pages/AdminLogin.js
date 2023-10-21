import React, { useState } from "react";
import Box from "@mui/material/Box";
import "../Pages/AdminLogin.css";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");


  return (
    <div className="Maindiv">
      <Box className="Box2">
        <AccountCircleIcon style={{ height: 55, width: 55 }} />
        <h2 className="Header">Admin Login</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 25,
          }}
        >
          <TextField
            fullWidth
            label="Standard"
            variant="standard"
            onChange={(e) => setAdminName(e.target.value)}
          />
          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              onChange={(e) => setAdminPassword(e.target.value)}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <button
            className="button2"
            onClick={() =>
              adminName === "Jishnu" && adminPassword === "123456789"
                ? navigate("/admin")
                : ""
            }
          >
            Login
          </button>
        </div>
      </Box>
    </div>
  );
}
