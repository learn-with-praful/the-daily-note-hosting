import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useStyleGenerator } from "theme";
import MultilineInputs from "./MultilineInputs";

const styles = (theme) => ({
  dnLearningInput: {
    marginTop: theme.spacing(2),
    "&>span": {
      "&>span": {
        color: theme.palette.success.light,
      },
    },
  },
});

export default function LearningInputTab() {
  const classes = useStyleGenerator(styles);

  return (
    <Grid className={classes.dnLearningInput}>
      <Typography component="span" variant="h5">
        Write your
        <Typography
          color="success"
          component="span"
          variant="h5"
          fontWeight="bold"
        >
          {" Learning..."}
        </Typography>
      </Typography>
      <MultilineInputs />
    </Grid>
  );
}
