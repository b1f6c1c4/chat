import React from 'react';
import PropTypes from 'prop-types';

import {
  AppBar,
  Dialog,
  Tab,
  Tabs,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import LoginForm from '/src/components/LoginForm';
import RegisterForm from '/src/components/RegisterForm';

class LoginPage extends React.PureComponent {
  handleChange = (event, value) => this.props.onChangeActiveIdAction(value);

  handleChangeIndex = (index) => this.props.onChangeActiveIdAction(index);

  render() {
    return (
      <Dialog open>
        <AppBar position="static" color="default">
          <Tabs
            value={this.props.activeId}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis="x"
          index={this.props.activeId}
          onChangeIndex={this.handleChangeIndex}
          disableLazyLoading
        >
          <LoginForm {...this.props} />
          <RegisterForm {...this.props} />
        </SwipeableViews>
      </Dialog>
    );
  }
}

LoginPage.propTypes = {
  activeId: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  onChangeActiveIdAction: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default LoginPage;
