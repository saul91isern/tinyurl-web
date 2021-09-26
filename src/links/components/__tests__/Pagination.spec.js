/* eslint-disable quotes */
import React from "react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../test/render";
import { Pagination } from "../Pagination";

describe("<Pagination />", () => {
  it("renders Pagination", async () => {
    const totalPages = 10;
    const activePage = 1;
    const selectPage = jest.fn();
    const { queryByText, container } = render(
      <Pagination
        totalPages={totalPages}
        activePage={activePage}
        selectPage={selectPage}
      />,
      {}
    );
    expect(container).toMatchSnapshot();
    expect(queryByText(/3/)).toBeTruthy();
    userEvent.click(await queryByText(/3/));
    expect(selectPage).toHaveBeenCalledWith(3);
  });
});
