/* eslint-disable quotes */
import React from "react";
import { render } from "../../../test/render";
import { Redirector } from "../Redirector";

describe("<Redirector />", () => {
  it("renders Redirector", async () => {
    const clearRedirect = jest.fn();
    const { container } = render(
      <Redirector redirect={"foo"} clearRedirect={clearRedirect} />,
      {}
    );
    expect(container).toMatchSnapshot();
  });
});
