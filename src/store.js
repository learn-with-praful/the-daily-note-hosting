import { generateTheme } from "theme";
import create from "zustand";

const useStore = create((set) => ({
  appInitialized: false,
  sheetInitialized: false,
  darkMode: JSON.parse(window.localStorage.getItem("darkMode")),
  sheetId: null,
  theme: generateTheme(
    JSON.parse(window.localStorage.getItem("darkMode")) && "dark"
  ),
  storyList: [],
  setState: (key, value) => set((state) => ({ [key]: value })),
  toggleDarkMode: () => {
    set((state) => {
      let newMode = state.darkMode ? "light" : "dark";
      return {
        darkMode: !state.darkMode,
        theme: generateTheme(newMode),
      };
    });
  },
  updateState: (data) => {
    if (typeof data === "function")
      return set((state) => ({
        ...state,
        ...data(state),
      }));
    if (typeof data !== "object") return false;

    set((state) => ({
      ...state,
      ...data,
    }));
  },

  setUserDetail: (data) => {
    return set(() => ({
      userDetail: data,
    }));
  },
}));

export default useStore;
