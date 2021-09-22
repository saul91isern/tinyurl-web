import React from "react";
import { Button, Form } from "semantic-ui-react";

export const LinkForm = () => (
  <Form>
    <Form.Field>
      <label>URL</label>
      <input placeholder="Valid url" />
    </Form.Field>
    <Button type="submit">Submit</Button>
  </Form>
);

export default LinkForm;
