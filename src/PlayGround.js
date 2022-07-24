import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";


function Test1() {
  const { count1, updateStateAction } = useContext(TestContext);
  const ref = useRef(0);

  return (
    <button
      onClick={() => {
        updateStateAction("count1", parseInt(count1) + 1);
      }}
    >
      {count1}BUTTON{ref.current++}
    </button>
  );
}

const useContextSelector = (callback) => {
  // use-context-selector

  const state = useContext(TestContext);
  // return callback(state);

  let final = callback(state);

  // useEffect(() => {
  //   console.log("final", final);
  // }, [final]);

  let final1 = useMemo(() => final, [final]);

  // useEffect(() => {
  //   console.log("final1", final1);
  // }, [final1]);

  return final1;
};

function Test2() {
  const count2 = useContextSelector(({ count2 }) => count2);
  const updateStateAction = useContextSelector(
    ({ updateStateAction }) => updateStateAction
  );

  useEffect(() => {
    console.log("Changed123", count2);
  }, [count2]);
  useEffect(() => {
    console.log("Changed123", count2);
  }, [count2]);

  // useEffect(() => {
  //   console.log("Updated updateStateAction", updateStateAction);
  // }, [updateStateAction]);

  const ref = useRef(0);
  return (
    <button
      onClick={() => {
        updateStateAction("count2", parseInt(count2) + 1);
      }}
    >
      {count2}BUttON{ref.current++}
    </button>
  );
}
const initialState = { count1: 1, count2: 1 };

const TestContext = createContext(initialState);

const AppReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return {
        ...state,
        [action.key]: action.payload,
      };

    default:
      return state;
  }
};

function ContextCode({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions for changing state

  function updateStateAction(key, payload) {
    console.log("payload", payload);
    dispatch({
      type: "UPDATE_STATE",
      key: key,
      payload: payload,
    });
  }

  return (
    <TestContext.Provider
      value={{
        ...state,
        updateStateAction,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export default function PlayGround() {
  return (
    <ContextCode>
      <Test1 />
      <Test2 />
    </ContextCode>
  );
}
