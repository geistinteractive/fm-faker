import React from "react";
import { Button, Col, Row } from "reactstrap";
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

  function downloadSchema() {
    downloadTableSchema(data.data);
  }

  function handlDownloadCSV() {
    downloadCSV(data.data);
  }

  if (!data) return null;

  return (
    <>
      <Row>
        <Col>
          <h4>Fields in {data.data.name} Table</h4>
        </Col>

        <Col></Col>
      </Row>

      <FieldList
        onChange={handleFieldChange}
        fields={data.data.fields.data}
        dataSetId={dataSetId}
      ></FieldList>
    </>
  );
}

function DLButton({ text, onClick }) {
  return (
    <Button onClick={onClick} size={"sm"} color="link" className="float-right">
      {text}
    </Button>
  );
}
