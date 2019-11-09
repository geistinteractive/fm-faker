import React from "react";
import FieldTypeEditor from "./index";

export default {
  title: "TypeEditor"
};

export const withString = () => {
  return (
    <FieldTypeEditor
      onValidChange={console.log}
      initialValue={{ type: "string" }}
    ></FieldTypeEditor>
  );
};

export const withNumber = () => {
  return (
    <FieldTypeEditor
      onValidChange={console.log}
      initialValue={{ type: "number" }}
    ></FieldTypeEditor>
  );
};
