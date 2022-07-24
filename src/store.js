import create from "zustand";

export const useState = create((set) => ({
  appInitialized: false,
  sheetInitialized: false,
  darkMode: JSON.parse(window.localStorage.getItem("darkMode")),
  sheetId: null,
  setState: (key, value) => set((state) => ({ [key]: value })),
}));

// const useStore = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }));
