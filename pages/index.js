import { Container, Col, Row, Card, CardBody, CardHeader } from "reactstrap";
import { useState } from "react";

import { XMLDropZone } from "../components/XMLDropZone";
import MyNavBar from "../components/myNavBar";
import TableList from "../components/TableList";
import { FieldList } from "../components/FieldList";

function TableManager() {
  const [selectedTable, setSelected] = useState();

  return (
    <>
      <Row>
        <Col>
          <XMLDropZone></XMLDropZone>
        </Col>
      </Row>
      <Row>
        <Col xs="2">
          <TableList
            table={selectedTable}
            onClick={clicked => {
              setSelected(clicked);
            }}
          ></TableList>
        </Col>
        <Col xs="9">
          <FieldList table={selectedTable}></FieldList>
        </Col>
      </Row>
    </>
  );
}

function Home() {
  return (
    <>
      <MyNavBar />
      <Container fluid>
        <TableManager></TableManager>
      </Container>
    </>
  );
}

export default Home;
