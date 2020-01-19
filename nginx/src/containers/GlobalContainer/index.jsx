import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '/src/utils/injectSaga';

import GlobalPage from '/src/components/GlobalPage';

import * as actions from './actions';
import saga from './sagas';

export function GlobalContainer(props) {
  useInjectSaga({ key: 'global', saga });

  return (
    <GlobalPage {...props}>
      {props.children}
    </GlobalPage>
  );
}

GlobalContainer.propTypes = {
  children: PropTypes.any,
  onPush: PropTypes.func.isRequired,
  username: PropTypes.string,
  isDrawerOpen: PropTypes.bool.isRequired,
  isAccountOpen: PropTypes.bool.isRequired,
  onOpenDrawerAction: PropTypes.func.isRequired,
  onCloseDrawerAction: PropTypes.func.isRequired,
  onOpenAccountAction: PropTypes.func.isRequired,
  onCloseAccountAction: PropTypes.func.isRequired,
  onLogoutAction: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onPush: (url) => dispatch(push(url)),
    onOpenDrawerAction: () => dispatch(actions.openDrawer()),
    onCloseDrawerAction: () => dispatch(actions.closeDrawer()),
    onOpenAccountAction: () => dispatch(actions.openAccount()),
    onCloseAccountAction: () => dispatch(actions.closeAccount()),
    onLogoutAction: () => dispatch(actions.logout()),
  };
}

const mapStateToProps = createStructuredSelector({
  username: (state) => state.getIn(['persistent', 'username']),
  isDrawerOpen: (state) => state.getIn(['global', 'isDrawerOpen']),
  isAccountOpen: (state) => state.getIn(['global', 'isAccountOpen']),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(GlobalContainer);
