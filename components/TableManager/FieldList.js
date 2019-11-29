import React from "react";
import FieldRow from "./FieldRow";
import idFromRef from "../../api-services/db/fauna-utils/idFromRef";

import SmallBorderedTable from "../Styled/SmallBorderedTable";

export function FieldList({ fields, onChange }) {
  function handleValidChange(d) {
    onChange(d);
  }
  return (
    <SmallBorderedTable
      size="sm"
      style={{ border: "1px solid #dee2e6", backgroundColor: "white" }}
    >
      <thead>
        <tr>
          <th>Id</th>
          <th>FieldName</th>
          <th>FM Type</th>
          <th>Schema Type</th>
          <th>Sample Data</th>
        </tr>
      </thead>
      <tbody smaller>
        {fields.map(data => {
          return (
            <FieldRow
              onValidChange={handleValidChange}
              key={idFromRef(data.ref)}
              data={data.data}
            ></FieldRow>
          );
        })}
      </tbody>
    </SmallBorderedTable>
  );
}
