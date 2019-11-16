import React, { useState } from "react";
import { useDataSets } from "../client-api/dataset";
import { Table, Row, Col, Button } from "reactstrap";
import AddNewDataSet from "./AddNewDatasetModal";

export default function LoggedInHome() {
  const { data, error } = useDataSets();
  const [modal, setModal] = useState(false);

  if (!data) return null;

  return (
    <>
      <Row>
        <Col>
          <h1>Data Sets</h1>
        </Col>
        <Col>
          <Button
            color="primary"
            style={{ marginTop: "6px" }}
            className="float-right"
            onClick={() => {
              setModal(true);
            }}
          >
            Add New
          </Button>
          <AddNewDataSet
            isOpen={modal}
            onCancel={() => {
              setModal(false);
            }}
            onValidSave={() => {
              setModal(false);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>File Name</th>
                <th>Table Count</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map(dataset => {
                const { name, fileName } = dataset;
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{fileName}</td>
                    <td>3</td>
                    <td>
                      <Button color="link" size="sm">
                        Schema
                      </Button>
                      <Button color="link" size="sm">
                        Data
                      </Button>
                      <Button color="link" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
