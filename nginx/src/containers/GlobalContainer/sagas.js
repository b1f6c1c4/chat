import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as actions from './actions';

// Watcher
/* eslint-disable func-names */
export default function* watcher() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield put(push('/login'));
  });
}
