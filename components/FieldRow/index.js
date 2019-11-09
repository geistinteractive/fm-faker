import React, { useEffect, useState } from "react";
import EditTypeField from "../EditTypeField";
import jsf, { generate } from "json-schema-faker";
import chance from "chance";
function generateData(schema) {
  jsf.extend("chance", chance);
  jsf.extend("faker", () => require("faker"));
  jsf.option({ resolveJsonPath: true });
  return jsf.resolve(schema);
}

export default function FieldRow({ data, onValidChange }) {
  if (!data) return null;
  const [generated, setGenerated] = useState();

  const { id, name, type } = data;

  useEffect(() => {
    async function generate() {
      const data = await generateData(type);
      setGenerated(data);
    }
    generate();
  }, [data]);

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>
        <EditTypeField
          onValidChange={type => {
            onValidChange({ type });
          }}
          value={type}
        ></EditTypeField>
      </td>
      <td>{generated}</td>
    </tr>
  );
}
