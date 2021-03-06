import { createLink, deleteLink, fetchLinks } from "../routines";

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

const createLinkLoading = (state = false, { type }) => {
  switch (type) {
    case createLink.TRIGGER:
      return true;
    case createLink.FULFILL:
      return false;
    default:
      return state;
  }
};

const deleteLinkLoading = (state = false, { type }) => {
  switch (type) {
    case deleteLink.TRIGGER:
      return true;
    case deleteLink.FULFILL:
      return false;
    default:
      return state;
  }
};

const links = (state = [], { type, payload }) => {
  switch (type) {
    case fetchLinks.TRIGGER:
      return state;
    case fetchLinks.SUCCESS:
      return payload.data;
    default:
      return state;
  }
};

export { createLinkLoading, deleteLinkLoading, links, linksLoading };
