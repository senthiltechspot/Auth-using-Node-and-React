import React from "react";
import Logout from "../Components/Logout";
import Cards from "../Components/Cards.js";

import { Box, AppBar, Toolbar, Typography } from "@mui/material";
const Protected = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              sx={{ minWidth: 100 }}
              onClick={() => (window.location.href = "/")}
            >
              Home
            </Typography>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Protected Content
            </Typography>
            <Logout />
          </Toolbar>
        </AppBar>
      </Box>
      <br />
      <Cards />
    </div>
  );
};

export default Protected;
