import React, { createContext, useState, useMemo } from "react";
import { generateTheme } from "theme";

export let RootContext = createContext();
export default function TheNoteContext({ children }) {
  const [state, setState] = useState({
    appInitialized: false,
    sheetInitialized: false,
    darkMode: JSON.parse(window.localStorage.getItem("darkMode")),
    theme: generateTheme(
      JSON.parse(window.localStorage.getItem("darkMode")) && "dark"
    ),
  });

  const setUserDetail = (data) => {
    console.log("data1", data);
    setState({
      ...state,
      userDetail: data,
    });
  };

  const updateState = (data) => {
    if (typeof data === "function")
      return setState((state) => ({
        ...state,
        ...data(state),
      }));
    if (typeof data !== "object") return false;

    setState({
      ...state,
      ...data,
    });
  };

  let generateProps = useMemo(() => {
    return {
      ...(state || {}),
      setUserDetail: setUserDetail,
    };
  }, [state, setUserDetail]);

  console.log("Context", state);

  const toggleDarkMode = () => {
    let newMode = state.darkMode ? "light" : "dark";

    updateState({
      darkMode: !state.darkMode,
      theme: generateTheme(newMode),
    });
  };

  const resetState = () =>
    setState({
      theme: state.theme,
      darkMode: state.darkMode,
      appInitialized: true,
    });

  return (
    <RootContext.Provider
      value={{
        ...state,
        setUserDetail: setUserDetail,
        setState: setState,
        updateState: updateState,
        resetState: resetState,
        toggleDarkMode: toggleDarkMode,
      }}
    >
      <div>{children}</div>
    </RootContext.Provider>
  );
}
