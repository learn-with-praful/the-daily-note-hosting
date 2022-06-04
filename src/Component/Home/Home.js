import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { generateStyle } from "Utils/Utils";

const styles = (theme) => ({
  dmHeaderRoot: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  dmGreetingMsg: {
    "&>h6": {
      fontWeight: "bold",
      lineHeight: "26px",
      "&:first-child": {
        color: theme.palette.primary.main,
      },
    },
  },
  dmUserProfile: {
    position: "relative",
    padding: 2,
    boxSizing: "border-box",
    background: "white",
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
    },

    // "&::after": {
    //   content: '""',
    //   display: "block",
    //   width: 44,
    //   height: 44,
    //   border: "2px solid",
    //   borderImageSource:
    //     "linear-gradient(131.9deg, #1292F6 5.89%, #FD6F93 71.67%)",
    //   position: "absolute",
    //   top: "-4px",
    //   left: "-4px",
    //   borderRadius: 10,
    // },
  },
});

export default function Home() {
  const classes = generateStyle(styles);
  return (
    <Container>
      <Grid className={classes.dmHeaderRoot}>
        {console.log("process.env", process.env)}

        <Grid className={classes.dmGreetingMsg}>
          <Typography variant="h6">Good Morning,</Typography>
          <Typography variant="h6">Praful</Typography>
        </Grid>
        <Grid className={classes.dmUserProfile}>
          <img
            src="https://cdn5.vectorstock.com/i/1000x1000/89/79/funny-avatar-cunning-emoji-flat-vector-27638979.jpg"
            alt="profile"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
