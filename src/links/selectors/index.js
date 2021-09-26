import _ from "lodash/fp";
import { createSelector } from "reselect";

const getLinks = _.propOr([], "links");
const getLinksPageSize = _.prop("linksPageSize");
const getActivePage = _.propOr(1, "activePage");

export const getLinksChunk = createSelector(
  [getLinks, getLinksPageSize, getActivePage],
  (links, itemsPerPage, activePage) => {
    const offset = (activePage - 1) * itemsPerPage;
    return _.slice(offset, offset + itemsPerPage)(links);
  }
);
