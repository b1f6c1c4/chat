import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import {
  Paper,
  Typography,
} from '@material-ui/core';
import { reduxForm, propTypes } from 'redux-form/immutable';
import Button from '/src/components/Button';
import ClearButton from '/src/components/ClearButton';
import DocumentTitle from '/src/components/DocumentTitle';
import LoadingButton from '/src/components/LoadingButton';
import PasswordField from '/src/components/PasswordField';
import ResultIndicator from '/src/components/ResultIndicator';


// eslint-disable-next-line no-unused-vars
const styles = (theme) => ({
  container: {
    width: '100%',
    padding: theme.spacing.unit,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit,
    overflowX: 'auto',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

class ChangePasswordPage extends React.PureComponent {
  handlePassword = (vals) => this.props.onPassword({
    oldPassword: vals.get('oldPassword'),
    newPassword: vals.get('newPassword'),
  });

  render() {
    const {
      classes,
      reset,
      handleSubmit,
      isLoading,
    } = this.props;

    return (
      <div className={classes.container}>
        <DocumentTitle title={messages.header} />
        <Typography variant="display2">
          <FormattedMessage {...messages.header} />
        </Typography>
        <Paper className={classes.root}>
          <form onSubmit={handleSubmit(this.handlePassword)}>
            <div>
              <PasswordField
                label={messages.oldPassword}
                name="oldPassword"
                fullWidth
              />
              <PasswordField
                label={messages.newPassword}
                name="newPassword"
                isNew
                fullWidth
              />
              <ResultIndicator error={this.props.error} />
            </div>
            <div className={classes.actions}>
              <ClearButton {...{ reset, isLoading }} />
              <LoadingButton {...{ isLoading }}>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isLoading}
                >
                  <FormattedMessage {...messages.change} />
                </Button>
              </LoadingButton>
            </div>
          </form>
        </Paper>
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
