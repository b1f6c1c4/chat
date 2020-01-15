import React from 'react';
import PropTypes from 'prop-types';

import {
  CircularProgress,
} from '@material-ui/core';

class Loading extends React.PureComponent {
  render() {
    const { error, pastDelay } = this.props;

    if (error) {
      return (
        <div>
          Error!
        </div>
      );
    }
    if (pastDelay !== false) {
      return (
        <div className="loading-wrapper">
          Loading...
          <br />
          <CircularProgress className="loading-progress" />
        </div>
      );
    }
    return null;
  }
}

Loading.propTypes = {
  error: PropTypes.object,
  pastDelay: PropTypes.bool,
};

export default Loading;
