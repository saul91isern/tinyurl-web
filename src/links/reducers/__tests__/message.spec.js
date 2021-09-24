import {
  createLink,
  deleteLink,
  dismissAlert,
  fetchLinks,
} from "../../routines";
import { message } from "..";

const fooState = { foo: "bar" };

describe("reducers: message", () => {
  it("should provide the initial state", () => {
    expect(message(undefined, {})).toEqual({});
  });

  it("should return default message under known status code after fetchLinks.FAILURE action", () => {
    expect(
      message(undefined, { type: fetchLinks.FAILURE, payload: { status: 500 } })
    ).toEqual({
      header: "Unexpected error",
      text: "Our support team is working on it...",
      error: true,
    });
  });

  it("should return message if provided under fetchLinks.FAILURE action", () => {
    expect(
      message(undefined, {
        type: fetchLinks.FAILURE,
        payload: "foo",
      })
    ).toEqual({ header: "An error occurred...", text: "foo", error: true });
  });

  it("should return unknown error under fetchLinks.FAILURE action", () => {
    expect(
      message(undefined, {
        type: fetchLinks.FAILURE,
        payload: { status: 1000 },
      })
    ).toEqual({
      header: "Unknown error..",
      text: "We are working to identify the problem",
      error: true,
    });
  });

  it("should return message after createLink.SUCCESS action", () => {
    expect(message(undefined, { type: createLink.SUCCESS })).toEqual({
      header: "Succes",
      text: "New url created",
      success: true,
    });
  });

  it("should return default message under known status code after createLink.FAILURE action", () => {
    expect(
      message(undefined, { type: createLink.FAILURE, payload: { status: 303 } })
    ).toEqual({
      header: "Operation rejected",
      text: "It seems that the requested url is already shortened",
      info: true,
    });
  });

  it("should return message after deleteLink.SUCCESS action", () => {
    expect(message(undefined, { type: deleteLink.SUCCESS })).toEqual({
      header: "Succes",
      text: "Url deleted",
      success: true,
    });
  });

  it("should return default message under known status code after deleteLink.FAILURE action", () => {
    expect(
      message(undefined, { type: deleteLink.FAILURE, payload: { status: 404 } })
    ).toEqual({
      header: "Resource not found",
      text: "The requested resource does not exist or is currently unavialabe",
      error: true,
    });
  });

  it("should return route after dismissAlert.TRIGGER action", () => {
    expect(message(undefined, { type: dismissAlert.TRIGGER })).toEqual({});
  });

  it("should ignore unhandled actions", () => {
    expect(message(fooState, { type: "FOO" })).toBe(fooState);
  });
});
