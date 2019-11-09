import React, { useState } from "react";
import EditFieldType from "./index";

export default {
  title: "EditFieldType"
};

export const withString = () => {
  const [state, setState] = useState({ type: "number" });

  return (
    <EditFieldType
      value={state}
      onValidChange={v => {
        setState(v);
      }}
    />
  );
};
