import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

const customRender = (component, { state = {}, ...renderOptions }) => {
  const store = createStore(() => state);
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  }
  return render(component, { wrapper: Wrapper, ...renderOptions });
};

export { customRender as render };
