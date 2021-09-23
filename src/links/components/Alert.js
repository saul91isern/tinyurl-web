import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import { dismissAlert } from "../routines";

export const Alert = ({
  message: { header, info, success, error, text },
  dismissAlert,
}) =>
  text || header ? (
    <Message
      icon={
        (error && "warning sign") || (success && "check") || (info && "info")
      }
      error={error}
      header={header}
      content={text}
      positive={success}
      warning={info}
      onDismiss={dismissAlert}
      visible
    />
  ) : null;

Alert.propTypes = {
  message: PropTypes.object,
  dismissAlert: PropTypes.func,
};

const mapStateToProps = ({ message }) => ({ message });

export default connect(mapStateToProps, { dismissAlert })(Alert);
