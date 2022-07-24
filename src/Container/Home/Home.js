import {
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Zoom,
  Fab,
} from "@mui/material";
import React, { useContext, useMemo } from "react";
import { ReactComponent as SearchIcon } from "assets/SearchIcon.svg";
import { ReactComponent as PlusIcon } from "assets/PlusIcon.svg";
import { IconGenerator } from "Component/Common";
import clsx from "clsx";
import AppHeader from "Component/Common/AppHeader";
import { Link } from "react-router-dom";
import { RootContext } from "Context/TheNoteContext";
import { useStyleGenerator } from "theme";
import { dayGreeting, pastDateGenerator } from "Utils/Utils";
import StoryContainer from "./StoryContainer";

const styles = (theme) => ({
  dnHomeRoot: {
    position: "relative",
    minHeight: "100vh",
  },
  dnGreetingMsg: {
    "&>h6": {
      fontWeight: "bold",
      lineHeight: "24px",
      "&:first-child": {
        color: theme.palette.primary.main,
      },
    },
  },
  dnDateContainer: {
    margin: `${theme.spacing(2)} 0px`,
    display: "flex",
    justifyContent: "flex-start",
    "&>div": {
      marginRight: theme.spacing(1),
    },
    "& .selected": {
      background: theme.palette.primary.superLight,
    },
  },
  dnDateBox: {
    cursor: "pointer",
    textAlign: "center",
    width: 50,
    borderRadius: theme.spacing(2),
    padding: "10px 0px",
    color: theme.palette.primary.main,
    "&>p": {
      lineHeight: "20px",
    },
    "&>div": {
      background: theme.palette.primary.main,
      width: 5,
      height: 5,
      borderRadius: "50%",
      margin: "auto",
      marginTop: 5,
    },
  },
  dnCreateFabIcon: {
    position: "absolute !important",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
});

export default function Home() {
  const classes = useStyleGenerator(styles);
  const { userDetail, updateState, count } = useContext(RootContext);

  const dateBoxCount = useMemo(
    () => Math.min(20, Math.round(window.innerWidth / 60)),
    [window.innerWidth]
  );

  const [state, setState] = React.useState(0);

  return (
    <Container sx={{ pt: 1 }} className={classes.dnHomeRoot}>
      <button
        onClick={() => {
          updateState({
            count: count || 1 + 1,
          });
        }}
      >
        {count}
        Button
      </button>

      <AppHeader>
        <Grid className={classes.dnGreetingMsg}>
          <Typography variant="h6">{dayGreeting()},</Typography>
          <Typography variant="h6">
            {userDetail?.profileObj?.familyName || ""}
          </Typography>
        </Grid>
      </AppHeader>
      <Grid>
        <TextField
          margin="dense"
          fullWidth
          size="small"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconGenerator icon={SearchIcon} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid className={classes.dnDateContainer}>
        {pastDateGenerator(dateBoxCount).map((j, i) => (
          <Grid
            className={clsx(classes.dnDateBox, {
              ["selected"]: dateBoxCount - 2 === i,
            })}
            key={i}
          >
            <Typography>{j.date()}</Typography>
            <Typography variant="body2">{j.format("ddd")}</Typography>
            <div></div>
          </Grid>
        ))}
      </Grid>
      <Grid>
        <StoryContainer />
      </Grid>
      <Zoom in={true} className={classes.dnCreateFabIcon} unmountOnExit>
        <Link to="/create">
          <Fab>
            <IconGenerator icon={PlusIcon} />
          </Fab>
        </Link>
      </Zoom>
    </Container>
  );
}
