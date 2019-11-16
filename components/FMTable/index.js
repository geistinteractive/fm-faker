import React from "react";

import NumberOfRecords from "./NumberOfRecords";
import { FieldList } from "./FieldList";
export default function FMTable({ onFieldUpdate, onSaveTableRecords, data }) {
  function handleNumberOfRecordsSave(data) {
    onSaveTableRecords(data);
  }

  function handleFieldChange(data) {
    onFieldUpdate(data);
  }

  if (!data) return null;

  return (
    <>
      <h2>{data.name}</h2>
      <NumberOfRecords
        onSave={handleNumberOfRecordsSave}
        data={data}
      ></NumberOfRecords>
      <FieldList onChange={handleFieldChange} fields={data.fields}></FieldList>
    </>
  );
}
