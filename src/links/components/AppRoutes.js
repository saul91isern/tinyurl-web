import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Redirector from "./Redirector";
import Home from "./Home";
import LinksLoader from "./LinksLoader";

const AppRoutes = ({ redirect }) => {
  return (
    <Switch>
      {redirect && <Redirector redirect={redirect} />}
      {!redirect && (
        <>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <LinksLoader />
                <Home />
              </>
            )}
          />
        </>
      )}
    </Switch>
  );
};

AppRoutes.propTypes = {
  redirect: PropTypes.string,
};
const mapStateToProps = ({ redirect }) => ({ redirect });

export default connect(mapStateToProps)(AppRoutes);
