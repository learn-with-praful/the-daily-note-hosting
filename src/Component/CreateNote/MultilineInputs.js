import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useStyleGenerator } from "theme";

const styles = (theme) => ({
  dnLearningInput: {
    marginTop: theme.spacing(2),
    "&>span": {
      "&>span": {
        color: theme.palette.success.light,
      },
    },
  },
  dnInputContainer: {
    background: theme.palette.primaryLight.main,
    height: "calc(100vh - 170px) !important",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    overflow: "auto",
  },
  dnInputRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(1),
    "&>p": {
      marginRight: theme.spacing(2),
      fontWeight: "bold",
    },
  },
});

export default function MultilineInputs(props) {
  const { placeholders = "What you learn today." } = props;
  const classes = useStyleGenerator(styles);

  const [rows, setRows] = useState({ 0: { value: "" } });

  const handleInputChange = (index) => (e) => {
    setRows((prev) => {
      prev[index].value = e.target.value;
      if (!prev[index + 1]) {
        prev[index + 1] = { value: "" };
      }
      return { ...prev };
    });
  };

  return (
    <Grid className={classes.dnInputContainer}>
      {Object.values(rows || {}).map((row, index) => (
        <Grid className={classes.dnInputRow}>
          <Typography>{index + 1}.</Typography>
          <TextField
            key={index}
            fullWidth
            noBg
            placeholder={placeholders}
            value={row.value}
            onChange={handleInputChange(index)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
