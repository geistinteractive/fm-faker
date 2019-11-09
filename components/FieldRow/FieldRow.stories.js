import React, { useState } from "react";
import { Table } from "reactstrap";

import FieldRow from "./";

export default {
  title: "FieldRow"
};

const stringValue = {
  id: 1,
  name: "FirstName",
  type: { type: "string" }
};

const email = {
  id: 1,
  name: "Email",
  type: { type: "string", chance: "email" }
};

function TheTable({ children }) {
  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Id</th>
          <th>FieldName</th>
          <th>Type</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
}

export const withString = () => {
  const [state, setState] = useState(stringValue);

  return (
    <TheTable>
      <FieldRow
        onValidChange={v => {
          const newValue = { ...state, ...v };

          setState(newValue);
        }}
        data={state}
      ></FieldRow>
    </TheTable>
  );
};

export const withEmail = () => {
  const [state, setState] = useState(email);

  return (
    <TheTable>
      <FieldRow
        onValidChange={v => {
          const newValue = { ...state, ...v };

          setState(newValue);
        }}
        data={state}
      ></FieldRow>
    </TheTable>
  );
};
