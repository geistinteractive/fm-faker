import React, { useState } from "react";
import useForm from "react-hook-form";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Label
} from "reactstrap";
import { VSpace } from "../Utilities";

export default function TableForm({ onSave, data }) {
  const { minimum, maximum } = data;

  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: "onChange"
  });
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit = data => {
    onSave(data);
    reset();
    setIsOpen(false);
  };

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      Generate
      <Button
        size="sm"
        color="link"
        id="Popover1"
      >{`${minimum} to ${maximum} records`}</Button>
      <Popover
        color="info"
        placement="bottom"
        isOpen={isOpen}
        target="Popover1"
        toggle={toggle}
      >
        <PopoverHeader>Edit Number of Records</PopoverHeader>
        <PopoverBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="Minimum">Minimum</Label>
              <Input
                defaultValue={data.minimum}
                type="number"
                name="minimum"
                innerRef={register}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Maximum">Maximum</Label>
              <Input
                defaultValue={data.maximum}
                type="number"
                name="maximum"
                innerRef={register}
              />
            </FormGroup>
            <Button
              size="sm"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>{" "}
            <Button
              className="float-right"
              color="success"
              size="sm"
              type="submit"
            >
              Save
            </Button>
            <VSpace height="10px" />
          </Form>
        </PopoverBody>
      </Popover>
    </>
  );
}
