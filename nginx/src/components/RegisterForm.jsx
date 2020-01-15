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

class RegisterForm extends React.PureComponent {
  handleRegister = (vals) => this.props.onRegister({
    username: vals.get('username'),
    password: vals.get('password'),
  });

  render() {
    const {
      error,
      reset,
      handleSubmit,
      isLoading,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleRegister)}>
        <DialogTitle>
          Register
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            After registration, your must contact
            administrator(s) to activate your account.
          </DialogContentText>
          <div>
            <UsernameField name="username" fullWidth />
          </div>
          <div>
            <PasswordField name="password" isNew fullWidth />
          </div>
          <ResultIndicator {...{ error }} />
        </DialogContent>
        <DialogActions>
          <ClearButton {...{ reset, isLoading }} />
          <LoadingButton {...{ isLoading }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={this.props.isLoading}
            >
              Register
            </Button>
          </LoadingButton>
        </DialogActions>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  ...propTypes,
  onRegister: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({ form: 'registerForm' }),
)(RegisterForm);
