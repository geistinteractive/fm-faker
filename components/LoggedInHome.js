import React, { useState } from "react";
import { useDataSets } from "../client-api/dataset";
import { Table, Row, Col, Button } from "reactstrap";
import AddNewDataSet from "./AddNewDatasetModal";
import Link from "next/link";

export default function LoggedInHome() {
  const { data, error } = useDataSets();
  const [modal, setModal] = useState(false);

  if (!data) return null;
  const datasetArray = data.data;

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
              {datasetArray.map(dataset => {
                const { data } = dataset;
                data.id = dataset["ref"]["@ref"].id;
                const { name, fileName, tables } = data;

                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{fileName}</td>
                    <td>{tables.length}</td>
                    <td>
                      <Button color="link" size="sm">
                        Schema
                      </Button>
                      <Button color="link" size="sm">
                        Data
                      </Button>
                      <Link href={`/dataset/[id]`} as={`/dataset/${data.id}`}>
                        <Button color="link" size="sm">
                          Edit
                        </Button>
                      </Link>
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
