import { all } from "redux-saga/effects";
import appSagas from "./links/sagas";

export default function* sagas() {
  yield all([...appSagas]);
}
