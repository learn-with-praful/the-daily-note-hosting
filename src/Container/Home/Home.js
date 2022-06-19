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
import { pastDateGenerator } from "Utils/Utils";

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
  dnNoteCard: {
    display: "flex",
    "& .grey": {
      color: theme.palette.grey[500],
    },
    "&>div": {
      "&:first-child": {
        width: 120,
        textAlign: "center",
        "&>p": {
          color: theme.palette.grey[500],
          fontWeight: "bold",
        },
        "&>h5": {
          fontWeight: "bold",
        },
      },
      "&:nth-child(2)": {
        background: theme.palette.primary.superLight,
        width: "100%",
        borderRadius: theme.shape.borderRadius * 2,
        padding: theme.spacing(2),
        "&>p": {
          fontWeight: "bold",
        },
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
  const { userDetail } = useContext(RootContext);

  const dateBoxCount = useMemo(
    () => Math.min(20, Math.round(window.innerWidth / 60)),
    [window.innerWidth]
  );

  return (
    <Container sx={{ pt: 1 }} className={classes.dnHomeRoot}>
      <AppHeader>
        <Grid className={classes.dnGreetingMsg}>
          <Typography variant="h6">Good Morning,</Typography>
          {
            // TODO: work for this
            // <Typography variant="h6">Good Evening,</Typography>
            // <Typography variant="h6">Good Afternoon,</Typography>
          }
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
        {Array.from(new Array(3)).map((j, i) => (
          <Grid className={classes.dnNoteCard} mb={2} key={i}>
            <Grid>
              <Typography>Dec, 2019</Typography>
              <Typography variant="h5"> 21</Typography>
            </Grid>
            <Grid>
              <Typography>
                Your story goes here. and can be use this second line as well.
                and also may required to use this third like or other lime
                alos....
              </Typography>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="space-between"
                mt={1}
              >
                <Typography className="grey">01:30pm sun</Typography>
                <Stack spacing={1} direction="row">
                  <Typography>👍5</Typography>
                  <Typography>👎1</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        ))}
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
