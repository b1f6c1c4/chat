import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Button from '/src/components/Button';

class GlobalBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  componentDidUpdate() {
    // eslint-disable-next-line react/no-find-dom-node
    const anchorEl = ReactDOM.findDOMNode(this.anchorEl);
    if (this.state.anchorEl !== anchorEl) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ anchorEl });
    }
  }

  handleDrawer = () => this.props.isDrawerOpen
    ? this.props.onCloseDrawerAction()
    : this.props.onOpenDrawerAction();

  handleProfile = () => {
    this.props.onCloseAccountAction();
    this.props.onPush('/profile');
  };

  handlePassword = () => {
    this.props.onCloseAccountAction();
    this.props.onPush('/password');
  };

  handleLogout = () => {
    this.props.onCloseAccountAction();
    this.props.onLogoutAction();
  };

  render() {
    const {
      username,
      isAccountOpen,
    } = this.props;

    return (
      <AppBar position="fixed">
        <Toolbar className="global-bar">
          <IconButton
            className="menu-button"
            color="inherit"
            aria-label="Menu"
            onClick={this.handleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="div"
            onClick={this.handleChat}
            variant="h4"
            color="inherit"
            className="header"
          >
            chat
          </Typography>
          {
            username ? (
              <div>
                <Button
                  className="account-button"
                  ref={(obj) => { this.anchorEl = obj; }}
                  onClick={this.props.onOpenAccountAction}
                  color="inherit"
                  variant="text"
                  endIcon={<AccountCircle />}
                >
                  <span>{username}</span>
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={isAccountOpen}
                  onClose={this.props.onCloseAccountAction}
                >
                  <MenuItem onClick={this.handleProfile}>
                    <Link to="/profile">
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handlePassword}>
                    <Link to="/password">
                      Change password
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button to="/login" variant="outlined" color="secondary">
                Login
              </Button>
            )
          }
        </Toolbar>
      </AppBar>
    );
  }
}

GlobalBar.propTypes = {
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

export default GlobalBar;
