import { setUserInfoToLocal } from "Utils/Utils";

export const initializeBaseConnection = () => {
  return new Promise((res, rej) => {
    let gapi = window?.gapi;
    console.log("initialization...");
    gapi.load("client", (data) => {
      gapi.client
        .init({
          apiKey: "AIzaSyBz9UU61F-hDZ3IUOPNWia7m7MsHz_YCSM",
          clientId:
            "860177916832-b11arhgj8j7kjm1ph7nrvvnd6u7tnnck.apps.googleusercontent.com",
          // single_host_origin is an alias for specifying that you have no subdomains that will access the cookie
          cookiepolicy: "single_host_origin",
          scope: [
            // See, edit, create, and delete all of your Google Drive files
            "https://www.googleapis.com/auth/drive",
            // See, edit, create, and delete only the specific Google Drive files you use with this app
            "https://www.googleapis.com/auth/drive.file",
            // See and download all your Google Drive files
            "https://www.googleapis.com/auth/drive.readonly",
            // See, edit, create, and delete all your Google Sheets spreadsheets
            "https://www.googleapis.com/auth/spreadsheets",
            // See all your Google Sheets spreadsheets
            "https://www.googleapis.com/auth/spreadsheets.readonly",
          ].join(" "),
          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          ],
        })
        .then(() => {
          console.log("successinit");
          let authInstance = gapi?.auth2?.getAuthInstance();

          if (authInstance?.isSignedIn?.get()) {
            let data = authInstance.currentUser.get();
            let temp = setUserInfoToLocal(data);
            res(temp);
          } else {
            rej({ error: "user_not_login", message: "User not login." });
          }
        })
        .catch((error) => {
          console.log("match here");
          console.log("Init error", error);
          rej({
            error: "something_went_wrong",
            message: "Something went wrong.",
          });
        });
    });
  });
};
