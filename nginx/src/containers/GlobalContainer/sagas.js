import {
  select,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as api from '/src/utils/api';

import * as actions from './actions';

// Watcher
/* eslint-disable func-names */
export default function* watcher() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield put(push('/login'));
  });
  try {
    const username = yield select((state) => state.getIn(['persistent', 'username']));
    const t = yield select((state) => state.getIn(['persistent', 'credential', 'token']));
    if (t) {
      const { token, id } = yield call(api.relogin, t);
      yield put(actions.login({ token, id, username }));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
