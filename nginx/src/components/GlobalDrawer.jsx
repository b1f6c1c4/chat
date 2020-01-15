import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  HelpOutline,
  Home,
  Lock,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

class GlobalDrawer extends React.PureComponent {
  handleProfile = () => {
    this.props.onCloseDrawerAction();
    this.props.onPush('/profile');
  };

  handleLogin = () => {
    this.props.onCloseDrawerAction();
    this.props.onPush('/login');
  };

  handleChat = () => {
    this.props.onCloseDrawerAction();
    this.props.onPush('/chat');
  };

  handlePropose = () => {
    this.props.onCloseDrawerAction();
    this.props.onPush('/propose');
  };

  render() {
    const {
      username,
    } = this.props;

    let items;
    if (username) {
      items = [(
        <ListItem button onClick={this.handleLogin}>
          <ListItemIcon>
            <Link to="/login">
              <Lock />
            </Link>
          </ListItemIcon>
          <ListItemText
            className="item"
            primary={(
              <Link to="/app/login">
                Login
              </Link>
            )}
          />
        </ListItem>
      )];
    } else {
      items = [(
        <ListItem button onClick={this.handleProfile}>
          <ListItemIcon>
            <Link to="/profile">
              <Home />
            </Link>
          </ListItemIcon>
          <ListItemText
            className="item"
            primary={(
              <Link to="/profile">
                Profile
              </Link>
            )}
          />
        </ListItem>
      ), (
        <Divider />
      ), (
        <ListItem button onClick={this.handleChat}>
          <ListItemIcon>
            <Link to="/chat">
              <Home />
            </Link>
          </ListItemIcon>
          <ListItemText
            className="item"
            primary={(
              <Link to="/chat">
                Profile
              </Link>
            )}
          />
        </ListItem>
      ), (
        <ListItem button onClick={this.handlePropose}>
          <ListItemIcon>
            <Link to="/prosose">
              <Home />
            </Link>
          </ListItemIcon>
          <ListItemText
            className="item"
            primary={(
              <Link to="/propose">
                Profile
              </Link>
            )}
          />
        </ListItem>
      )];
    }

    return (
      <Drawer
        open={this.props.isDrawerOpen}
        onClose={this.props.onCloseDrawerAction}
      >
        <List
          component="nav"
          className="drawer"
        >
          {...items}
        </List>
      </Drawer>
    );
  }
}

GlobalDrawer.propTypes = {
  onPush: PropTypes.func.isRequired,
  username: PropTypes.string,
  isDrawerOpen: PropTypes.bool.isRequired,
  onCloseDrawerAction: PropTypes.func.isRequired,
};

export default GlobalDrawer;
