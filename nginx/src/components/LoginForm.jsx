import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { reduxForm, propTypes } from 'redux-form/immutable';
import Button from '/src/components/Button';
import ClearButton from '/src/components/ClearButton';
import LoadingButton from '/src/components/LoadingButton';
import PasswordField from '/src/components/PasswordField';
import ResultIndicator from '/src/components/ResultIndicator';
import UsernameField from '/src/components/UsernameField';

class LoginForm extends React.PureComponent {
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
        <DialogTitle>
          Login
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your credential.
          </DialogContentText>
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

LoginForm.propTypes = {
  ...propTypes,
  onLogin: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({ form: 'loginForm' }),
)(LoginForm);
