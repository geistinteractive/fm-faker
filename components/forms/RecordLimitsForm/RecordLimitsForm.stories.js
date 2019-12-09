import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import RecordLimitsForm from "./index";
import { Button } from "reactstrap";

export default {
  title: "RecordLimitsForm",
  component: RecordLimitsForm
};

const initialValues = {
  minimum: 30,
  maximum: 100
};

export const WithIntialValues = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: "40px 30%" }}>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Form
      </Button>
      <RecordLimitsForm
        open={open}
        defaultValues={initialValues}
        onSubmit={v => {
          setOpen(false);
          action("submitted")(v);
        }}
        onCancel={() => {
          setOpen(false);
          action("cancelled")();
        }}
      ></RecordLimitsForm>
    </div>
  );
};
