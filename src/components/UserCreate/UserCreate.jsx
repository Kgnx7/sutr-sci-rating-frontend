import React from "react";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";

export default function MyForm(props) {
  const { initialValues } = props;

  // yes, this can even be async!
  async function onSubmit(values) {
    console.log(values);
  }

  // yes, this can even be async!
  async function validate(values) {
    if (!values.hello) {
      return { hello: "Saying hello is nice." };
    }
    return;
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <TextField label="Hello world" name="hello" required={true} />
          <pre>{JSON.stringify(values)}</pre>
        </form>
      )}
    />
  );
}
