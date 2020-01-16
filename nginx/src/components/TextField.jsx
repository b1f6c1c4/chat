import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField as RawTextField,
} from '@material-ui/core';
import { Field } from 'redux-form/immutable';

/* eslint-disable react/prop-types */
const renderTextField = ({
  input,
  meta: { touched, error },
  label,
  helperText,
  ...custom
}) => (
  <RawTextField
    error={touched && !!error}
    label={label}
    helperText={error || helperText}
    {...input}
    {...custom}
  />
);
/* eslint-enable react/prop-types */

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
        component={renderTextField}
        margin="dense"
        label={label}
        helperText={helperText}
        fullWidth
      />
    );
  }
}

TextField.propTypes = {
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
};

export default TextField;
