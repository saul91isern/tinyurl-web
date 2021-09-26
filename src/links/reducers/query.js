import { fetchLinks, selectPage, setQuery } from "../routines";

const defaultLinksQuery = null;

const linksQuery = (state = defaultLinksQuery, { type, payload }) => {
  switch (type) {
    case setQuery.TRIGGER:
      return payload;
    default:
      return state;
  }
};

const defaultActivePage = 1;

const activePage = (state = defaultActivePage, { type, payload }) => {
  switch (type) {
    case selectPage.TRIGGER:
      return payload;
    case fetchLinks.REQUEST:
      return 1;
    default:
      return state;
  }
};

const linksPageSize = (state = 10) => state;

export { activePage, linksQuery, linksPageSize };
