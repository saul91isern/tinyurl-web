import _ from "lodash/fp";
import { call, put, takeLatest } from "redux-saga/effects";
import pathToRegexp from "path-to-regexp";
import { apiDelete, apiGet, apiPost, JSON_OPTS } from "../../api";
import { createLink, deleteLink, fetchLinks } from "../routines";
import { API_LINK, API_LINKS } from "../api";

export function* fetchLinksSaga({ payload }) {
  try {
    const url = _.isEmpty(payload) ? API_LINKS : `${API_LINKS}?q=${payload}`;
    yield put(fetchLinks.request());
    const { data } = yield call(apiGet, url, JSON_OPTS);
    yield put(fetchLinks.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchLinks.failure({ status, data }));
    } else {
      yield put(fetchLinks.failure(error.message));
    }
  } finally {
    yield put(fetchLinks.fulfill());
  }
}

export function* fetchLinksRequestSaga() {
  yield takeLatest(fetchLinks.TRIGGER, fetchLinksSaga);
}

export function* createLinkSaga({ payload }) {
  try {
    const url = API_LINKS;
    yield put(createLink.request());
    const { data } = yield call(apiPost, url, { link: payload }, JSON_OPTS);
    yield put(createLink.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(createLink.failure({ status, data }));
    } else {
      yield put(createLink.failure(error.message));
    }
  } finally {
    yield put(createLink.fulfill());
  }
}

export function* createLinkRequestSaga() {
  yield takeLatest(createLink.TRIGGER, createLinkSaga);
}

export function* deleteLinkSaga({ payload }) {
  try {
    const url = pathToRegexp.compile(API_LINK)({ id: payload });
    yield put(deleteLink.request());
    yield call(apiDelete, url, JSON_OPTS);
    yield put(deleteLink.success());
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(deleteLink.failure({ status, data }));
    } else {
      yield put(deleteLink.failure(error.message));
    }
  } finally {
    yield put(deleteLink.fulfill());
  }
}

export function* deleteLinkRequestSaga() {
  yield takeLatest(deleteLink.TRIGGER, deleteLinkSaga);
}
