import React from "react";
import Header from "Component/Header";
import Login from "Container/Login/Login";
import Home from "Container/Home/Home";
import CreateNote from "Container/CreateNote/CreateNote";
import { HashRouter, Routes, Route } from "react-router-dom";
import InitializationLoader from "Container/InitializationLoader";
import Sheet from "Component/Sheet";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "app.css";
import NotificationManager from "Component/Common/NotificationManager";
import useStore from "store";

function App() {
  const appInitialized = useStore((state) => state.appInitialized);
  const sheetInitialized = useStore((state) => state.sheetInitialized);
  const theme = useStore((state) => state.theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationManager />

      <div>
        <HashRouter>
          <Routes>
            <Route path="*" element={<InitializationLoader />} />
            {appInitialized && (
              <Route exact path="/login" element={<Login />} />
            )}

            {appInitialized && sheetInitialized && (
              <>
                <Route path="/" element={<Home />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/home/:id" element={<Home />} />
                </Route>
                <Route path="/edit/:id" element={<CreateNote />} />

                <Route path="/create" element={<CreateNote />} />
                <Route path="/Header" element={<Header />} />
                <Route path="/Sheet" element={<Sheet />} />
              </>
            )}
          </Routes>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
