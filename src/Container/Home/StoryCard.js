import { Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useCallback } from "react";
import { useStyleGenerator } from "theme";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const styles = (theme) => ({
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
          wordBreak: "break-all",
        },
      },
    },
  },
  dnStory: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
});

export default function StoryCard(props) {
  const { row } = props;
  const classes = useStyleGenerator(styles);
  const navigate = useNavigate();

  const handleView = useCallback(
    (id) => {
      navigate(`/home/${id}`, { replace: true });
    },
    [navigate]
  );

  return (
    <Grid className={classes.dnNoteCard} mb={2}>
      <motion.div layoutId={`story-time-${row.time_stamp}`}>
        <Typography>
          {moment(parseInt(row.time_stamp)).format("MMM, YYYY")}
        </Typography>
        <Typography variant="h5">
          {" "}
          {moment(parseInt(row.time_stamp)).format("D")}
        </Typography>
      </motion.div>
      <Grid
        onClick={() => {
          handleView(row.id);
        }}
      >
        <motion.p
          className={classes.dnStory}
          layoutId={`story-body-${row.time_stamp}`}
        >
          {row.story}
        </motion.p>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-between"
          mt={1}
        >
          <Typography className="grey">
            {moment(parseInt(row.time_stamp)).format("HH:MMa ddd")}
          </Typography>
          <Stack spacing={1} direction="row">
            <Typography>👍{row.total_learning}</Typography>
            <Typography>👎{row.total_mistakes}</Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
