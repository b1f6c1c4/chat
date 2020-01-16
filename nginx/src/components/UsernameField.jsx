import React from 'react';

import TextField from '/src/components/TextField';
import make, { required, alphanumericDash, minChar, maxChar } from '/src/utils/validation';

class UsernameField extends React.PureComponent {
  validate = make(
    required(),
    alphanumericDash(),
    minChar(4),
    maxChar(32),
  );

  render() {
    const { ...other } = this.props;

    return (
      <TextField
        {...other}
        label="Username"
        validate={this.validate}
      />
    );
  }
}

export default UsernameField;
