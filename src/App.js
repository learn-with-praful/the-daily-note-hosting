import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { setUserInfoToLocal } from "Utils/Utils";
import { RootContext } from "Context/TheNoteContext";
import Header from "Component/Header";
import Login from "Component/Login/Login";
import Home from "Component/Home/Home";

function App() {
  const data = useContext(RootContext) || {};
  console.log("data123", data);
  const { setUserDetail = () => {} } = data;

  useEffect(() => {
    let gapi = window?.gapi;
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
          let authInstance = gapi?.auth2?.getAuthInstance();
          console.log("isSignedInUser", authInstance?.isSignedIn?.get());
          if (authInstance?.isSignedIn?.get()) {
            let tb = authInstance.currentUser.tb;
            console.log("tb", tb);
            let temp = setUserInfoToLocal(tb);
            setUserDetail(temp);
            console.log("item2", authInstance);
            console.log("authInstance", authInstance);
            console.log("authInstanceGet", authInstance.currentUser.get());

            // console.log("authInstance", authInstance.currentUser);
          }
          // getLastSignedInAccount;
        })
        .catch((error) => {
          console.log("sheetError", error);
        });
    });
  }, []);

  return (
    <div>
      {
        // <Header />
      }
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {
        // <Sheet />
      }
    </div>
  );
}

export default App;
