import { createLink, clearRedirect } from "../routines";

const redirect = (state = null, { type }) => {
  switch (type) {
    case createLink.SUCCESS:
      return "/";
    case clearRedirect.TRIGGER:
      return null;
    default:
      return state;
  }
};

export { redirect };
