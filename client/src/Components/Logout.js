import React from "react";
import { Button } from "@mui/material";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
// const cookieParser = require("cookie-parser");
// import cookieParser from "cookie-parser";

const Logout = () => {
  function handlelougut() {
    const configuration = {
      method: "post",
      url: `${process.env.REACT_APP_API}/api/logout`,
    };
    axios(configuration);
    cookies.remove("accessToken", { path: "/" });
    window.location.href = "/";
  }
  return (
    <div>
      <Button color="warning" variant="contained" size="large" onClick={() => handlelougut()}>Logout</Button>
    </div>
  );
};

export default Logout;
