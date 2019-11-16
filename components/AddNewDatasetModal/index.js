import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Alert
} from "reactstrap";
import XMLDropZone from "../XMLDropZone";
import { saveNewDataSet } from "../../client-api/dataset";

export default function AddNewDataSet({ isOpen, onValidSave, onCancel }) {
  const [showDropZone, setShowDropZone] = useState(true);
  const [file, setFile] = useState();

  function handleReceiveParsedFile(file) {
    setFile(file);
    setShowDropZone(false);
  }

  function reset() {
    setFile(null);
    setShowDropZone(true);
  }

  async function save() {
    reset();
    const result = await saveNewDataSet(file);
    onValidSave();
  }

  function cancel() {
    reset();
    onCancel();
  }

  return (
    <Modal toggle={onCancel} isOpen={isOpen}>
      <ModalHeader toggle={onCancel}>Create a new Data Set</ModalHeader>
      <ModalBody>
        <DisplayDropZone
          showDropZone={showDropZone}
          onReceiveParsedFile={handleReceiveParsedFile}
        />
        <DisplayParsedFile file={file} />
      </ModalBody>
      <ModalFooter>
        <DisplaySaveOption file={file} save={save} />
        <Button color="secondary" onClick={cancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

function DisplayDropZone({ showDropZone, onReceiveParsedFile }) {
  if (!showDropZone) return null;

  return (
    <>
      <p className="text-muted small">
        Drag the XML file you obtained from using the Save As XML Script Step
        onto the drag block below.
      </p>
      <XMLDropZone onReceiveParsedFile={onReceiveParsedFile} />
    </>
  );
}

function DisplaySaveOption({ file, save }) {
  if (!file) return null;

  return (
    <>
      <span className="text-muted small">
        Click "Save" to create a new Data Set from this file.
      </span>
      <Button color="primary" onClick={save}>
        Save
      </Button>
    </>
  );
}

function DisplayParsedFile({ file }) {
  if (!file) return null;

  const { name, tables } = file;

  return (
    <>
      <Alert fade={false} color="success">
        {`Aha! I found ${tables.length} FileMaker Tables in the file "${name}". Here they are:`}
      </Alert>

      <ul>
        {tables.map(table => {
          return <li key={table.name}>{table.name}</li>;
        })}
      </ul>
    </>
  );
}
