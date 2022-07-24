import { RootContext } from "Context/TheNoteContext";
import { motion, AnimateSharedLayout } from "framer-motion";
import { theNoteTable } from "model/Sheet.model";
import React, { useContext, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useApiCall, useSheetApi } from "Utils/Hooks";
import StoryCard from "./StoryCard";
import StoryCardOpen from "./StoryCardOpen";
import NotDataFound from "assets/NotDataFound.png";
import { useStyleGenerator } from "theme";
import { Button, Typography } from "@mui/material";

const styles = (theme) => ({
  dnNoDataFound: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 60,
    "&>h4": {
      fontWeight: "bold",
    },
    "&>img": {
      margin: "20px 0px",
      width: "40%",
    },
  },
});

export default function StoryContainer() {
  let { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyleGenerator(styles);

  const { sheetId, updateState, storyList = [] } = useContext(RootContext);
  const { getListingAPI, getByIdAPI } = useSheetApi({
    sheetId: sheetId,
    columns: theNoteTable,
  });

  const { data, loading, callApi } = useApiCall(getListingAPI);

  const convertArrayToObject = (arr, key) => {
    let resObj = {};
    arr.map((i) => {
      resObj[i[key]] = i;
    });
    return resObj;
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    let filteredData = convertArrayToObject(
      [...(storyList || []), ...(data || [])],
      "time_stamp"
    );

    updateState({
      storyList: Object.values(filteredData || {}),
    });
  }, [data]);

  let selectedStory = useMemo(() => {
    return storyList.filter((i) => i.time_stamp === id)[0];
  }, [id, storyList]);

  return loading ? (
    "loading"
  ) : storyList.length === 0 ? (
    <div className={classes.dnNoDataFound}>
      <Typography variant="h4">No Sheet Created</Typography>
      <img src={NotDataFound} alt="no data found" />
      <Button
        onClick={() => {
          navigate("/create");
        }}
      >
        Create Now
      </Button>
    </div>
  ) : (
    <>
      <AnimateSharedLayout type="crossfade">
        {storyList?.map((row, i) => (
          <motion.div layoutId={`card-container-${row.time_stamp}`}>
            <StoryCard key={i} row={row} />
          </motion.div>
        ))}

        {id && selectedStory && (
          <StoryCardOpen open row={selectedStory} id={id} key="item" />
        )}
      </AnimateSharedLayout>
    </>
  );
}
