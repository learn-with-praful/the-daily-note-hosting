import React from "react";
import { Alert, Slide, Snackbar } from "@mui/material";
import { generateDynamicKey } from "Utils/Utils";
import useStore from "store";

function NotificationManager() {
  const updateState = useStore((state) => state.updateState);
  const notification = useStore((state) => state.notification || []);

  const handleCloseAlert = (id) => (e) => {
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

export const useNotification = () => {
  const updateState = useStore((state) => state.updateState);

  const generateNotification = (type, other = {}) => {
    let payload = {};
    if (typeof other === "string") {
      payload.message = other;
    } else {
      payload = other;
    }
    if (payload.message) {
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
