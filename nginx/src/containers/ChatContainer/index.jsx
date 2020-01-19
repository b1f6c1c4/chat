import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from '/src/utils/injectSaga';

import Loading from '/src/components/Loading';
import ChatMessage from '/src/components/ChatMessage';
import SendMessage from '/src/components/SendMessage';

import * as actions from './actions';
import saga from './sagas';

const defaultTopic = 'grp1bHMuX6-R8k'; // FIXME

export function ChatContainer(props) {
  useInjectSaga({ key: 'chat', saga });
  useEffect(() => {
    props.onSubscribe(defaultTopic);
    return () => { props.onUnsubscribe('default'); };
  });

  let messagesScroller;

  const handleScrollEvent = () => {
    // this.setState({scrollPosition: event.target.scrollHeight - event.target.scrollTop});
    // if (event.target.scrollTop <= 0) {
    //   this.setState((prevState, props) => {
    //     const newState = {};
    //     if (!prevState.isLoading) {
    //       const topic = this.props.tinode.getTopic(this.state.topic);
    //       if (topic && topic.isSubscribed() && topic.msgHasMoreMessages()) {
    //         newState.isLoading = true;
    //         topic.getMessagesPage(MESSAGES_PAGE).catch((err) => {
    //           this.setState({isLoading: false});
    //           this.props.onError(err.message, 'err');
    //         });
    //       }
    //     }
    //     return newState;
    //   });
    // }
  };

  useEffect(() => {
    if (messagesScroller) {
      messagesScroller.addEventListener('scroll', handleScrollEvent);
      // TODO: telegram-style scroll
      // Scroll last message into view on component update e.g. on message received
      // or vertical shrinking.
      // if (prevState.topic != this.state.topic || prevState.messages.length != this.state.messages.length) {
      //   this.messagesScroller.scrollTop = this.messagesScroller.scrollHeight - this.state.scrollPosition;
      // } else if (prevProps.viewportHeight > this.props.viewportHeight) {
      //   this.messagesScroller.scrollTop += prevProps.viewportHeight - this.props.viewportHeight;
      // }
    }
    return () => {
      if (messagesScroller) {
        messagesScroller.removeEventListener('scroll', handleScrollEvent);
      }
    };
  });

  const handleScrollReference = (node) => {
    if (node) {
      node.addEventListener('scroll', handleScrollEvent);
      messagesScroller = node;
    }
  };

  const { messages, isLoading } = props;
  const messageNodes = [];
  let previousFrom = null;
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    let nextFrom = null;

    if (i + 1 < messages.length) {
      nextFrom = messages[i + 1].from;
    }

    let sequence = 'single';
    if (msg.from === previousFrom) {
      sequence = (msg.from === nextFrom) ? 'middle' : 'last';
    } else if (msg.from === nextFrom) {
      sequence = 'first';
    }
    previousFrom = msg.from;

    const isReply = true; // TODO: accurate

    const origin = {
      nickname: msg.from,
      avatar: '',
    };
    /* TODO: user info
      const user = topic.userDesc(msg.from);
      if (user && user.public) {
        userName = user.public.fn;
        userAvatar = makeImageUrl(user.public.photo);
      }
      userFrom = msg.from;
     */

    messageNodes.push((
      <ChatMessage
        key={msg.seq}
        origin={origin}
        sequence={sequence}
        response={isReply}
        content={msg.content && msg.content.toString()}
        timestamp={msg.ts}
      />
    ));
  }

  return (
    <div className="topic-view">
      {isLoading && (
        <Loading />
      )}
      <div className="messages-container">
        <div className="messages-panel" ref={handleScrollReference}>
          <ul className="chat-box group">
            {messageNodes}
          </ul>
        </div>
      </div>
      <SendMessage
        onSend={props.onSend}
        onPress={() => {} /* TODO */}
      />
    </div>
  );
}

ChatContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  isLoading: PropTypes.bool, // TODO
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onSubscribe: (param) => dispatch(actions.subscribe(param)),
    onUnsubscribe: (param) => dispatch(actions.unsubscribe(param)),
    onSend: (param) => dispatch(actions.send(defaultTopic, param)),
  };
}

const mapStateToProps = createStructuredSelector({
  messages: (state) => state.getIn(['chat', 'messages']).toJS(),
  isLoading: (state) => state.getIn(['chat', 'isLoading']),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ChatContainer);
