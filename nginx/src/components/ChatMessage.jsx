import React from 'react';

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
    const sideClass = sequence + ' ' + (response ? 'left' : 'right');
    const bubbleClass = (sequence === 'single' || sequence === 'last') ?  'bubble tip' : 'bubble';
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
              {timestamp}
            </span>
          </div>
        </div>
      </li>
    );
  }
}

export default ChatMessage;
