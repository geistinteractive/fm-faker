import React from "react";
import useFormContext from "react-hook-form";
import { FormGroup, Input, Label, FormFeedback, FormText } from "reactstrap";

export default function AppInputGroup(props) {
  const { helpText, label, errors, defaultValues, name, ...rest } = props;

  const defaultValue = defaultValues[name];
  const error = errors[name] || null;

  const errorMsg = error ? error.message : undefined;
  const invalid = errorMsg !== undefined;

  const inputProps = { name, invalid, defaultValue, ...rest };

  return (
    <FormGroup>
      <Label for="Minimum">{label}</Label>
      <Input {...inputProps} />
      <FormFeedback>{errorMsg}</FormFeedback>
      {helpText && !errorMsg ? <FormText>{helpText}</FormText> : null}
    </FormGroup>
  );
}
