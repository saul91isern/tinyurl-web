import { call, put, takeLatest } from "redux-saga/effects";
import { apiJson, JSON_OPTS } from "api";
import { fetchLinks } from "../routines";
import { API_LINKS } from "../api";

export function* fetchLinksSaga() {
  try {
    const url = API_LINKS;
    yield put(fetchLinks.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
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

export default fetchLinksRequestSaga;
