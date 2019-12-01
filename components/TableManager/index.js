import React from "react";

import NumberOfRecords from "./NumberOfRecords";
import { FieldList } from "./FieldList";

export default function FMTable({
  onFieldUpdate,
  onSaveTableRecords,
  data,
  dataSetId
}) {
  function handleNumberOfRecordsSave(data) {
    onSaveTableRecords(data);
  }

  function handleFieldChange(data) {
    onFieldUpdate(data);
  }

  if (!data) return null;

  return (
    <>
      <h4>Fields in {data.data.name} Table</h4>

      <FieldList
        onChange={handleFieldChange}
        fields={data.data.fields.data}
        dataSetId={dataSetId}
      ></FieldList>
    </>
  );
}
