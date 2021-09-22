import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearRedirect } from "../routines";

export const Redirector = ({ redirect, clearRedirect }) => {
  useEffect(() => {
    clearRedirect();
  }, [clearRedirect]);
  return <Redirect to={{ pathname: redirect }} />;
};

Redirector.propTypes = {
  redirect: PropTypes.string,
  clearRedirect: PropTypes.func,
};

export default connect(null, { clearRedirect })(Redirector);
