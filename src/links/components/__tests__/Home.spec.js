/* eslint-disable quotes */
import React from "react";
import { render } from "../../../test/render";
import { Home } from "../Home";

describe("<Home />", () => {
  it("renders Home when not loading", async () => {
    const { container, queryByText } = render(<Home loading={false} />, {
      state: { links: [], message: {} },
    });
    expect(queryByText(/My first url shortener/)).toBeTruthy();
    expect(queryByText(/URL Shortener/)).toBeTruthy();
    expect(queryByText(/Add New Url/)).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
