import React from "react";
import { Table } from "reactstrap";
import FieldRow from "./FieldRow";

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
          <th>FM Type</th>
          <th>Schema Type</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {fields.map(data => {

          return (
            <FieldRow
              onValidChange={handleValidChange}
              key={data.id}
              data={data.data}
            ></FieldRow>
          );
        })}
      </tbody>
    </Table>
  );
}
