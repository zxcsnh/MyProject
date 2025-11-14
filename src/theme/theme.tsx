"use client";
import { blue, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette:{
        primary: blue,
        secondary: yellow,
        // mode: 'dark'
    }
});

export default theme;
