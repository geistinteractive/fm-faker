import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "reactstrap";
import FieldTypeEditor from "./TypeEditor";

export default function EditTypeField({
  schema,
  schemaOverride,
  onValidChange,
  fieldName
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState();
  const [saveDisabled, setSaveDisabled] = useState(true);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function cancel() {
    close();
  }

  function save() {
    if (newValue) {
      // only update if there is a newValue
      onValidChange(newValue);
    }
    close();
  }

  function handleValidChange(value) {
    setNewValue(value);
    setSaveDisabled(false);
  }
  function handleInValidChange(value) {
    setSaveDisabled(true);
  }

  if (!schema) return null;

  let fakerOrChance = "faker";
  let desc = schema[fakerOrChance];

  if (!desc) {
    fakerOrChance = "chance";
    desc = schema[fakerOrChance];
  }

  if (!desc) {
    fakerOrChance = null;
  }

  let enumValue = false;
  if (!fakerOrChance) {
    if (schema["enum"]) {
      enumValue = true;
      desc = " - Enum " + schema["enum"].join(", ");
    }
  }

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalHeader>Edit Schema for "{fieldName}"</ModalHeader>
        <ModalBody>
          <Info />
          <FieldTypeEditor
            initialValue={schema}
            onValidChange={handleValidChange}
            onInvalidChange={handleInValidChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={cancel}>
            Cancel
          </Button>{" "}
          <Button disabled={saveDisabled} color="primary" onClick={save}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
      <Button
        style={{ padding: "0px", fontSize: "small", textAlign: "left" }}
        size="sm"
        color="link"
        onClick={open}
      >
        {schema.type}
        {schemaLabel(schema)}
      </Button>
    </>
  );
}

function Info() {
  return (
    <p className="text-muted small">
      This uses{" "}
      <a href="https://json-schema-faker.js.org/" target="_blank">
        JSON Schema Faker
      </a>{" "}
      to generate random data. In addition to the{" "}
      <a href="http://marak.github.io/faker.js/" target="_blank">
        Faker
      </a>{" "}
      and{" "}
      <a href="https://chancejs.com/" target="_blank">
        Chance
      </a>{" "}
      generators it has custom generators built specifically for FileMaker.
    </p>
  );
}

function schemaLabel(schema) {
  if (schema.jsonPath) {
    return "JSON Path";
  }

  let fakerOrChance = "faker";
  let desc = schema[fakerOrChance];

  if (!desc) {
    fakerOrChance = "chance";
    desc = schema[fakerOrChance];
  }

  if (!desc) {
    fakerOrChance = null;
  }

  let enumValue = false;
  if (!fakerOrChance) {
    if (schema["enum"]) {
      enumValue = true;
      desc = " - Enum " + schema["enum"].join(", ");
    }
  }

  if (fakerOrChance) {
    return (
      " - " + fakerOrChance + (desc ? "." + desc : "") + (enumValue ? desc : "")
    );
  }

  if (schema["fm-timestamp"]) {
    const settings = schema["fm-timestamp"];
    let note = "";
    if (settings.range) {
      note = "- range";
    } else if (settings.relativeDays) {
      note = " - relative";
    }
    return " - FM Timestamp" + note;
  }

  if (schema["fm-date"] !== undefined) {
    const settings = schema["fm-date"];
    let note = "";
    if (settings.range) {
      note = " - range";
    } else if (settings.relativeDays) {
      note = " - relative";
    }
    return " - FM Date" + note;
  }

  if (schema["fm-time"] !== undefined) {
    const settings = schema["fm-time"];
    let note = "";
    if (settings.range) {
      note = " - range";
    }
    return " - FM Time" + note;
  }

  if (schema["fm-related"] !== undefined) {
    const settings = schema["fm-related"];
    const { field, table } = settings;
    return `${table}::${field}`;
  }
}
