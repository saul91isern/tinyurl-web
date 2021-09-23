import _ from "lodash/fp";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import isURL from "validator/lib/isURL";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createLink } from "../routines";

export const LinkForm = ({ createLink }) => {
  const { handleSubmit, control, formState } = useForm({
    mode: "all",
    defaultValues: {
      url: "",
    },
  });
  const onSubmit = (value) => createLink(value);
  const { errors, isDirty } = formState;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="url"
        rules={{
          required: "Field url is required",
          maxLength: {
            value: 2048,
            message:
              "The url is too big. Maximum supported length of 2048 characters",
          },
          validate: (value) => isURL(value) || "Invalid url format",
        }}
        render={({ field: { onChange, value } }) => (
          <Form.Input
            id="url"
            fluid
            autoComplete="off"
            required
            label={"Url"}
            placeholder={"Enter a valid url"}
            onChange={(_e, { value }) => onChange(value)}
            error={
              isDirty &&
              !_.isNil(errors?.url?.message) && {
                content: errors.url.message,
                pointing: "below",
              }
            }
            value={value || ""}
          />
        )}
      />
      <Button type="submit" disabled={!_.isEmpty(errors) || !isDirty}>
        Submit
      </Button>
    </Form>
  );
};

LinkForm.propTypes = {
  createLink: PropTypes.func,
};

const mapDispatchToProps = { createLink };

export default connect(null, mapDispatchToProps)(LinkForm);
