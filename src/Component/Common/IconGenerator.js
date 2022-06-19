import { useTheme } from "@mui/material";
import React from "react";

export default function IconGenerator(props) {
  const { icon, color = "primary", width, height, small, className } = props;
  const theme = useTheme();

  let size = {
    small: {
      width: 20,
      height: 20,
    },
  };

  let colors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    red: theme.palette.error.main,
    warning: theme.palette.warning.main,
    success: theme.palette.success.main,
  };
  Object.keys(theme?.palette?.grey || {}).map((key) => {
    colors["grey" + key] = theme?.palette?.grey[key];
  });

  return React.createElement(icon, {
    ...(small && { width: size.small.width, height: size.small.height }),
    ...(width && { width }),
    ...(height && { height }),
    fill: colors[color],
    className: className,
  });
}
