import { deleteLink, createLink, clearRedirect } from "../../routines";
import { redirect } from "..";

const fooState = { foo: "bar" };

describe("reducers: redirect", () => {
  it("should provide the initial state", () => {
    expect(redirect(undefined, {})).toBeNull();
  });

  it("should return route after createLink.SUCCESS action", () => {
    expect(redirect(false, { type: createLink.SUCCESS })).toEqual("/");
  });

  it("should return route after deleteLink.SUCCESS action", () => {
    expect(redirect(false, { type: deleteLink.SUCCESS })).toEqual("/");
  });

  it("should return route after deleteLink.TRIGGER action", () => {
    expect(redirect(false, { type: clearRedirect.TRIGGER })).toBeNull();
  });

  it("should ignore unhandled actions", () => {
    expect(redirect(fooState, { type: "FOO" })).toBe(fooState);
  });
});
