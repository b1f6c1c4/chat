import React from 'react';
import PropTypes from 'prop-types';

import {
  IconButton,
  TextField,
} from '@material-ui/core';
import {
  ArrowUpward,
  ArrowUpwardOutlined,
} from '@material-ui/icons';

class SendMessage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      keypressTimestamp: new Date() - 3000 - 1,
    };
  }

  componentDidUpdate() {
    this.messageEditArea.focus();
  }

  handleSend = (e) => {
    e.preventDefault();
    const message = this.state.message.trim();
    if (message) {
      this.props.onSend(message);
      this.setState({ message: '' });
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();

        this.handleSend(e);
      }
    }
  }

  handleMessageTyping = (e) => {
    const newState = { message: e.target.value };
    const now = +new Date();
    if (now - this.state.keypressTimestamp > 3000) {
      this.props.onPress();
      /*
       * const topic = this.props.tinode.getTopic(this.props.topic);
       * if (topic.isSubscribed()) {
       *   topic.noteKeyPress();
       * }
       */
      newState.keypressTimestamp = now;
    }
    this.setState(newState);
  }

  render() {
    const prompt = this.props.disabled ? 'Messaging is disabled' : 'Message';
    return (
      <div className="send-message-panel">
        <TextField
          className="msgbox"
          rowsMax={10}
          multiline
          placeholder={prompt}
          disabled={this.props.disabled}
          ref={(ref) => { this.messageEditArea = ref; }}
          value={this.state.message}
          onChange={this.handleMessageTyping}
          onKeyPress={this.handleKeyPress}
          autoFocus
        />
        <IconButton
          className="super-button"
          color="primary"
          aria-label="Send"
          onClick={this.handleSend}
          disabled={this.props.disabled || !this.state.message}
        >
          {this.props.disabled ? (
            <ArrowUpwardOutlined />
          ) : (
            <ArrowUpward/>
          )}
        </IconButton>
      </div>
    );
  }
}

SendMessage.propTypes = {
  onSend: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default SendMessage;
