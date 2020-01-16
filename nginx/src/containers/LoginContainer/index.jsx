import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '/src/utils/injectSaga';

import LoginPage from '/src/components/LoginPage';

import * as actions from './actions';
import saga from './sagas';

export function LoginContainer(props) {
  useInjectSaga({ key: 'login', saga });

  if (props.hasCredential) {
    return (
      <Redirect to="/login" />
    );
  }
  return (
    <LoginPage {...props} />
  );
}

LoginContainer.propTypes = {
  hasCredential: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onChangeActiveIdAction: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (param) => dispatch(actions.loginRequest(param)),
    onRegister: (param) => dispatch(actions.registerRequest(param)),
    onChangeActiveIdAction: (value) => dispatch(actions.changeActiveId(value)),
  };
}

const mapStateToProps = createStructuredSelector({
  hasCredential: (state) => !!state.getIn(['global', 'credential']),
  activeId: (state) => state.getIn(['login', 'activeId']),
  isLoading: (state) => state.getIn(['login', 'isLoading']),
  isRegistered: (state) => state.getIn(['login', 'isRegistered']),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(LoginContainer);
