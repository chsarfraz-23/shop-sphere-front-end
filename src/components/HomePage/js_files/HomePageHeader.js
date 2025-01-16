import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "grey",
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            letterSpacing: 2,
          }}
        >
          Chachu Super Store !!!
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
