import React, { useEffect, useState } from "react";
import generateData from "../../utils/generateData";
import dynamic from "next/dynamic";
import { saveSchemaOverride } from "../../client-api/field";
import CenteredTD from "../Styled/CenteredTD";
const EditTypeButton = dynamic(() => import("../EditTypeButton"), {
  ssr: false
});

export default function FieldRow({ data, dataSetId }) {
  const [generated, setGenerated] = useState();
  data.exampleData = { type: "string" };
  const { id, name, schema, schemaOverride, datatype, ref } = data;

  const [theSchema, setTheSchema] = useState(
    schemaOverride ? schemaOverride : schema
  );

  useEffect(() => {
    async function generate() {
      try {
        const x = await generateData(theSchema);
        setGenerated(x);
      } catch (error) {
        setGenerated("");
      }
    }
    generate();
  }, [theSchema]);

  async function handleValidChange(newSchema) {
    try {
      const r = await saveSchemaOverride(ref, newSchema, dataSetId);
      setTheSchema(newSchema);
    } catch (e) {
      console.log(e.toString());
    }
  }

  return (
    <tr style={{ fontSize: "smaller" }}>
      <CenteredTD>{id}</CenteredTD>
      <CenteredTD>{name}</CenteredTD>
      <CenteredTD>{datatype}</CenteredTD>
      <td>
        <EditTypeButton
          onValidChange={handleValidChange}
          schema={theSchema}
          fieldName={name}
        ></EditTypeButton>
      </td>
      <CenteredTD>{generated}</CenteredTD>
    </tr>
  );
}
