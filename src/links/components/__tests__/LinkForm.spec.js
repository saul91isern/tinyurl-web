/* eslint-disable quotes */
import React from "react";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../test/render";
import { LinkForm } from "../LinkForm";

describe("<LinkForm />", () => {
  const createLink = jest.fn();
  it("matches last snapshot", async () => {
    const { container } = render(<LinkForm createLink={createLink} />, {});
    expect(container).toMatchSnapshot();
  });

  it("creates link on form submit", async () => {
    const { findByPlaceholderText, queryByText } = render(
      <LinkForm createLink={createLink} />,
      {}
    );
    expect(queryByText(/Submit/)).toBeTruthy();
    expect(queryByText(/Submit/)).toBeDisabled();

    userEvent.type(
      await findByPlaceholderText(/Enter a valid url/),
      "https://foo.com/bar"
    );

    await waitFor(() => expect(queryByText(/Submit/)).toBeEnabled());

    userEvent.click(await queryByText(/Submit/));

    await waitFor(() =>
      expect(createLink).toHaveBeenCalledWith({ url: "https://foo.com/bar" })
    );
  });
});
