import React, { useCallback } from "react";
import { motion } from "framer-motion";
import StoryCard from "./StoryCard";
import { useStyleGenerator } from "theme";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { ReactComponent as CrossIcon } from "assets/CrossIcon.svg";
import { IconGenerator } from "Component/Common";
import moment from "moment";

const styles = (theme) => ({
  dmCrossIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  dnStoryInfoModel: {
    top: 0,
    left: 0,
    right: 0,
    position: "fixed",
    zIndex: 1,
    overflow: "hidden",
    margin: 20,
  },
  dnMainBody: {
    padding: "20px 10px 10px 10px",
    borderRadius: 20,
    background: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    marginBottom: 10,
  },
  dnTimeInfo: {
    display: "flex",
    justifyContent: "flex-end",
    "&>p": {
      color: theme.palette.grey[500],
    },
  },
  dnMetaInfo: {
    width: "fit-content",
    "&>p": {
      fontWeight: "bold",
    },
    "&>h5": {
      fontWeight: "bold",
    },
  },
  dnStoryContainer: {
    maxHeight: "calc(100vh - 320px)",
    overflow: "auto",
    "&>h5": {
      fontWeight: "bold",
    },
    "&>p": {
      wordBreak: "break-all",
    },
  },
  dnActionButtonContainer: {
    display: "flex",
    flexDirection: "column !important",
    "&>button": {
      marginBottom: 6,
      "&:last-child": {
        background: theme.palette.background.default,
      },
    },
  },
});

export default function StoryCardOpen({ id, row }) {
  const classes = useStyleGenerator(styles);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    navigate(`/home`, { replace: true });
  }, [navigate]);

  const handleEdit = () => {
    navigate(`/edit/${row.id}`);
  };

  return (
    <
      // layoutId={`card-container-${id}`}
    >
      {
        // <motion.div
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   exit={{ opacity: 0, transition: { duration: 0.15 } }}
        //   transition={{ duration: 0.2, delay: 0.15 }}
        //   style={{
        //     pointerEvents: "auto",
        //     background: "red",
        //   }}
        //   className="overlay"
        // >
        //   <Link to="/home" />
        // </motion.div>
      }
      <Grid className={classes.dnStoryInfoModel}>
        <motion.div
          layoutId={`card-container-${row.time_stamp}`}
          className={classes.dnMainBody}
          // style={{
          //   position: "absolute",
          //   top: 10,
          //   left: 10,
          //   background: "red",
          // }}
        >
          <Grid className={classes.dmCrossIcon} onClick={handleClose}>
            <IconButton onClick={handleClose}>
              <IconGenerator icon={CrossIcon} />
            </IconButton>
          </Grid>
          <motion.div
            className={classes.dnMetaInfo}
            layoutId={`story-time-${row.time_stamp}`}
          >
            <Typography>
              {moment(parseInt(row.time_stamp)).format("MMM, YYYY")}
            </Typography>
            <Typography variant="h5">
              {" "}
              {moment(parseInt(row.time_stamp)).format("D")}
            </Typography>
          </motion.div>
          <Grid className={classes.dnStoryContainer}>
            <Typography variant="h5">Story</Typography>
            <motion.p layoutId={`story-body-${row.time_stamp}`}>
              {row.story}
            </motion.p>
          </Grid>
          <div className={classes.dnTimeInfo}>
            <Typography>
              {moment(parseInt(row.time_stamp)).format("HH:MMa ddd")}
            </Typography>
          </div>
          {
            // <StoryCard row={row} />
          }
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            type: "bounce ",
            stiffness: 260,
            damping: 20,
          }}
          className={classes.dnActionButtonContainer}
        >
          <Button fullWidth size="large" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleClose}
          >
            Close
          </Button>
        </motion.div>
      </Grid>
    </>
  );
}
