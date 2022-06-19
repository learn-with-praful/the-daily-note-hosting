import React, { useState } from "react";
import {
  Container,
  Fab,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import AppHeader from "Component/Common/AppHeader";
import { ReactComponent as BackIcon } from "assets/BackIcon.svg";
import { IconGenerator } from "Component/Common";
import moment from "moment";
import LearningInputTab from "Component/CreateNote/LearningInputTab";
import MistakesInputTab from "Component/CreateNote/MistakesInputTab";
import { Link } from "react-router-dom";
import { ReactComponent as SaveIcon } from "assets/SaveIcon.svg";
import { useStyleGenerator } from "theme";

const styles = (theme) => ({
  dnStoryInput: {
    marginTop: theme.spacing(2),
    "& textarea": {
      height: "calc(100vh - 190px) !important",
    },
  },
  dnCreateFabIcon: {
    position: "absolute !important",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
});

export default function CreateNote() {
  const classes = useStyleGenerator(styles);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (e, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleCreateNote = () => {
    console.log("testing");
  };

  return (
    <Container sx={{ pt: 1 }}>
      <AppHeader>
        <Link to="/home">
          <Fab icon size="small">
            <IconGenerator icon={BackIcon} />
          </Fab>
        </Link>
        <Typography fontWeight="bold">
          {moment(new Date()).format("DD MMM yy")}
        </Typography>
      </AppHeader>
      <Grid margin="auto" width="fit-content">
        <Tabs box={true} value={tabIndex} onChange={handleTabChange}>
          <Tab label={`📚${tabIndex === 0 ? " Story" : ""}`} />
          <Tab label={`👍${tabIndex === 1 ? " Learning" : ""}`} />
          <Tab label={`👎${tabIndex === 2 ? " Mistakes" : ""}`} />
        </Tabs>
      </Grid>
      {tabIndex === 0 ? (
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
            fullWidth
            noBg
            placeholder="Write your story..."
            multiline
            rows={10}
          />
        </Grid>
      ) : tabIndex === 1 ? (
        <LearningInputTab />
      ) : (
        <MistakesInputTab />
      )}
      <Zoom in={true} className={classes.dnCreateFabIcon} unmountOnExit>
        <Fab color="black" onClick={handleCreateNote}>
          <IconGenerator icon={SaveIcon} color="primary" />
        </Fab>
      </Zoom>
    </Container>
  );
}
