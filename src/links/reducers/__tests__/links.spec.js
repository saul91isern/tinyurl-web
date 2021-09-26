import { createLink, deleteLink, fetchLinks } from "../../routines";
import { linksLoading, createLinkLoading, deleteLinkLoading, links } from "..";

const fooState = { foo: "bar" };

describe("reducers: linksLoading", () => {
  it("should provide the initial state", () => {
    expect(linksLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the TRIGGER action", () => {
    expect(linksLoading(false, { type: fetchLinks.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the FULFILL action", () => {
    expect(linksLoading(true, { type: fetchLinks.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(linksLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});

describe("reducers: createLinkLoading", () => {
  it("should provide the initial state", () => {
    expect(createLinkLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the TRIGGER action", () => {
    expect(createLinkLoading(false, { type: createLink.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the FULFILL action", () => {
    expect(createLinkLoading(true, { type: createLink.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(createLinkLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});

describe("reducers: deleteLinkLoading", () => {
  it("should provide the initial state", () => {
    expect(deleteLinkLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the TRIGGER action", () => {
    expect(deleteLinkLoading(false, { type: deleteLink.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the FULFILL action", () => {
    expect(deleteLinkLoading(true, { type: deleteLink.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(deleteLinkLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});

describe("reducers: links", () => {
  it("should provide the initial state", () => {
    expect(links(undefined, {})).toEqual([]);
  });

  it("should be state after TRIGGER action", () => {
    expect(links(fooState, { type: fetchLinks.TRIGGER })).toEqual(fooState);
  });

  it("should be informed on SUCCESS", () => {
    const data = [{ hash: "foo", url: "http://foo/bar" }];
    expect(
      links(undefined, {
        type: fetchLinks.SUCCESS,
        payload: { data },
      })
    ).toEqual(data);
  });

  it("should ignore unhandled actions", () => {
    expect(links(fooState, { type: "FOO" })).toEqual(fooState);
  });
});
