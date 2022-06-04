import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "App";
import TheNoteContext from "Context/TheNoteContext";
import { BrowserRouter } from "react-router-dom";
import theme from "theme";
import { ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <TheNoteContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TheNoteContext>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
