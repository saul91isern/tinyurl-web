import { setQuery } from "../../routines";
import { linksQuery } from "..";

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
