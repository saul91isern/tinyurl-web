import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store";
import { AppRoutes } from "./links/components";
import "semantic-ui-css/semantic.min.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
