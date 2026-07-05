
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    

    primary: {
      main: "#004ac6", 
      contrastText: "#ffffff", 
    },

    secondary: {
      main: "#006c49", 
      contrastText: "#ffffff", 
    },
    error: {
      main: "#ba1a1a", 
      contrastText: "#ffffff", 
    },

    background: {
      default: "#f8f9fa", 
      paper: "#ffffff", 
    },

  
    text: {
      primary: "#191c1d",
      secondary: "#434655",
    },

       
    divider: "#c3c6d7",

 
  },
  typography: {
        fontFamily: "'Inter', sans-serif",
    h1: {
        fontSize: "36px",
        fontWeight: 700,
        lineHeight: 1.22,
        letterSpacing: "-0.02em"
    },
    body1: {
        fontSize: "16px",
        fontWeight: 400
    }
}
});


