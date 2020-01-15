import React from 'react';
import PropTypes from 'prop-types';

import {
  CircularProgress,
} from '@material-ui/core';

class LoadingButton extends React.PureComponent {
  render() {
    const { isLoading } = this.props;

    return (
      <div className="button-wrapper">
        {this.props.children}
        {isLoading && <CircularProgress size={24} className="button-progress" />}
      </div>
    );
  }
}

LoadingButton.propTypes = {
  children: PropTypes.element.isRequired,
  isLoading: PropTypes.bool,
};

export default LoadingButton;
