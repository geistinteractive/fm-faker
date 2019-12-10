import React from "react";
import { Input } from "reactstrap";

import examples from "./examples.json";

export default function SelectExample({ onSelect }) {
  const options = Object.keys(examples);

  return (
    <>
      <Input
        type="select"
        onChange={ev => {
          const selection = ev.target.value;
          const schema = examples[selection];
          onSelect(schema);
        }}
      >
        <option></option>
        {options.map(opt => {
          return <option key={opt}>{opt}</option>;
        })}
      </Input>
    </>
  );
}
