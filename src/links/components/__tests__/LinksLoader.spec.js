/* eslint-disable quotes */
import React from "react";
import { render } from "../../../test/render";
import { LinksLoader } from "../LinksLoader";

describe("<LinksLoader />", () => {
  it("renders LinksLoader", async () => {
    const fetchLinks = jest.fn();
    const clearLinks = jest.fn();
    const linksQuery = "foo";
    const { container } = render(
      <LinksLoader
        fetchLinks={fetchLinks}
        clearLinks={clearLinks}
        linksQuery={linksQuery}
      />,
      {}
    );

    expect(container).toMatchSnapshot();
    expect(fetchLinks).toHaveBeenCalledTimes(2);
    expect(fetchLinks.mock.calls[1][0]).toEqual(linksQuery);
  });
});
