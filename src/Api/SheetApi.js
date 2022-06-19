import axios from "axios";
import { createFileFolderInDrive, getDriveFolderId } from "./DriveApi";

let sheetId = "13kAbKDibk4ElrIXIBQnDjD8Kow8pzlVdPmS5DBxNIuQ";
let apiEndpoint =
  "https://spreadsheets.googe.com/feeds/cells/:sheetId/:pageNo/public/full?alt=json";

export let getSpreadSheet = () => {
  let params = {
    spreadsheetId: "13kAbKDibk4ElrIXIBQnDjD8Kow8pzlVdPmS5DBxNIuQ",
    // range: "a1", // TODO: Update placeholder value.
    range: "A1:B6",
    // https://developers.google.com/sheets/api/reference/rest/v4/ValueRenderOption
    // valueRenderOption : "FORMATTED_VALUE" : "UNFORMATTED_VALUE" : "FORMULA"
    // majorDimension : "ROWS" : "COLUMNS" // can be from this 2 items
    // https://developers.google.com/sheets/api/reference/rest/v4/DateTimeRenderOption
    // dateTimeRenderOption : "SERIAL_NUMBER"  : "FORMATTED_STRING"

    // dateTimeRenderOption: "",
    // spreadsheetId: "13kAbKDibk4ElrIXIBQnDjD8Kow8pzlVdPmS5DBxNIuQ",
    // range: "Sheet1!A1",
    // spreadsheetId: "my-spreadsheet-id", // TODO: Update placeholder value.
  };

  window.gapi.client.sheets.spreadsheets.values
    .get(params)
    .then((response) => {
      var result = response.result;
      console.log("response", response);
      var numRows = result.values ? result.values.length : 0;
      console.log(`${numRows} rows retrieved.`);
    })
    .catch((error) => {
      console.log("sheetError", error);
    });

  // /////////////////method 2
  // var request = window.gapi.client.sheets.spreadsheets.values.get(params);
  // request.then(
  //   function (response) {
  //     // TODO: Change code below to process the `response` object:
  //     console.log(response.result);
  //   },
  //   function (reason) {
  //     console.error("error: " + reason.result.error.message);
  //   }
  // );

  // https://content-sheets.googleapis.com/v4/spreadsheets/13kAbKDibk4ElrIXIBQnDjD8Kow8pzlVdPmS5DBxNIuQ/values/a1?key=AIzaSyAa8yy0GdcGPHdtD083HiGGx_S0vMPScDM
};

export const createSheet = (fileName, parentId) => {
  return new Promise((resolve, reject) => {
    window.gapi.client.drive.files
      .list({
        // q: "mimeType=application/vnd.google-apps.spreadsheet' and name='TheNoteDB'",
        q: `mimeType='application/vnd.google-apps.spreadsheet' and name='${fileName}'`,
        trashed: false,
        parent: parentId,
      })
      .then((res) => {
        console.log("Create Sheet Result", res);

        if (res.result.files.length > 0) {
          console.log("File Already Available");
          resolve(res.result.files);
        } else {
          createSpreadSheet({
            name: "TheNoteDB",
            parent: parentId,
          })
            .then((res) => {
              let spreadSheetId = res.id;
              console.log("sheet create res", res);
              console.log("give Response");
            })
            .catch((error) => {
              console.log("error1", error);
            });
        }
      });
  });
};

export const createSpreadSheet = ({ name, parent, fields = "id" }) => {
  return new Promise((resolve, reject) => {
    createFileFolderInDrive({
      name,
      parent,
      mimeType: "application/vnd.google-apps.spreadsheet",
      fields,
    })
      .then((res) => {
        console.log("sheet create res", res);
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};
