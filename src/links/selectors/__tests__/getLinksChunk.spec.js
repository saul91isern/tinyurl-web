import { getLinksChunk } from "..";

const links = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const linksPageSize = 10;
const activePage = 1;

describe("selectors: getLinksChunk", () => {
  it("should return its correspondig list chunk based on pagination", () => {
    const resPage1 = getLinksChunk({
      links,
      linksPageSize,
      activePage,
    });
    expect(resPage1).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const resPage2 = getLinksChunk({
      links,
      linksPageSize,
      activePage: 2,
    });
    expect(resPage2).toEqual([11]);
  });
});
