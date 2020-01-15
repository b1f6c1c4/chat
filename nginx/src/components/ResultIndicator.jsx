import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
} from '@material-ui/core';

class ResultIndicator extends React.PureComponent {
  formatErrors = (error) => {
    if (!error) return null;

    const arr = [];

    // eslint-disable-next-line no-console
    console.error(error);

    const msg = _.get(error, 'message') || _.get(error, 'raw.message');
    if (msg) {
      arr.push(<span key="msg">{msg}</span>);
    }

    return arr.filter((a) => a !== null).map((a) => (
      <Typography key={a.key} color="error">
        {a}
      </Typography>
    ));
  }

  render() {
    const { error } = this.props;

    return (
      <div className="result-wrapper">
        {this.formatErrors(error)}
      </div>
    );
  }
}

ResultIndicator.propTypes = {
  error: PropTypes.object,
};

export default ResultIndicator;
