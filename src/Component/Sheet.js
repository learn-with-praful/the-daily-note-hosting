import React, { useEffect } from "react";
import { createSheet, getSpreadSheet } from "../Api/SheetApi";
import axios from "axios";
import GoogleLogin from "./GoogleLogin";
import { setUserInfoToLocal } from "Utils/Utils";
import { createFolder, getDriveFolderId } from "Api/DriveApi";

export default function Sheet() {
  // useEffect(() => {
  //   let gapi = window?.gapi;
  //   gapi.load("client", (data) => {
  //     gapi.client
  //       .init({
  //         // apiKey: "8ef57d12fdba24c29c3db0eb70159ca54a6a510d",
  //         apiKey: "AIzaSyBz9UU61F-hDZ3IUOPNWia7m7MsHz_YCSM",
  //         clientId:
  //           "860177916832-b11arhgj8j7kjm1ph7nrvvnd6u7tnnck.apps.googleusercontent.com",
  //         // single_host_origin is an alias for specifying that you have no subdomains that will access the cookie
  //         cookiepolicy: "single_host_origin",

  //         // https://www.googleapis.com/auth/drive.readonly
  //         // https://www.googleapis.com/auth/spreadsheets
  //         // https://www.googleapis.com/auth/spreadsheets.readonly
  //         // scope: "profile",
  //         // scope: "https://www.googleapis.com/auth/userinfo.email",
  //         // scopes: "https://www.googleapis.com/auth/spreadsheets",

  //         // scope: "https://www.googleapis.com/auth/drive.file",
  //         // scope: "https://www.googleapis.com/auth/drive.file",

  //         scope: [
  //           // See, edit, create, and delete all of your Google Drive files
  //           "https://www.googleapis.com/auth/drive",

  //           // See, edit, create, and delete only the specific Google Drive files you use with this app
  //           "https://www.googleapis.com/auth/drive.file",

  //           // See and download all your Google Drive files
  //           "https://www.googleapis.com/auth/drive.readonly",

  //           // See, edit, create, and delete all your Google Sheets spreadsheets
  //           "https://www.googleapis.com/auth/spreadsheets",

  //           // See all your Google Sheets spreadsheets
  //           "https://www.googleapis.com/auth/spreadsheets.readonly",
  //         ].join(" "),
  //         discoveryDocs: [
  //           "https://sheets.googleapis.com/$discovery/rest?version=v4",
  //           "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  //         ],

  //         // discoveryUrl: [
  //         //   "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  //         // ],

  //         // scopes: [
  //         //   // "https://www.googleapis.com/auth/admin.directory.user",
  //         //   "https://www.googleapis.com/auth/userinfo.email",
  //         // ],
  //         // 'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  //         // 'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  //         // discoveryDocs: [
  //         //   "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  //         // ],
  //       })
  //       .then(() => {
  //         // gapi.client.load("sheets", "v4", () => {
  //         //   console.log("sheet loaded");
  //         //   // now we can use gapi.client.sheets
  //         //   // ...
  //         // });

  //         let authInstance = gapi?.auth2?.getAuthInstance();
  //         console.log("isSignedIn", authInstance?.isSignedIn?.get());
  //         if (authInstance?.isSignedIn?.get()) {
  //           let tb = authInstance.currentUser.tb;
  //           setUserInfoToLocal(tb);
  //           console.log("item2", authInstance);
  //           console.log("authInstance", authInstance);
  //           console.log("authInstanceGet", authInstance.currentUser.get());

  //           // console.log("authInstance", authInstance.currentUser);
  //         }
  //         // getLastSignedInAccount;
  //       })
  //       .catch((error) => {
  //         console.log("sheetError", error);
  //       });
  //   });
  // }, []);

  return (
    <div>
      <div>Sheet</div>
      <div>Sheet</div>
      <button onClick={getSpreadSheet}>get Spread Sheet Working </button>
      <button onClick={createFolder}>Create Sheet Folder</button>

      <button onClick={getDriveFolderId}>Get drive id</button>

      <button onClick={createSheet}>
        createSheet Final This will create sheet if not present
      </button>

      <GoogleLogin />
    </div>
  );
}
