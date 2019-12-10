import React from "react";
import { Input } from "reactstrap";

import examples from "./examples";

export default function SelectExample({ onSelect }) {
  const options = Object.keys(examples);

  return (
    <>
      <Input
        type="select"
        onChange={ev => {
          const selection = ev.target.value;
          const schema = examples[selection].schema;
          onSelect(schema);
        }}
      >
        <option></option>
        {options.map(opt => {
          const label = examples[opt].label;
          if (label) {
            return (
              <option value={opt} key={opt}>
                {label}
              </option>
            );
          }
          return <option key={opt}>{opt}</option>;
        })}
      </Input>
    </>
  );
}
