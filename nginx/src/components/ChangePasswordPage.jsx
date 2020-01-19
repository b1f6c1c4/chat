import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  Typography,
} from '@material-ui/core';
import { reduxForm, propTypes } from 'redux-form/immutable';
import Button from '/src/components/Button';
import ClearButton from '/src/components/ClearButton';
import DocumentTitle from '/src/components/DocumentTitle';
import LoadingButton from '/src/components/LoadingButton';
import PasswordField from '/src/components/PasswordField';
import ResultIndicator from '/src/components/ResultIndicator';

class ChangePasswordPage extends React.PureComponent {
  handlePassword = (vals) => this.props.onPassword({
    oldPassword: vals.get('oldPassword'),
    newPassword: vals.get('newPassword'),
  });

  render() {
    const {
      reset,
      handleSubmit,
      isLoading,
    } = this.props;

    return (
      <div className="wrapper">
        <DocumentTitle title="Change password" />
        <Typography variant="h2">
          Change password
        </Typography>
        <form onSubmit={handleSubmit(this.handlePassword)}>
          <div>
            <PasswordField
              label="Old password"
              name="oldPassword"
              fullWidth
            />
            <PasswordField
              label="New password"
              name="newPassword"
              isNew
              fullWidth
            />
            <ResultIndicator error={this.props.error} />
          </div>
          <div className="actions">
            <ClearButton {...{ reset, isLoading }} />
            <LoadingButton {...{ isLoading }}>
              <Button
                type="submit"
                color="primary"
                disabled={isLoading}
              >
                Submit
              </Button>
            </LoadingButton>
          </div>
        </form>
      </div>
    );
  }
}

ChangePasswordPage.propTypes = {
  ...propTypes,
  onPassword: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({ form: 'passwordForm' }),
)(ChangePasswordPage);
