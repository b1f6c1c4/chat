import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

class AuthRequired extends React.PureComponent {
  render() {
    if (!this.props.hasCredential) {
      return (
        <Typography variant="h1">
          Please
          <Link to="/login">
            login
          </Link>
          first.
        </Typography>
      );
    }

    return this.props.children;
  }
}

AuthRequired.propTypes = {
  children: PropTypes.element,
  hasCredential: PropTypes.bool.isRequired,
};

export default AuthRequired;
