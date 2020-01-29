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
import findChanges from "./findChanges";

export default function UpdateDataSet({
  isOpen,
  onValidSave,
  onCancel,
  oldData
}) {
  const [showDropZone, setShowDropZone] = useState(true);
  const [changes, setChanges] = useState([]);

  function handleReceiveParsedFile(file) {
    const foundChanges = findChanges(oldData, file);
    setChanges(foundChanges);
    setShowDropZone(false);
  }

  function reset() {
    setChanges([]);
    setShowDropZone(true);
  }

  async function save() {
    reset();
    onValidSave(changes);
  }

  function cancel() {
    reset();
    onCancel();
  }

  return (
    <Modal toggle={cancel} isOpen={isOpen}>
      <ModalHeader toggle={cancel}>Update Data Set</ModalHeader>
      <ModalBody>
        <DisplayDropZone
          showDropZone={showDropZone}
          onReceiveParsedFile={handleReceiveParsedFile}
        />
        <DisplayNoChangesFound show={changes.length === 0 && !showDropZone} />
        <DisplayChanges changes={changes} />
      </ModalBody>
      <ModalFooter>
        <DisplaySaveOption changes={changes} save={save} />
        <Button color="secondary" onClick={cancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

function DisplayNoChangesFound({ show = false }) {
  if (show) {
    return (
      <div>
        <Alert fade={false} color="info">
          There were no changes found.
        </Alert>
      </div>
    );
  }
  return null;
}

function DisplayDropZone({ showDropZone, onReceiveParsedFile }) {
  if (!showDropZone) return null;

  return (
    <>
      <p className="text-muted small">
        Drag the XML file you obtained from using the Save As XML Script Step
        onto the drag block below. This process will merge the changes into the
        previous version.
      </p>
      <XMLDropZone onReceiveParsedFile={onReceiveParsedFile} />
    </>
  );
}

function DisplaySaveOption({ changes, save }) {
  if (changes.length === 0) return null;

  return (
    <>
      <span className="text-muted small">
        Click "Save" to udate the data set.
      </span>
      <Button color="primary" onClick={save}>
        Save
      </Button>
    </>
  );
}

function DisplayChanges({ changes }) {
  if (changes.length === 0) return null;

  return (
    <>
      <Alert fade={false} color="success">
        {`Aha! I found ${changes.length} FileMaker Tables that where changed`}
      </Alert>
      <ul>
        {changes.map(table => {
          return (
            <li key={table.name}>
              "{table.name}" was
              {table.type === "mod"
                ? " modified"
                : table.type === "delete"
                ? " deleted"
                : " added"}
            </li>
          );
        })}
      </ul>
    </>
  );
}
