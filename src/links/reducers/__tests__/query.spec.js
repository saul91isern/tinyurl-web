import { fetchLinks, selectPage, setQuery } from "../../routines";
import { activePage, linksPageSize, linksQuery } from "..";

const fooState = { foo: "bar" };

describe("reducers: linksQuery", () => {
  it("should provide the initial state", () => {
    expect(linksQuery(undefined, {})).toBeNull();
  });

  it("should return query after receiving the TRIGGER action", () => {
    const payload = "query";
    expect(linksQuery(false, { type: setQuery.TRIGGER, payload })).toEqual(
      payload
    );
  });

  it("should ignore unhandled actions", () => {
    expect(linksQuery(fooState, { type: "FOO" })).toBe(fooState);
  });
});

describe("reducers: activePage", () => {
  it("should provide the initial state", () => {
    expect(activePage(undefined, {})).toBe(1);
  });

  it("should return query after receiving the selectPage.TRIGGER action", () => {
    const payload = 2;
    expect(
      activePage(undefined, { type: selectPage.TRIGGER, payload })
    ).toEqual(payload);
  });

  it("should return default state after  selectPage.TRIGGER action", () => {
    expect(activePage(undefined, { type: fetchLinks.REQUEST })).toBe(1);
  });

  it("should ignore unhandled actions", () => {
    expect(activePage(fooState, { type: "FOO" })).toBe(fooState);
  });
});

describe("reducers: linksPageSize", () => {
  it("should provide the initial state", () => {
    expect(linksPageSize(undefined, {})).toBe(10);
  });
});
