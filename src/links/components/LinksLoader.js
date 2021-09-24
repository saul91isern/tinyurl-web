import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearLinks, fetchLinks } from "../routines";

export const LinksLoader = ({ linksQuery, clearLinks, fetchLinks }) => {
  useEffect(() => {
    fetchLinks();
    return () => {
      clearLinks();
    };
  }, [clearLinks, fetchLinks]);
  useEffect(() => {
    fetchLinks(linksQuery);
  }, [linksQuery, fetchLinks]);
  return null;
};

LinksLoader.propTypes = {
  clearLinks: PropTypes.func,
  fetchLinks: PropTypes.func,
  linksQuery: PropTypes.string,
};

const mapStateToProps = ({ linksQuery }) => ({
  linksQuery,
});

export default connect(mapStateToProps, { clearLinks, fetchLinks })(
  LinksLoader
);
