import React, { useEffect } from "react";
import { getDriveFolderId } from "Api/DriveApi";
import { initializeBaseConnection } from "Api/General";
import { createSheet } from "Api/SheetApi";
import useStore from "store";

export default function InitializationLoader() {
  const updateState = useStore((state) => state.updateState);

  useEffect(() => {
    initializeBaseConnection()
      .then((res) => {
        updateState({
          userDetail: res,
          appInitialized: true,
        });

        let data = getDriveFolderId("TheNote").then((res) => {
          if (res) {
            let temp = createSheet("TheNoteDB", res).then((data1) => {
              if (data1[0].id) {
                updateState(() => ({
                  sheetInitialized: true,
                  folderId: res,
                  sheetId: data1[0].id,
                }));
              }
            });
          }
        });
      })
      .catch((error) => {
        updateState({
          appInitialized: true,
        });
        if (
          (error.error = "user_not_login" && window.location.hash !== "#/login")
        ) {
          // the-daily-note-hosting/#/home
          // TODO: uncommenting this code
          window.open("#/login", "_self");
        }
      });
  }, []);

  return <div>Initializing</div>;
}
