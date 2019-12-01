import React, { useState, useEffect, createRef } from "react";
import AceEditor from "react-ace";
import jsf from "json-schema-faker";
import chance from "chance";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

function generateData(schema) {
  jsf.extend("chance", chance);
  jsf.extend("faker", () => require("faker"));
  jsf.option({ resolveJsonPath: true });
  return jsf.resolve(schema);
}

export default function TypeEditor({ initialValue, onValidChange }) {
  const [generatedData, setGeneratedData] = useState();

  async function onValidJSON(schema) {
    try {
      onValidChange(schema);
      const data = await generateData(schema);
      setGeneratedData(data);
    } catch (e) {}
  }
  useEffect(() => {
    async function setData() {
      try {
        const initialData = await generateData(initialValue);
        setGeneratedData(initialData);
      } catch (e) {}
    }
    setData();
  }, [initialValue]);

  return (
    <>
      <JSONEditor
        onValidJSON={onValidJSON}
        initialValue={initialValue}
      ></JSONEditor>
      <DisplayGeneratedData data={generatedData}></DisplayGeneratedData>
    </>
  );
}
/**
 *
 * @param {*} param0
 */
function JSONEditor({ onValidJSON, initialValue }) {
  //editor.config.set("workerPath", "Scripts/Ace");
  //https://stackoverflow.com/questions/14053820/how-to-set-the-source-path-in-ace-editor
  //
  //
  const [state, setState] = useState(JSON.stringify(initialValue, null, "\t"));

  function handleChange(newValue) {
    try {
      const validValue = JSON.parse(newValue);
      onValidJSON(validValue);
      setState(newValue);
    } catch (e) {}
  }

  return (
    <>
      <AceEditor
        style={{
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "3px",
          borderColor: "lightgray"
        }}
        height={"200px"}
        width={"100%"}
        mode="json"
        theme="github"
        value={state}
        defaultValue={JSON.stringify(initialValue)}
        onChange={handleChange}
        name="json-editor"
        editorProps={{ $blockScrolling: true }}
      />
    </>
  );
}

function DisplayGeneratedData({ data }) {
  let displayValue;
  try {
    displayValue = JSON.stringify(data, null, "  ");
  } catch (e) {
    displayValue = data;
  }

  return (
    <>
      <p
        style={{
          marginTop: "10px"
        }}
      >
        Example: {displayValue}
      </p>
    </>
  );
}
