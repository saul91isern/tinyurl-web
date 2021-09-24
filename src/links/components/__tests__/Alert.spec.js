/* eslint-disable quotes */
import React from "react";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../test/render";
import { Alert } from "../Alert";

describe("<Alert />", () => {
  const defaultMessage = { text: "foo", header: "bar", succes: true };
  const dismissAlert = jest.fn();
  it("renders success message", async () => {
    const { container, queryByText } = render(
      <Alert message={defaultMessage} dismissAlert={dismissAlert} />,
      {}
    );
    expect(queryByText(/foo/)).toBeTruthy();
    expect(queryByText(/bar/)).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it("renders error message", async () => {
    const message = { text: "baz", header: "xyz", error: true };
    const { container, queryByText } = render(
      <Alert message={message} dismissAlert={dismissAlert} />,
      {}
    );
    expect(queryByText(/baz/)).toBeTruthy();
    expect(queryByText(/xyz/)).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it("calls dismissAlert onDismiss", async () => {
    const { container } = render(
      <Alert message={defaultMessage} dismissAlert={dismissAlert} />,
      {}
    );
    userEvent.click(container.querySelector('[class="close icon"]'));
    await waitFor(() => expect(dismissAlert).toHaveBeenCalledTimes(1));
  });
});
