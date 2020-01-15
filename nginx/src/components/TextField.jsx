import React from 'react';
import PropTypes from 'prop-types';

import { TextField as RawTextField } from 'redux-form-material-ui';
import { Field } from 'redux-form/immutable';

class TextField extends React.PureComponent {
  render() {
    const {
      type,
      label,
      helperText,
      ...other
    } = this.props;

    return (
      <Field
        {...other}
        type={type || 'text'}
        component={RawTextField}
        margin="dense"
        label={label}
        helperText={helperText}
        fullWidth
      />
    );
  }
}

TextField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
};

export default TextField;
