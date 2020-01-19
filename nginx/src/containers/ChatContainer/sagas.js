import _ from 'lodash';
import {
  call,
  cancel as rawCancel,
  delay,
  eventChannel,
  fork,
  put,
  race,
  select,
  take,
} from 'redux-saga/effects';
import * as api from '/src/utils/api';

import * as actions from './actions';

const close = (chan) => {
  if (_.isObject(chan)) {
    chan.close();
  }
};

const report = (err) => {
  /* eslint-disable no-console */
  if (_.isArray(err)) {
    err.forEach((e) => console.error(e));
  } else {
    console.error(err);
  }
  /* eslint-enable no-console */
};

export const makeChan = (topic) => eventChannel((emit) => {
  topic.onData = (msg) => { emit(msg); };
  return () => {
    topic.onData = undefined;
    return topic.leave(false);
  };
});

export function* handleTopicRequestAction({ topic }) {
  const t = api.getTopic(topic);
  const query = t.startMetaQuery().withLaterData(50).build();
  const ctrl = yield call([t, 'subscribe'], query);
  console.log(ctrl);
  const chan = yield call(makeChan, t);
  try {
    while (true) {
      const msg = yield take(chan);
      yield put(actions.received(msg));
    }
  } catch (err) {
    report(err);
  } finally {
    close(chan);
  }
}

// Sagas

// Watcher
const Ob = {};

const valid = (obN) => {
  const ob = Ob[obN];
  if (!ob) return false;
  if (ob.isRunning()) return true;
  delete Ob[obN];
  return false;
};

function* scheduleCancel(obN) {
  const ob = Ob[obN];
  yield delay(800);
  yield rawCancel(ob);
}

const uncancel = (obN) => {
  const ob = Ob[`${obN}Cancel`];
  if (!ob) return undefined;
  // eslint-disable-next-line redux-saga/yield-effects
  return rawCancel(ob);
};

const doCancel = (obN, force) => {
  if (!force) {
    const k = `${obN}Cancel`;
    if (Ob[k]) return undefined;
    // eslint-disable-next-line redux-saga/yield-effects
    return fork(scheduleCancel, obN);
  }
  const ob = Ob[obN];
  Ob[obN] = undefined;
  // eslint-disable-next-line redux-saga/yield-effects
  return rawCancel(ob);
};

const cancel = (obN, force = true) => {
  const ob = Ob[obN];
  if (!ob) return undefined;
  return doCancel(obN, force);
};

export function* watchTopic() {
  while (true) {
    const { request, stop } = yield race({
      request: take(actions.SUBSCRIBE_REQUEST),
      stop: take(actions.UNSUBSCRIBE_REQUEST),
    });
    if (request) {
      if (!valid('topic')) {
        yield cancel('topic');
        Ob.topic = yield fork(handleTopicRequestAction, request);
      }
      yield uncancel('topic');
      continue;
    }
    if (stop) {
      Ob.topicCancel = yield cancel('topic', false);
      continue;
    }
  }
}

/* eslint-disable func-names */
export default function* watcher() {
  yield fork(watchTopic);
}
