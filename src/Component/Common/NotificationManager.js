import React, { useContext } from "react";
import { Alert, Slide, Snackbar } from "@mui/material";
import TheNoteContext, { RootContext } from "Context/TheNoteContext";
import { useContextSelector, useContextSelector1 } from "Utils/Hooks";
import { generateDynamicKey } from "Utils/Utils";

function NotificationManager() {
  // const selector = useContextSelector(RootContext);
  const notification = useContextSelector1(
    RootContext,
    (state) => state.notification
  );

  // const notification = [
  //   {
  //     id: generateDynamicKey(),
  //     open: true,
  //     message: "test",
  //     type: "success",
  //   },
  // ];
  console.log("notification", notification);

  // const notification = selector((state) => state.notification);
  // const updateState = selector((state) => state.updateState);
  const updateState = () => {};

  const handleCloseAlert = (id) => (e) => {
    console.log("id", id);
    let data = notification.map((item) => {
      if (item.id === id && !item.open) {
        item.open = false;
      }
      return item;
    });
    updateState({ notification: data });
  };

  return (
    <>
      {notification?.map((item, i) => (
        <Snackbar
          key={i}
          open={item.open}
          autoHideDuration={item.duration}
          onClose={handleCloseAlert(item.id)}
          TransitionComponent={(props) => (
            <Slide {...props} direction="right" />
          )}
        >
          <Alert onClose={handleCloseAlert(item.id)} severity={item.type}>
            {item.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}

export default NotificationManager;

{
  // export default React.memo(NotificationManager);
}

export const useNotification = () => {
  const updateState = useContextSelector1(RootContext, (state) => {
    console.log("praful", state);
    console.log("prafulqwe", state.updateState);
    let fun = state.updateState

    return fun;
  });
  console.log("!23", updateState);

  const generateNotification = (type, other = {}) => {
    let payload = {};
    if (typeof other === "string") {
      payload.message = other;
    } else {
      payload = other;
    }
    if (payload.message) {
      console.log("updateState", updateState);
      updateState((state) => ({
        ...state,
        notification: [
          ...(state?.notification || []),
          {
            id: generateDynamicKey(),
            open: true,
            type: type,
            ...payload,
          },
        ],
      }));
    }
  };

  const success = (other) => generateNotification("success", other);
  const info = (other) => generateNotification("info", other);
  const warning = (other) => generateNotification("warning", other);
  const error = (other) => generateNotification("error", other);
  return { success, info, warning, error, generateNotification };
};
