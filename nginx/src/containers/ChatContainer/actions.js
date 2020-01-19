// Actions
// Sagas
export const SUBSCRIBE_REQUEST = 'SUBSCRIBE_REQUEST';
export function subscribe(topic) {
  return {
    type: SUBSCRIBE_REQUEST,
    topic,
  };
}

export const UNSUBSCRIBE_REQUEST = 'UNSUBSCRIBE_REQUEST';
export function unsubscribe() {
  return {
    type: UNSUBSCRIBE_REQUEST,
  };
}

export const SEND_REQUEST = 'SEND_REQUEST';
export function send(topic, data) {
  return {
    type: SEND_REQUEST,
    topic,
    data,
  };
}

export const RECEIVED = 'RECEIVED';
export function received(data) {
  return {
    type: RECEIVED,
    data,
  };
}
