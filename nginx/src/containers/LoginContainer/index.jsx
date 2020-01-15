import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { createStructuredSelector } from 'reselect';
import injectSaga from '/src/utils/injectSaga';

import LoginPage from '/src/components/LoginPage';

import * as loginContainerActions from './actions';
import sagas from './sagas';

export class LoginContainer extends React.PureComponent {
  render() {
    if (this.props.hasCredential) {
      return (
        <Redirect to="/app/" />
      );
    }
    return (
      <LoginPage {...this.props} />
    );
  }
}

LoginContainer.propTypes = {
  hasCredential: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onChangeActiveIdAction: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (param) => dispatch(loginContainerActions.loginRequest(param)),
    onRegister: (param) => dispatch(loginContainerActions.registerRequest(param)),
    onChangeActiveIdAction: (value) => dispatch(loginContainerActions.changeActiveId(value)),
  };
}

const mapStateToProps = createStructuredSelector({
  hasCredential: (state) => !!state.getIn(['global', 'credential']),
  activeId: (state) => state.getIn(['login', 'activeId']),
  isLoading: (state) => state.getIn(['login', 'isLoading']),
});

export default compose(
  // injectSaga({ key: 'login', saga: sagas }),
  connect(mapStateToProps, mapDispatchToProps),
)(LoginContainer);
