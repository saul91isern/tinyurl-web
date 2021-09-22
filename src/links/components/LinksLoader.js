import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearLinks, fetchLinks } from "../routines";

export const LinksLoader = ({ clearLinks, fetchLinks }) => {
  useEffect(() => {
    fetchLinks();
    return () => {
      clearLinks();
    };
  }, [clearLinks, fetchLinks]);
  return null;
};

LinksLoader.propTypes = {
  clearTemplates: PropTypes.func,
  fetchTemplates: PropTypes.func,
  scope: PropTypes.string,
};

export default connect(null, { clearLinks, fetchLinks })(LinksLoader);
