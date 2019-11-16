import React from "react";
import { Table } from "reactstrap";
import FieldRow from "../FieldRow";

export function FieldList({ fields, onChange }) {
  function handleValidChange(d) {
    onChange(d);
  }
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
      <tbody>
        {fields.map(data => {
          return (
            <FieldRow
              onValidChange={handleValidChange}
              key={data.id}
              data={data}
            ></FieldRow>
          );
        })}
      </tbody>
    </Table>
  );
}
