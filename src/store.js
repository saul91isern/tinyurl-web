import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import * as reducers from "./reducers";
import sagas from "./sagas";

const combinedReducers = combineReducers(Object.assign({}, reducers));

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);
