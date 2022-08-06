import { createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useStore from "store";

let palette = {
  primary: {
    main: "#DE496E",
    superLight: "#DE496E18",
  },
  secondary: {
    main: "#ff0000",
  },
  primaryLight: {
    main: "#ffd1dc",
  },
  black: {
    main: "#000",
  },
};
let borderRadius = 4;

const theme = {
  palette: palette,
  typography: {
    fontFamily: `'Poppins', "sans-serif"`,
  },
  shape: {
    borderRadius: borderRadius,
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          color: "black",
          background: "white",
          boxShadow: "0px 1px 7px 0px rgb(0 0 0 / 15%)",
          borderRadius: 10,
        },
        arrow: {
          color: "white",
        },
      },
    },
    MuiFab: {
      defaultProps: {
        color: "primaryLight",
        size: "medium",
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: borderRadius,
          boxShadow: "unset",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        nooutline: true,
      },
      variants: [
        {
          props: { nooutline: true, variant: "outlined" },
          style: {
            background: palette.primary.superLight,
            borderRadius: borderRadius,
            "& input::placeholder": {
              color: palette.primary.main,
            },
            "& fieldset": {
              border: "unset",
            },
          },
        },
        {
          props: { noBg: true },
          style: {
            // background: "transparent",
          },
        },
      ],
    },
    MuiCircularProgress: {
      defaultProps: {
        size: "26px",
        thickness: 5,
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 32,
          height: 20,
          padding: 0,
          "& .MuiSwitch-switchBase": {
            "&.Mui-checked": {
              transform: "translateX(11px)",
              color: "#fff",
            },
          },
        },
        switchBase: {
          height: 20,
          width: 20,
          padding: 0,
          color: "#fff",
          "&.Mui-checked + .MuiSwitch-track": {
            opacity: 1,
          },
        },
        track: {
          opacity: 1,
          borderRadius: 32,
          backgroundColor: "#BFC7CF",
        },
        thumb: {
          flexShrink: 0,
          width: "14px",
          height: "14px",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "unset",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingRight: 20,
          paddingLeft: 10,
          margin: "1px 0px",
          "&:hover": {
            background: palette.primary.main + "25",
            borderRadius: 10,
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 36,
        },
      },
    },
    MuiTabs: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      variants: [
        {
          props: {
            box: true,
          },
          style: {
            minHeight: 40,
            "&>div": {
              "&>div": {
                borderRadius: borderRadius,
              },
            },
            "& .MuiTabs-indicator": {
              background: "white",
              height: 40,
              borderRadius: borderRadius,
              top: 3,
            },
            "& .MuiTabs-flexContainer": {
              padding: "2px 3px",
              background: palette.primaryLight.main,
              width: "fit-content",
              "&>button": {
                minHeight: 34,
                zIndex: 1,
                minWidth: "fit-content",
              },
            },
          },
        },
      ],
    },
  },
};

export default theme;

export const generateTheme = (mode = "light") => {
  if (mode) {
    theme.palette.mode = mode === "dark" ? "dark" : "light";
  }
  return createTheme(theme);
};

export const useStyleGenerator = (styleObj, styleParams = {}) => {
  const theme = useStore((state) => state.theme);
  return makeStyles(() => styleObj(theme))(styleParams);
};
