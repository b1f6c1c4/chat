import React from 'react';
import PropTypes from 'prop-types';

import { Delete } from '@material-ui/icons';
import Button from '/src/components/Button';

class ClearButton extends React.PureComponent {
  render() {
    const {
      reset,
      isLoading,
      ...other
    } = this.props;

    return (
      <Button
        {...other}
        color="secondary"
        variant="outlined"
        disabled={isLoading}
        onClick={reset}
        startIcon={<Delete />}
      >
        Clear
      </Button>
    );
  }
}

ClearButton.propTypes = {
  reset: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
};

export default ClearButton;
