import { fetchLinks } from "../routines";

const linksLoading = (state = false, { type }) => {
  switch (type) {
    case fetchLinks.TRIGGER:
      return true;
    case fetchLinks.FULFILL:
      return false;
    default:
      return state;
  }
};

const links = (state = [], { type, payload }) => {
  switch (type) {
    case fetchLinks.TRIGGER:
      return [];
    case fetchLinks.SUCCESS:
      return payload.data;
    default:
      return state;
  }
};

export { links, linksLoading };
