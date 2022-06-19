import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { RootContext } from "Context/TheNoteContext";
import React, { useContext } from "react";
import { ReactComponent as LogoutIcon } from "assets/LogoutIcon.svg";
import { ReactComponent as DarkModeIcon } from "assets/DarkModeIcon.svg";
import IconGenerator from "./IconGenerator";
import { useNavigate } from "react-router";
import { useStorage } from "Utils/Hooks";
import { useStyleGenerator } from "theme";

const styles = (theme) => ({
  dnAppHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dnUserProfile: {
    position: "relative",
    padding: 2,
    boxSizing: "border-box",
    background: theme.palette.background.default,
    backgroundClip: "padding-box",
    border: "2px solid transparent",
    borderRadius: 10,
    height: 48,
    "&>img": {
      width: 40,
      height: 40,
      objectFit: "cover",
      borderRadius: "8px",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: "-1",
      margin: "-3px",
      borderRadius: "inherit",
      background: "linear-gradient(to right, red, orange)",
      // background: "linear-gradient(131.9deg, #1292F6 5.89%, #FD6F93 71.67%)",
    },
  },
});

export default function AppHeader(props) {
  const { children } = props;
  const classes = useStyleGenerator(styles);
  const navigator = useNavigate();

  const { userDetail, toggleDarkMode } = useContext(RootContext);
  const data = useContext(RootContext) || {};

  const handleLogout = () => {
    window?.gapi?.auth2?.getAuthInstance()?.signOut();
    data.resetState();
    navigator("/login");
  };

  const [darkMode, setDarkMode] = useStorage("darkMode", false);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    toggleDarkMode();
  };

  return (
    <Grid className={classes.dnAppHeader}>
      {children}
      <Grid className={classes.dnUserProfile}>
        <Tooltip
          placeholder="bottom-end"
          title={
            <List sx={{ minWidth: 200 }}>
              <ListItem>
                <ListItemIcon>
                  <IconGenerator icon={DarkModeIcon} />
                </ListItemIcon>
                <ListItemText primary="Dark Mode" />
                <Switch
                  edge="end"
                  onChange={handleDarkMode}
                  checked={darkMode}
                />
              </ListItem>
              <ListItem onClick={handleLogout}>
                <ListItemIcon>
                  <IconGenerator icon={LogoutIcon} />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItem>
            </List>
          }
        >
          <img src={userDetail?.profileObj?.imageUrl} alt="profile" />
        </Tooltip>
      </Grid>
    </Grid>
  );
}
