import React, { useContext, useEffect } from "react";
import { RootContext } from "Context/TheNoteContext";

export default function Test2() {
  const { updateState, test1 = 0 } = useContext(RootContext) || {};
  const ref = React.useRef(0);

  useEffect(() => {
    console.log("updateState", updateState);
  }, [updateState]);

  useEffect(() => {
    console.log("test1", test1);
  }, [test1]);

  return (
    <div>
      <button
        onClick={() => {
          updateState({ test1: (test1 || 0) + 1 });
        }}
      >
        {test1}
        sdfsdfs df
        {ref.current++}
      </button>
    </div>
  );
}
