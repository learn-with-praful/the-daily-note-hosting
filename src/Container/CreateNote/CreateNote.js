import React, { useContext, useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Fab,
  Grid,
  Tab,
  Tabs,
  Typography,
  Zoom,
} from "@mui/material";
import AppHeader from "Component/Common/AppHeader";
import { ReactComponent as BackIcon } from "assets/BackIcon.svg";
import { IconGenerator } from "Component/Common";
import moment from "moment";
import LearningInputTab from "Component/CreateNote/LearningInputTab";
import MistakesInputTab from "Component/CreateNote/MistakesInputTab";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as SaveIcon } from "assets/SaveIcon.svg";
import { useStyleGenerator } from "theme";
import StoryTab from "Component/CreateNote/StoryTab";
import { writeStoryApi } from "Api/SheetApi";
import { RootContext } from "Context/TheNoteContext";
import { theNoteTable } from "model/Sheet.model";
import { useApiCall, useSheetApi } from "Utils/Hooks";
import { useNotification } from "Component/Common/NotificationManager";

const styles = (theme) => ({
  dnCreateFabIcon: {
    position: "absolute !important",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
});

export default function CreateNote() {
  const classes = useStyleGenerator(styles);
  const { sheetId } = useContext(RootContext);
  const navigator = useNavigate();

  const { success } = useNotification();

  const [tabIndex, setTabIndex] = useState(0);
  const [state, setState] = useState({});

  const handleTabChange = (e, newIndex) => {
    setTabIndex(newIndex);
  };
  const { addRecordAPI } = useSheetApi({
    sheetId: sheetId,
    columns: theNoteTable,
  });
  const { data, loading, callApi, progress } = useApiCall(addRecordAPI);

  useEffect(() => {
    if (progress === "done") {
      console.log("progress", progress);
      success("Note Created Successfully.");
      navigator("/home");
    }
  }, [progress]);

  const addMetaInfo = (params) => {
    let validRows = (data = {}) => {
      return Object.values(data).filter((value) => value.value).length;
    };

    return {
      created_at: moment(new Date()).format("DD/MM/YYYY HH:MM:SS"),
      story: params.story,
      learning: JSON.stringify(params?.learning || []),
      total_learning: validRows(params?.learning),
      mistakes: JSON.stringify(params?.mistakes || []),
      total_mistakes: validRows(params?.mistakes),
      time_stamp: moment(new Date()).format("x"),
      updated_at: null,
    };
  };

  const handleCreateNote = () => {
    console.log("Create note");
    let params = {
      story: state.story,
      learning: state.learning,
      mistakes: state.mistakes,
    };
    params = addMetaInfo(params);
    callApi(params);
    // callApi(sheetId, {
    //   date: new Date(),
    //   story: state.story,
    //   learning: state.learning,
    //   mistakes: state.mistakes,
    // });
    // writeStoryApi(sheetId, {
    //   date: new Date(),
    //   story: state.story,
    //   learning: state.learning,
    //   mistakes: state.mistakes,
    // });
  };

  const handleChange = (key) => (value) => {
    setState({
      ...state,
      [key]: value,
    });
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
        <StoryTab state={state} handleChange={handleChange} />
      ) : tabIndex === 1 ? (
        <LearningInputTab state={state} handleChange={handleChange} />
      ) : (
        <MistakesInputTab state={state} handleChange={handleChange} />
      )}
      <Zoom in={true} className={classes.dnCreateFabIcon} unmountOnExit>
        <Fab color="black" onClick={handleCreateNote}>
          {loading ? (
            <CircularProgress />
          ) : (
            <IconGenerator icon={SaveIcon} color="primary" />
          )}
        </Fab>
      </Zoom>
    </Container>
  );
}
