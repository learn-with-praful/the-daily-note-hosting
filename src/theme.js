import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DE496E",
    },
  },
  typography: {
    fontFamily: `'Poppins', "sans-serif"`,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "unset",
        },
      },
    },
  },
});

console.log("theme", theme);

export default theme;
