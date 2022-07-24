import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useStyleGenerator } from "theme";

const styles = (theme) => ({
  dnStoryInput: {
    marginTop: theme.spacing(2),
    "& textarea": {
      height: "calc(100vh - 190px) !important",
    },
  },
});

export default function StoryTab(props) {
  const { state, handleChange } = props;
  const classes = useStyleGenerator(styles);

  return (
    <Grid className={classes.dnStoryInput}>
      <Typography component="span" variant="h5">
        Write your
        <Typography
          color="primary"
          component="span"
          variant="h5"
          fontWeight="bold"
        >
          {" story..."}
        </Typography>
      </Typography>
      <TextField
        autoFocus
        fullWidth
        noBg
        placeholder="Write your story..."
        multiline
        rows={10}
        value={state.story}
        onChange={(e) => handleChange("story")(e.target.value)}
      />
    </Grid>
  );
}
