import React, {
  Children,
  createContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { getUserInfoFromLocalStorage } from "Utils/Utils";

export let RootContext = createContext();
export default function TheNoteContext({ children }) {
  // let userInfo = getUserInfoFromLocalStorage();

  const [state, setState] = useState({});

  const setUserDetail = (data) => {
    console.log("data1", data);
    setState({
      ...state,
      userDetail: data,
    });
  };

  let generateProps = useMemo(() => {
    return {
      ...(state || {}),
      setUserDetail: setUserDetail,
    };
  }, [state, setUserDetail]);

  console.log("state", state);

  console.log("generateProps", generateProps);

  return (
    <RootContext.Provider value={{ ...state, setUserDetail: setUserDetail }}>
      <div>{children}</div>
    </RootContext.Provider>
  );
}
