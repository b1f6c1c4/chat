import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import make, { required, alphanumericDash, minChar } from '/src/utils/validation';

import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import Button from '/src/components/Button';
import ClearButton from '/src/components/ClearButton';
import LoadingButton from '/src/components/LoadingButton';
import PasswordField from '/src/components/PasswordField';
import ResultIndicator from '/src/components/ResultIndicator';
import UsernameField from '/src/components/UsernameField';
import { reduxForm, propTypes } from 'redux-form/immutable';

class LoginContainer extends React.PureComponent {
  unVal = make(
    required(),
    alphanumericDash(),
    minChar(5),
  );

  handleLogin = (vals) => this.props.onLogin({
    username: vals.get('username'),
    password: vals.get('password'),
  });

  render() {
    const {
      reset,
      handleSubmit,
      isLoading,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleLogin)}>
        <DialogTitle>Login/Register</DialogTitle>
        <DialogContent>
          <div>
            <UsernameField name="username" fullWidth />
          </div>
          <div>
            <PasswordField name="password" fullWidth />
          </div>
          <ResultIndicator error={this.props.error} />
        </DialogContent>
        <DialogActions>
          <ClearButton {...{ reset, isLoading }} />
          <LoadingButton {...{ isLoading }}>
            <Button
              type="submit"
              color="primary"
              disabled={isLoading}
            >
              Login
            </Button>
          </LoadingButton>
        </DialogActions>
      </form>
    );
  }
}

LoginContainer.propTypes = {
  ...propTypes,
  onLogin: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({ form: 'LoginContainer' }),
)(LoginContainer);
