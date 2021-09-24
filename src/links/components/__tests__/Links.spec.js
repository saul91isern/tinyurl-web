/* eslint-disable quotes */
import React from "react";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../test/render";
import { Links } from "../Links";

describe("<Links />", () => {
  const loading = false;
  const deleteLink = jest.fn();
  const setQuery = jest.fn();
  const linksQuery = "";
  const links = [
    { url: "http://foo/bar", hash: "FOO" },
    { url: "http://baz/xyz", hash: "BAR" },
  ];

  it("renders links when not empty", async () => {
    const { container, queryByText } = render(
      <Links
        loading={loading}
        deleteLink={deleteLink}
        links={links}
        setQuery={setQuery}
        linksQuery={linksQuery}
      />,
      {}
    );
    expect(queryByText(/http:\/\/foo\/bar/)).toBeTruthy();
    expect(queryByText(/http:\/\/baz\/xyz/)).toBeTruthy();
    expect(queryByText(/FOO/)).toBeTruthy();
    expect(queryByText(/BAR/)).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it("renders message on empty links", async () => {
    const { container, queryByText } = render(
      <Links
        loading={loading}
        deleteLink={deleteLink}
        links={[]}
        setQuery={setQuery}
        linksQuery={linksQuery}
      />,
      {}
    );
    expect(queryByText(/http:\/\/foo\/bar/)).toBeFalsy();
    expect(queryByText(/http:\/\/baz\/xyz/)).toBeFalsy();
    expect(queryByText(/FOO/)).toBeFalsy();
    expect(queryByText(/BAR/)).toBeFalsy();
    expect(queryByText(/Maybe you want shorten a new url first./)).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it("renders Loader if loading", async () => {
    const { container } = render(
      <Links
        loading={true}
        deleteLink={deleteLink}
        links={[]}
        setQuery={setQuery}
        linksQuery={linksQuery}
      />,
      {}
    );
    expect(container.querySelector('[class="ui loader"]')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it("sets query on input change", async () => {
    const { findByPlaceholderText } = render(
      <Links
        loading={false}
        deleteLink={deleteLink}
        links={links}
        setQuery={setQuery}
        linksQuery={linksQuery}
      />,
      {}
    );
    userEvent.type(await findByPlaceholderText(/Search/), "q");
    await waitFor(() => expect(setQuery).toHaveBeenCalledWith("q"));
  });

  it("calls deleteLink on icon delete click", async () => {
    const { container } = render(
      <Links
        loading={false}
        deleteLink={deleteLink}
        links={links}
        setQuery={setQuery}
        linksQuery={linksQuery}
      />,
      {}
    );
    userEvent.click(await container.querySelector('[class="trash link icon"]'));
    expect(deleteLink).toHaveBeenCalledWith(links[0]?.hash);
  });
});
