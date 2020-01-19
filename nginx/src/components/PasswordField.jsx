import React from 'react';
import PropTypes from 'prop-types';

import TextField from '/src/components/TextField';
import make, { required, minChar, maxChar } from '/src/utils/validation';

class PasswordField extends React.PureComponent {
  validate = make(
    required(),
    minChar(8),
    maxChar(32),
  );

  render() {
    const { isNew, ...other } = this.props;

    return (
      <TextField
        {...other}
        inputProps={{
          className: 'password-field',
          autoComplete: isNew ? 'new-password' : 'current-password',
        }}
        type="password"
        label={this.props.label || 'Password'}
        validate={this.validate}
      />
    );
  }
}

PasswordField.propTypes = {
  label: PropTypes.string,
  isNew: PropTypes.bool,
};

export default PasswordField;
