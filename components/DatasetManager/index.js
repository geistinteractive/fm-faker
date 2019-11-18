import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import TableList from "./TableList";
import TableManager from "../TableManager";
import { useDataset } from "../../client-api/dataset";

export default function DatasetManager({ dataSetId }) {
  const { data, error } = useDataset(dataSetId);
  const fmTables = data ? data.data.tables : [];
  const [selectedTableId, setSelectedTableId] = useState();
  if (!data) return null;

  const selectedTable = selectedTableId
    ? fmTables.find(i => i.id === selectedTableId)
    : fmTables[0];

  const table = fmTables.find(table => {
    return table.id === selectedTableId;
  });

  return (
    <>
      <Row>
        <Col xs={2}>
          <TableList
            onClick={id => setSelectedTableId(id)}
            fmTables={fmTables}
            selectedTableId={selectedTableId}
          />
        </Col>
        <Col>
          <TableManager data={selectedTable} />
        </Col>
      </Row>
    </>
  );
}
