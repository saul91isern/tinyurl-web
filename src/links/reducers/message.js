import _ from "lodash/fp";
import { createLink, deleteLink, dismissAlert, fetchLinks } from "../routines";

const genericErrors = {
  303: {
    header: "Operation rejected",
    text: "It seems that the requested url is already shortened",
    info: true,
  },
  404: {
    header: "Resource not found",
    text: "The requested resource does not exist or is currently unavialabe",
    error: true,
  },
  500: {
    header: "Unexpected error",
    text: "Our support team is working on it...",
    error: true,
  },
};

const unknown = {
  header: "Unknown error..",
  text: "We are working to identify the problem",
  error: true,
};

const message = (state = {}, { type, payload }) => {
  switch (type) {
    case fetchLinks.FAILURE: {
      const status = payload?.status;
      return _.isString(payload)
        ? { header: "An error occurred...", text: payload, error: true }
        : _.flow(_.prop(status), _.defaultTo(unknown))(genericErrors);
    }
    case createLink.SUCCESS:
      return { header: "Succes", text: "New url created", success: true };
    case createLink.FAILURE:
      return defaultFailureFormat(payload);
    case deleteLink.SUCCESS:
      return { header: "Succes", text: "Url deleted", success: true };
    case deleteLink.FAILURE:
      return defaultFailureFormat(payload);
    case dismissAlert.TRIGGER:
      return {};
    default:
      return state;
  }
};

const defaultFailureFormat = (payload) => {
  const status = payload?.status;
  return _.flow(_.prop(status), _.defaultTo(unknown))(genericErrors);
};

export { message };
