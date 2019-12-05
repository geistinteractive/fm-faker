import React, { useState } from "react";
import { useDataSets, deleteById } from "../client-api/dataset";
import { Table, Row, Col, Button } from "reactstrap";
import AddNewDataSet from "./AddNewDatasetModal";
import Link from "next/link";
import SmallBorderedTable from "./Styled/SmallBorderedTable";
import CenteredTD from "./Styled/CenteredTD";
import DeleteDataSetButton from "./DeleteDataSetButton";
import {
  downloadDataSetJSON,
  downloadFullSetCSVs,
  downloadDataSetSchema
} from "../utils/schemaGenerators";

export default function LoggedInHome() {
  const { data, error, revalidate } = useDataSets();
  const [modal, setModal] = useState(false);

  if (!data) return null;
  const datasetArray = data.data;

  const handleConfirmDelete = async id => {
    console.log("deleting", id);
    await deleteById(id);
    revalidate();
  };

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
              revalidate();
              setModal(false);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SmallBorderedTable style={{ backgroundColor: "white" }} size="sm">
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
                  <tr key={data.id}>
                    <CenteredTD>{name}</CenteredTD>
                    <CenteredTD>{fileName}</CenteredTD>
                    <CenteredTD>{tables.data.length}</CenteredTD>
                    <td>
                      <Button
                        onClick={() => {
                          downloadDataSetJSON(data);
                        }}
                        color="link"
                        size="sm"
                      >
                        JSON Data
                      </Button>
                      <Button
                        onClick={() => {
                          downloadFullSetCSVs(data);
                        }}
                        color="link"
                        size="sm"
                      >
                        CSV Data
                      </Button>
                      <Button
                        onClick={() => {
                          downloadDataSetSchema(data);
                        }}
                        color="link"
                        size="sm"
                      >
                        Schema
                      </Button>
                      <Link href={`/dataset/[id]`} as={`/dataset/${data.id}`}>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </Link>
                      <DeleteDataSetButton
                        onDeleteConfirmed={() => {
                          handleConfirmDelete(data.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </SmallBorderedTable>
        </Col>
      </Row>
    </>
  );
}
