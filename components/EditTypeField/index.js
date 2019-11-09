import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "reactstrap";
import FieldTypeEditor from "../TypeEditor";

export default function EditTypeField({ value, onValidChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState("");

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
      onValidChange(newValue);
    } else {
      onValidChange(value);
    }
    close();
  }

  function handleValidChange(value) {
    setNewValue(value);
  }

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalHeader>Edit Field Faker</ModalHeader>
        <ModalBody>
          <p>You can use chance or faker type generators</p>
          <FieldTypeEditor
            initialValue={value}
            onValidChange={handleValidChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={cancel}>
            Cancel
          </Button>{" "}
          <Button color="primary" onClick={save}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
      <Button size="sm" color="link" onClick={open}>
        {value.type}
      </Button>
    </>
  );
}
