import React, { useEffect, useState } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as SaveIcon } from "assets/SaveIcon.svg";
import { useStyleGenerator } from "theme";
import StoryTab from "Component/CreateNote/StoryTab";
import { writeStoryApi } from "Api/SheetApi";
import { theNoteTable } from "model/Sheet.model";
import { useApiCall, useSheetApi } from "Utils/Hooks";
import { useNotification } from "Component/Common/NotificationManager";
import useStore from "store";
import useKeyboardShortcut from "use-keyboard-shortcut";

const styles = (theme) => ({
  dnCreateFabIcon: {
    position: "absolute !important",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
});

export default function CreateNote() {
  const classes = useStyleGenerator(styles);
  const sheetId = useStore((state) => state.sheetId);
  const params = useParams();
  const navigator = useNavigate();

  const { success } = useNotification();
  const [tabIndex, setTabIndex] = useState(0);
  const [state, setState] = useState({});

  const { addRecordAPI, getByIdAPI, updateRecordApi } = useSheetApi({
    sheetId: sheetId,
    columns: theNoteTable,
  });

  const {
    data: editRecord,
    loading: editLoading,
    callApi: getSingleRecordApi,
  } = useApiCall(getByIdAPI);

  const {
    data: createData,
    loading: addRecordLoading,
    callApi: addRecordAction,
    progress,
  } = useApiCall(addRecordAPI);

  const {
    loading: updateLoading,
    callApi: updateRecordAction,
    progress: updateProgress,
  } = useApiCall(updateRecordApi);

  useEffect(() => {
    if (editRecord) {
      setState({
        story: editRecord.story,
        learning: JSON.parse(editRecord.learning),
        mistakes: JSON.parse(editRecord.mistakes),
      });
    }
  }, [editRecord]);

  let loading = addRecordLoading || updateLoading;

  useEffect(() => {
    if (params.id) {
      getSingleRecordApi(params.id);
    }
  }, []);

  const handleTabChange = (e, newIndex) => {
    setTabIndex(newIndex);
  };

  useEffect(() => {
    if (progress === "done") {
      success("Note Created Successfully.");
      navigator("/home");
    }
  }, [progress]);

  useEffect(() => {
    if (updateProgress === "done") {
      success("Note Updated Successfully.");
      navigator("/home");
    }
  }, [updateProgress]);

  const addMetaInfo = (params) => {
    let validRows = (createData = {}) => {
      return Object.values(createData).filter((value) => value.value).length;
    };

    return {
      created_at: moment(new Date()).format("DD/MM/YYYY HH:MM:SS"),
      story: params.story,
      learning: JSON.stringify(params?.learning || []),
      total_learning: validRows(params?.learning),
      mistakes: JSON.stringify(params?.mistakes || []),
      total_mistakes: validRows(params?.mistakes),
      time_stamp: moment(new Date()).format("x"),
      updated_at: params.updated_at || null,
    };
  };

  const handleCreateNote = () => {
    if (params.id) {
      let apiParams = {
        story: state.story,
        learning: state.learning,
        mistakes: state.mistakes,
        updated_at: moment(new Date()).format("DD/MM/YYYY HH:MM:SS"),
      };
      apiParams = addMetaInfo(apiParams);
      updateRecordAction(params.id, apiParams);
    } else {
      let params = {
        story: state.story,
        learning: state.learning,
        mistakes: state.mistakes,
      };
      params = addMetaInfo(params);
      addRecordAction(params);
    }
  };

  const handleChange = (key) => (value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  useKeyboardShortcut(["Shift", "S"], handleCreateNote, {
    overrideSystem: true,
    ignoreInputFields: false,
    repeatOnHold: false,
  });

  return editLoading ? (
    "loading"
  ) : (
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
        <LearningInputTab
          value={state.learning}
          state={state}
          handleChange={handleChange}
        />
      ) : (
        <MistakesInputTab
          value={state.mistakes}
          state={state}
          handleChange={handleChange}
        />
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
