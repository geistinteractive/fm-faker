import { Container, Col, Row, Card, CardBody, CardHeader } from "reactstrap";
import { useDropzone } from "react-dropzone";

import { useCallback } from "react";

import MyNavBar from "../components/myNavBar";
import DataSetTable from "../components/DataSetTable";
import { parseTables, makeSchemas } from "../utils/parseFMXml";

function Header() {
  return (
    <>
      <h1 style={{ paddingTop: "20px" }}>Data Sets</h1>
      <hr></hr>
    </>
  );
}

function MyDropzone() {
  const onDrop = useCallback(async acceptedFiles => {
    console.log("okokok");

    const Tables = await parseTables(acceptedFiles);
    console.log(JSON.stringify(makeSchemas(Tables), null, "  "));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

function VSpace({ h }) {
  h = h ? h : "10px";
  return <div style={{ height: h }} />;
}

function Home() {
  return (
    <>
      <MyNavBar />
      <Container fluid>
        <Row>
          <Col>
            <Header />
            <DataSetTable />
          </Col>
          <Col>
            <VSpace h="72px" />
            <p>
              This is using{" "}
              <a href="https://json-schema-faker.js.org">JSON Schema Faker</a>{" "}
              to generate fake data. The structure of a table is defined with a
              JSONSchema. The fake data is generated through either of two other
              libraries,{" "}
              <a href="https://github.com/marak/Faker.js/#api-methods">
                Faker.js
              </a>{" "}
              and or <a href="https://chancejs.com/">Chance.js</a>
            </p>
            <p></p>
          </Col>
        </Row>
        <MyDropzone></MyDropzone>
      </Container>
    </>
  );
}

export default Home;
