import React, { useContext, useEffect } from "react";
import { RootContext } from "Context/TheNoteContext";
import Header from "Component/Header";
import Login from "Container/Login/Login";
import Home from "Container/Home/Home";
import CreateNote from "Container/CreateNote/CreateNote";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import InitializationLoader from "Container/InitializationLoader";
import Sheet from "Component/Sheet";
import PrafulRedirect from "PrafulRedirect";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {
  const data = useContext(RootContext) || {};

  const { appInitialized, sheetInitialized, theme } = data;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div>
        {
          // <Header />
          // <Sheet />
        }
        <HashRouter>
          <Routes>
            <Route path="/login-redirect" element={<PrafulRedirect />} />

            <Route path="*" element={<InitializationLoader />} />
            {appInitialized && (
              <Route exact path="/login" element={<Login />} />
            )}

            {appInitialized && sheetInitialized && (
              <>
                <Route path="/" element={<Home />}>
                  <Route path="/home" element={<Home />} />
                </Route>
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
