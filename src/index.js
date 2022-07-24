import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "App";
import TheNoteContext from "Context/TheNoteContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// import PlayGround from "PlayGround";
// import PlayGroundHook from "PlayGroundHoook";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <TheNoteContext>
    <App />
  </TheNoteContext>
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
