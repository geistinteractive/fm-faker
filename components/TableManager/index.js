import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { FieldList } from "./FieldList";
import { InlineLink } from "../Utilities";
import RecordLimitsForm from "../forms/RecordLimitsForm";

export default function FMTable({
  onFieldUpdate,
  onSaveTableRecords,
  data,
  dataSetId,
  revalidate
}) {
  function handleFieldChange(data) {
    onFieldUpdate(data);
  }

  if (!data) return null;

  const min = data.data.minimum;
  const max = data.data.maximum;

  return (
    <>
      <Row>
        <Col>
          <h4>Fields in {data.data.name} Table</h4>
        </Col>

        <Col>
          <EditRecordNumbers min={min} max={max} onSave={onSaveTableRecords} />
        </Col>
      </Row>

      <FieldList
        onChange={handleFieldChange}
        fields={data.data.fields.data}
        dataSetId={dataSetId}
      ></FieldList>
    </>
  );
}

function EditRecordNumbers({
  min = 20,
  max = 40,
  onSave = data => {
    console.log("onSave");
    console.log(data);
  }
}) {
  const [recordRangeOpen, setRecordRangeOpen] = useState(false);
  return (
    <span className="float-right">
    
      {`Generate between ${min} and ${max} records for this table.`}{" "}
      <InlineLink
        onClick={e => {
          setRecordRangeOpen(true);
        }}
      >
        edit
      </InlineLink>
      <RecordLimitsForm
        onCancel={() => {
          setRecordRangeOpen(false);
        }}
        onSubmit={data => {
          setRecordRangeOpen(false);
          onSave(data);
        }}
        defaultValues={{ minimum: min, maximum: max }}
        open={recordRangeOpen}
      />
    </span>
  );
}
