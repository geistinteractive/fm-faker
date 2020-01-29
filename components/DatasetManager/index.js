import React, { useState } from "react";
import { Col, Row, Button } from "reactstrap";
import TableList from "./TableList";
import TableManager from "../TableManager";
import { useDataset } from "../../client-api/dataset";
import { VSpace } from "../Utilities";
import { saveTableRecords } from "../../client-api/table";
import { mergeDataSet } from "../../client-api/dataset";
import idFromRef from "../../api-services/db/fauna-utils/idFromRef";
import UpdateDataSet from "../UpdateDataSet";

export default function DatasetManager({ dataSetId }) {
  const [showUpdate, setShowUpdate] = useState(false);
  const { data, error, revalidate } = useDataset(dataSetId);

  const fmTables = data ? data.data.tables.data : [];

  const [selectedTableId, setSelectedTableId] = useState();
  if (!data) return null;

  const selectedTable = selectedTableId
    ? fmTables.find(i => i.data.id === selectedTableId)
    : fmTables[0];

  async function handleSaveTableRecords(recordData) {
    const id = idFromRef(selectedTable.ref);
    await saveTableRecords(id, recordData);
    revalidate();
  }

  async function handleUpdate(data) {
    const result = await mergeDataSet(dataSetId, data);
    console.log(result);

    setShowUpdate(false);
  }

  return (
    <>
      <Row>
        <Col>
          <h1>{data.data.name}</h1>
          <hr />
          <h3>Source File: {data.data.fileName}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => setShowUpdate(true)}>
            Update with new XML File
          </Button>
          <UpdateDataSet
            onCancel={() => setShowUpdate(false)}
            isOpen={showUpdate}
            oldData={data}
            onValidSave={handleUpdate}
          />
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
          <TableManager
            onSaveTableRecords={handleSaveTableRecords}
            data={selectedTable}
            dataSetId={dataSetId}
          />
        </Col>
      </Row>
    </>
  );
}
