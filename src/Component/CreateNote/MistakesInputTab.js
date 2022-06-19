import { Grid, Typography } from "@mui/material";
import React from "react";
import { useStyleGenerator } from "theme";
import MultilineInputs from "./MultilineInputs";

const styles = (theme) => ({
  dnMistakesInput: {
    marginTop: theme.spacing(2),
    "&>span": {
      "&>span": {
        color: theme.palette.error.light,
      },
    },
  },
});

export default function MistakesInputTab() {
  const classes = useStyleGenerator(styles);

  return (
    <Grid className={classes.dnMistakesInput}>
      <Typography component="span" variant="h5">
        Write your
        <Typography
          color="success"
          component="span"
          variant="h5"
          fontWeight="bold"
        >
          {" Mistakes..."}
        </Typography>
      </Typography>
      <MultilineInputs placeholders="What's your mistakes of the day." />
    </Grid>
  );
}
