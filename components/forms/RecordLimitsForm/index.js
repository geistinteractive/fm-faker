import React from "react";
import useForm from "react-hook-form";
import {
  Form,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";

import AppInputGroup from "../utils/AppInputGroup";

export default function({ open, defaultValues, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    errors,
    getValues,
    formState
  } = useForm({
    mode: "onChange"
  });

  const formProps = { defaultValues, errors };

  function handleCancel() {
    reset();
    onCancel();
  }

  return (
    <Modal isOpen={open}>
      <ModalHeader>Hello</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/**
           * ============================================
           */}
          <AppInputGroup
            name="minimum"
            helpText="The minimum numbers of records to create."
            label="Minimum"
            type="number"
            innerRef={register({
              required: "minimum is required",
              min: { value: 0, message: "Must be greater than 0" },
              validate: value => {
                const allValues = getValues();
                if (Number(allValues["maximum"]) < Number(value)) {
                  return "Minimum must be less than or equal to Maximum";
                }
                return null;
              }
            })}
            {...formProps}
          ></AppInputGroup>
          {/**
           * ============================================
           */}
          <AppInputGroup
            name="maximum"
            helpText="The Maximum numbers of records to create."
            label="Maximum"
            type="number"
            innerRef={register({
              required: "Maximum is required",
              validate: value => {
                const allValues = getValues();
                if (Number(allValues["minimum"]) > Number(value)) {
                  return "Maximum must be greater than or equal to Minimum";
                }
                return null;
              }
            })}
            {...formProps}
          ></AppInputGroup>
          {/**
           * ============================================
           */}
          <Button
            disabled={!formState.isValid}
            className="float-right"
            color="success"
            size="sm"
            type="submit"
          >
            Save
          </Button>
          <Button
            style={{ marginRight: "12px" }}
            className="float-right"
            size="sm"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
}
