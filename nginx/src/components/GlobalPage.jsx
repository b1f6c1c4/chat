import React from 'react';
import PropTypes from 'prop-types';

import DocumentTitle from '/src/components/DocumentTitle';
import GlobalBar from '/src/components/GlobalBar';
import GlobalDrawer from '/src/components/GlobalDrawer';

class GlobalPage extends React.PureComponent {
  render() {
    const {
      onPush,
      username,
      isAccountOpen,
      isDrawerOpen,
      onOpenDrawerAction,
      onCloseDrawerAction,
      onOpenAccountAction,
      onCloseAccountAction,
      onLogoutAction,
    } = this.props;

    return (
      <div className="root">
        <DocumentTitle />
        <GlobalBar
          {...{
            onPush,
            username,
            isAccountOpen,
            isDrawerOpen,
            onOpenDrawerAction,
            onCloseDrawerAction,
            onOpenAccountAction,
            onCloseAccountAction,
            onLogoutAction,
          }}
        />
        <GlobalDrawer
          {...{
            onPush,
            username,
            isDrawerOpen,
            onCloseDrawerAction,
          }}
        />
        <div className="wrapper">
          {this.props.children}
        </div>
      </div>
    );
  }
}

GlobalPage.propTypes = {
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

export default GlobalPage;
