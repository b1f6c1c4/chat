import React from 'react';
import PropTypes from 'prop-types';
import * as datefns from 'date-fns';

import Avatar from '/src/components/Avatar.jsx';

class ChatMessage extends React.PureComponent {
  render() {
    const {
      origin,
      sequence,
      response,
      content,
      timestamp,
    } = this.props;
    const sideClass = `${sequence} ${(response ? 'left' : 'right')}`;
    const bubbleClass = (sequence === 'single' || sequence === 'last') ? 'bubble tip' : 'bubble';
    const showNickname = sequence === 'single' || sequence === 'first';
    const showAvatar = sequence === 'single' || sequence === 'last';

    return (
      <li className={sideClass}>
        <Avatar
          avatar={origin.avatar}
          enabled={showAvatar}
        />
        <div className={bubbleClass}>
          {showNickname && (
            <div className="author">
              {origin.nickname}
            </div>
          )}
          <div className="message-content">
            <span className="message-content">
              {content}
            </span>
            <span className="timestamp">
              {datefns.format(timestamp, 'HH:mm')}
            </span>
          </div>
        </div>
      </li>
    );
  }
}

ChatMessage.propTypes = {
  origin: PropTypes.object.isRequired,
  sequence: PropTypes.string.isRequired,
  response: PropTypes.bool,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.object.isRequired,
};

export default ChatMessage;
