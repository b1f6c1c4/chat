import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '/src/utils/injectSaga';

import AuthRequired from '/src/components/AuthRequired';
import ChangePasswordPage from '/src/components/ChangePasswordPage';

import * as actions from './actions';
import saga from './sagas';

function ChangePasswordContainer(props) {
  useInjectSaga({ key: 'changePassword', saga });

  return (
    <AuthRequired hasCredential={props.hasCredential}>
      <ChangePasswordPage {...props} />
    </AuthRequired>
  );
}

ChangePasswordContainer.propTypes = {
  hasCredential: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onPassword: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onPassword: (param) => dispatch(actions.passwordRequest(param)),
  };
}

const mapStateToProps = createStructuredSelector({
  hasCredential: (state) => !!state.getIn(['global', 'my', 'id']),
  isLoading: (state) => state.getIn(['changePassword', 'isLoading']),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ChangePasswordContainer);
