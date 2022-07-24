import React, { useContext } from "react";
import { RootContext } from "Context/TheNoteContext";

export default function Test1() {
  const { updateState, test = 0 } = useContext(RootContext) || {};
  const ref = React.useRef(0);

  return (
    <div>
      <button
        onClick={() => {
          updateState({ test: test + 1 });
        }}
      >
        {test}
        count
        {ref.current++}
      </button>
    </div>
  );
}
