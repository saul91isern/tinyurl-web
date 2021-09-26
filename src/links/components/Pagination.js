import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Pagination as SemanticPagination } from "semantic-ui-react";
import { connect } from "react-redux";
import { selectPage } from "../routines";

export const Pagination = ({ totalPages, activePage, selectPage }) => {
  return (
    <SemanticPagination
      activePage={activePage}
      disabled={totalPages <= 1}
      totalPages={totalPages}
      onPageChange={(_e, { activePage }) => selectPage(activePage)}
    />
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number,
  selectPage: PropTypes.func,
  totalPages: PropTypes.number,
};

const mapStateToProps = (state) => ({
  activePage: state.activePage,
  totalPages: Math.ceil(_.size(state.links || []) / state.linksPageSize),
});

const mapDispatchToProps = { selectPage };

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
