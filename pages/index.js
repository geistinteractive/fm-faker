import React from "react";
import LoggedInHome from "../components/LoggedInHome";
import useMe from "../client-api/useMe";
import { Row, Col, Card, CardBody, CardImg, Button } from "reactstrap";
import { VSpace } from "../components/Utilities";

export default function Home() {
  const { data, error, isValidating } = useMe();

  const loggedIn = data && data.error !== "not_authenticated";
  if (loggedIn === undefined || isValidating) {
    return "loading...";
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (loggedIn) return <LoggedInHome />;
  return <LoggedOutHome />;
}

function LoggedOutHome() {
  return (
    <>
      <VSpace h="100px" />
      <Row>
        <Col></Col>
        <Col>
          <Card style={{ boxShadow: "0px 4px 8px #888888" }}>
            <CardImg
              top
              width="50%"
              src="/faker-maker.svg"
              alt="Card image cap"
            />
            <CardBody>
              Hello, <br />
              <br />
              Welcome to the best way to fake your FileMaker Data. Please{" "}
              <a href="/api/login">login</a> and get yourself some fake data! 😉
            </CardBody>
            <CardBody>
              <Button
                onClick={() => {
                  window.location = "/api/login";
                }}
                color="success"
                size="lg"
                block
              >
                Login
              </Button>
            </CardBody>
            <VSpace h="12px" />
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}
