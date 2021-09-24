import { setQuery } from "../routines";

const linksQuery = (state = null, { type, payload }) => {
  switch (type) {
    case setQuery.TRIGGER:
      return payload;
    default:
      return state;
  }
};

export { linksQuery };
