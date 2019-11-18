import React, { useState } from "react";
import FMTable from "./index";
import { Container } from "reactstrap";

export default {
  title: "FMTable"
};

const d = {
  name: "Staff",
  minimum: 50,
  maximum: 100,
  fields: [
    { id: 1, name: "FirstName", exampleData: { type: "string" } },
    {
      id: 2,
      name: "Email",
      exampleData: { type: "string", chance: "email" }
    }
  ]
};

export const withData = () => {
  const [state, setState] = useState(d);

  function handleSaveRecordCount({ minimum, maximum }) {
    const copy = JSON.parse(JSON.stringify(state));
    copy.minimum = minimum;
    copy.maximum = maximum;

    setState(copy);
  }

  function handleFieldUpdate(data) {
    const copy = JSON.parse(JSON.stringify(state));

    copy.fields.forEach(field => {
      if (field.id === data.id) {
        field.exampleData = data.exampleData;
      }
    });

    setState(copy);
  }

  return (
    <Container>
      <FMTable
        onFieldUpdate={handleFieldUpdate}
        data={state}
        onSaveTableRecords={handleSaveRecordCount}
      />
    </Container>
  );
};
