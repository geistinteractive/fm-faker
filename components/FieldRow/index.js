import React, { useEffect, useState } from "react";
import EditTypeField from "../EditTypeField";
import generateData from "../../utils/generateData";

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
