import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default function DeleteDataSetButton({ onDeleteConfirmed }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const confirmDelete = () => {
    onDeleteConfirmed();
    setModal(false);
  };

  const cancel = () => {
    setModal(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setModal(true);
        }}
        size="sm"
        color="link"
      >
        Delete
      </Button>
      <Modal returnFocusAfterClose={false} isOpen={modal}>
        <ModalHeader>Delete?</ModalHeader>
        <ModalBody>Are you certain you want to delete this file set?</ModalBody>
        <ModalFooter>
          <Button color="light" onClick={cancel}>
            No, Cancel
          </Button>{" "}
          <Button onClick={confirmDelete} color="danger">
            Yes, Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
