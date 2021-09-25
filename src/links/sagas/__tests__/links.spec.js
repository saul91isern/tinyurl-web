import { compile } from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiDelete, apiGet, apiPost, JSON_OPTS } from "../../../api";
import {
  createLinkSaga,
  createLinkRequestSaga,
  deleteLinkSaga,
  deleteLinkRequestSaga,
  fetchLinksSaga,
  fetchLinksRequestSaga,
} from "../links";
import { createLink, deleteLink, fetchLinks } from "../../routines";
import { API_LINK, API_LINKS } from "../../api";

describe("sagas: fetchLinksRequestSaga", () => {
  it("should invoke fetchLinksSaga on trigger", () => {
    expect(() => {
      testSaga(fetchLinksRequestSaga)
        .next()
        .takeLatest(fetchLinks.TRIGGER, fetchLinksSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchLinksRequestSaga).next().takeLatest("FOO", fetchLinksSaga);
    }).toThrow();
  });
});

describe("sagas: fetchLinksSaga", () => {
  const url = API_LINKS;
  const data = [{ url: "https://foo/bar" }];

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchLinksSaga, {})
        .next()
        .put(fetchLinks.request())
        .next()
        .call(apiGet, url, JSON_OPTS)
        .next({ data })
        .put(fetchLinks.success(data))
        .next()
        .put(fetchLinks.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a success action when query is provided", () => {
    const payload = "hash";
    const url = `${API_LINKS}?q=${payload}`;
    expect(() => {
      testSaga(fetchLinksSaga, { payload: "hash" })
        .next()
        .put(fetchLinks.request())
        .next()
        .call(apiGet, url, JSON_OPTS)
        .next({ data })
        .put(fetchLinks.success(data))
        .next()
        .put(fetchLinks.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call throws an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchLinksSaga, {})
        .next()
        .put(fetchLinks.request())
        .next()
        .call(apiGet, url, JSON_OPTS)
        .throw(error)
        .put(fetchLinks.failure(message))
        .next()
        .put(fetchLinks.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action status and message is provided", () => {
    const response = { status: 404, data: "foo" };
    const error = { response };

    expect(() => {
      testSaga(fetchLinksSaga, {})
        .next()
        .put(fetchLinks.request())
        .next()
        .call(apiGet, url, JSON_OPTS)
        .throw(error)
        .put(fetchLinks.failure(response))
        .next()
        .put(fetchLinks.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});

describe("sagas: createLinkRequestSaga", () => {
  it("should invoke createLinkSaga on trigger", () => {
    expect(() => {
      testSaga(createLinkRequestSaga)
        .next()
        .takeLatest(createLink.TRIGGER, createLinkSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(createLinkRequestSaga).next().takeLatest("FOO", createLinkSaga);
    }).toThrow();
  });
});

describe("sagas: createLinkSaga", () => {
  const url = API_LINKS;
  const hash = "bar";
  const urlLink = "https://foo/bar";
  const payload = { url: urlLink, hash };
  const data = { id: 1, ...payload };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(createLinkSaga, { payload })
        .next()
        .put(createLink.request())
        .next()
        .call(apiPost, url, { link: payload }, JSON_OPTS)
        .next({ data })
        .put(createLink.success(data))
        .next()
        .put(createLink.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call throws an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(createLinkSaga, { payload })
        .next()
        .put(createLink.request())
        .next()
        .call(apiPost, url, { link: payload }, JSON_OPTS)
        .throw(error)
        .put(createLink.failure(message))
        .next()
        .put(createLink.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action status and message is provided", () => {
    const response = { status: 404, data: "foo" };
    const error = { response };

    expect(() => {
      testSaga(createLinkSaga, { payload })
        .next()
        .put(createLink.request())
        .next()
        .call(apiPost, url, { link: payload }, JSON_OPTS)
        .throw(error)
        .put(createLink.failure(response))
        .next()
        .put(createLink.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});

describe("sagas: deleteLinkRequestSaga", () => {
  it("should invoke deleteLinkSaga on trigger", () => {
    expect(() => {
      testSaga(deleteLinkRequestSaga)
        .next()
        .takeLatest(deleteLink.TRIGGER, deleteLinkSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(deleteLinkRequestSaga).next().takeLatest("FOO", deleteLinkSaga);
    }).toThrow();
  });
});

describe("sagas: deleteLinkSaga", () => {
  const payload = "hash";
  const url = compile(API_LINK)({ id: payload });

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(deleteLinkSaga, { payload })
        .next()
        .put(deleteLink.request())
        .next()
        .call(apiDelete, url, JSON_OPTS)
        .next()
        .put(deleteLink.success())
        .next()
        .put(deleteLink.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call throws an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(deleteLinkSaga, { payload })
        .next()
        .put(deleteLink.request())
        .next()
        .call(apiDelete, url, JSON_OPTS)
        .throw(error)
        .put(deleteLink.failure(message))
        .next()
        .put(deleteLink.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action status and message is provided", () => {
    const response = { status: 404, data: "foo" };
    const error = { response };

    expect(() => {
      testSaga(deleteLinkSaga, { payload })
        .next()
        .put(deleteLink.request())
        .next()
        .call(apiDelete, url, JSON_OPTS)
        .throw(error)
        .put(deleteLink.failure(response))
        .next()
        .put(deleteLink.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
