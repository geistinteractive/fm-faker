import React from "react";
import FieldRow from "./FieldRow";
import idFromRef from "../../api-services/db/fauna-utils/idFromRef";
import sortBy from "lodash.sortby";

import SmallBorderedTable from "../Styled/SmallBorderedTable";

export function FieldList({ fields, onChange, dataSetId }) {
  fields = sortBy(fields, f => f.data.name);

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
      <tbody>
        {fields.map(field => {
          field.data.ref = idFromRef(field.ref);
          return (
            <FieldRow
              onValidChange={handleValidChange}
              key={field.data.ref}
              data={field.data}
              dataSetId={dataSetId}
            ></FieldRow>
          );
        })}
      </tbody>
    </SmallBorderedTable>
  );
}
