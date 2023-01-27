import React, { useState } from "react";
import {
  Typography,
  FormControl,
  TextField,
  Stack,
  Button,
  InputLabel,
  Input,
  IconButton,
  InputAdornment,
  Box,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Cookies from "universal-cookie";
// require('dotenv').config()
const cookies = new Cookies();
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [logged, setLogged] = useState(0);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const configuration = {
    method: "post",
    url: `${process.env.REACT_APP_API}/api/login`,
    data: {
      username: username,
      password: password,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios(configuration)
      .then((result) => {
        cookies.set("accessToken", result.data.accessToken, {
          path: "/",
        });
        window.location.href = "/";
        // console.log(result)
      })
      .catch((error) => {
        setLogged(1);
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        {logged === 1 ? (
          <Alert severity="error">Unable to find User/email</Alert>
        ) : (
          <></>
        )}
        <Stack
          direction="row"
          spacing={2}
          padding={5}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box
              sx={{ display: "flex", flexDirection: "column" }}
              style={{
                padding: "50px",
                backgroundColor: "aliceblue",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h2" style={{ fontWeight: "bolder" }}>
                LogIn
              </Typography>
              <TextField
                required
                id="username"
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />

              <FormControl sx={{ width: "84%" }}>
                <InputLabel htmlFor="standard-adornment-password">
                  Password *
                </InputLabel>
                <Input
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <br />
              <Button variant="contained" type="submit">
                LogIn
              </Button>
              <br />
              <Typography variant="h8" style={{ fontWeight: "bolder" }}>
                Don't Have a Account
              </Typography>
              <br />
              <Button
                variant="contained"
                onClick={() => (window.location.href = "/register")}
              >
                Register
              </Button>
            </Box>
          </form>
        </Stack>
      </div>
    </div>
  );
};

export default Login;
