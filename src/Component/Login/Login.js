import React from "react";
import { Grid, Typography } from "@mui/material";
import { Button } from "Component/Common";
import { ReactComponent as LoginIcon } from "assets/login.svg";
import { ReactComponent as GoogleIcon } from "assets/GoogleIcon.svg";
import { generateStyle } from "Utils/Utils";

const styles = (theme) => ({
  dmLoginRoot: {
    padding: 10,
    marginTop: "10vh",
    height: "80vh",
    display: "flex",
    flexDirection: "column !important",
    justifyContent: "space-between",
    textAlign: "center",
    "&>svg": {
      margin: "auto",
    },
  },
  dnTopHeader: {
    "&>h5": {
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
    "&>h6": {
      marginTop: 5,
      color: theme.palette.grey[400],
      maxWidth: 300,
      margin: "auto",
    },
  },
  dnActionButtons: {
    "&>p": {
      color: theme.palette.grey[400],
      marginTop: 10,
      maxWidth: 300,
      margin: "auto",
    },
  },
});

export default function Login() {
  const loginWithGoogle = () => {};
  const classes = generateStyle(styles);

  const singOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    console.log("auth2", auth2);
    auth2.signOut().then(function () {
      console.log("User signed out.");
    });
  };

  return (
    <Grid className={classes.dmLoginRoot}>
      <Grid className={classes.dnTopHeader}>
        <Typography variant="h5">Welcome, to The Daily Note</Typography>
        <Typography variant="subtitle1">
          Help you to take daily note to make your life better.
        </Typography>
      </Grid>
      <LoginIcon />
      <Grid className={classes.dnActionButtons}>
        <Button
          onClick={loginWithGoogle}
          startIcon={<GoogleIcon width="20" height="20" />}
          variant="outlined"
          size="large"
        >
          Login With Google
        </Button>
        <Typography variant="body2">
          Don’t worry about data. your data is safe with security of google.
        </Typography>
      </Grid>
    </Grid>
  );
}
