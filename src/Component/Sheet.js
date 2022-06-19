import React, { useEffect } from "react";
import { createSheet, getSpreadSheet } from "../Api/SheetApi";
import axios from "axios";
import GoogleLogin from "./GoogleLogin";
import { setUserInfoToLocal } from "Utils/Utils";
import { createFolder, getDriveFolderId } from "Api/DriveApi";

export default function Sheet() {
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
