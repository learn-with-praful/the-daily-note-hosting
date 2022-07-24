import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";

function Test1() {
  const count1 = useContextSelector(TestContext, ({ count1 }) => count1);
  const setState = useContextSelector(TestContext, ({ setState }) => setState);

  console.log("count1", count1);

  const ref = useRef(0);

  return (
    <button
      onClick={() => {
        setState((state) => ({
          ...state,
          count1: parseInt(count1) + 1,
        }));
      }}
    >
      {count1}BUTTON{ref.current++}
    </button>
  );
}

function Test2() {
  const count2 = useContextSelector(TestContext, ({ count2 }) => count2);
  const setState = useContextSelector(TestContext, ({ setState }) => setState);
  const ref1 = useRef(0);
  

  console.log("re0render hepped");

  useEffect(() => {
    console.log("Changed123", count2);
  }, [count2]);

  return (
    <button
      onClick={() => {
        setState((state) => ({
          ...state,
          count2: parseInt(count2) + 1,
        }));
      }}
    >
      {count2}BUttON{ref1.current++}
    </button>
  );
}

const initialState = { count1: 1, count2: 1 };
const TestContext = createContext(initialState);

function ContextCode({ children }) {
  const [state, setState] = useState(initialState);
  console.log("state44", state);
  // Actions for changing state
  return (
    <TestContext.Provider
      value={{
        ...state,
        setState,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export default function PlayGroundHook() {
  return (
    <ContextCode>
      <Test1 />
      <Test2 />
    </ContextCode>
  );
}
