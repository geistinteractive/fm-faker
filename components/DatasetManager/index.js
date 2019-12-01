import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import TableList from "./TableList";
import TableManager from "../TableManager";
import { useDataset } from "../../client-api/dataset";
import { VSpace } from "../Utilities";

export default function DatasetManager({ dataSetId }) {
  const { data, error } = useDataset(dataSetId);

  const fmTables = data ? data.data.tables.data : [];

  const [selectedTableId, setSelectedTableId] = useState();
  if (!data) return null;

  const selectedTable = selectedTableId
    ? fmTables.find(i => i.data.id === selectedTableId)
    : fmTables[0];

  return (
    <>
      <Row>
        <Col>
          <h1>{data.data.name}</h1>
          <hr />
          <h3>Source File: {data.data.fileName}</h3>
        </Col>
      </Row>
      <VSpace h="40px" />
      <Row>
        <Col xs={2}>
          <h4>Tables</h4>

          <TableList
            onClick={id => setSelectedTableId(id)}
            fmTables={fmTables}
            selectedTableId={selectedTableId}
          />
        </Col>
        <Col>
          <TableManager data={selectedTable} dataSetId={dataSetId} />
        </Col>
      </Row>
    </>
  );
}
