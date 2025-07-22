import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: blue[600],
            dark: blue[700],
            light: blue[500],
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#f50057",
            dark: "#ab003c",
            light: "#ff4081",
            contrastText: "#ffffff"
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff"
        },
    }
})