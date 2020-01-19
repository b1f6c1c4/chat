import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '/src/utils/api';
import {
  reset,
  stopSubmit,
} from 'redux-form';
import { push } from 'connected-react-router';

import * as actions from './actions';

// Sagas
export function* handlePasswordRequest({ newPassword }) {
  try {
    const result = yield call(api.changePassword, newPassword);
    yield put(actions.passwordSuccess(result));
    yield put(reset('passwordForm'));
    yield put(push('/profile'));
  } catch (err) {
    yield put(actions.passwordFailure(err));
    yield put(stopSubmit('passwordForm', { _error: err }));
  }
}

// Watcher
/* eslint-disable func-names */
export default function* watcher() {
  yield takeEvery(actions.PASSWORD_REQUEST, handlePasswordRequest);
}
