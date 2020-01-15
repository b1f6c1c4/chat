import { wait } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as api from '/src/utils/api';
import {
  change,
  reset,
  destroy,
  stopSubmit,
} from 'redux-form';
import { push } from 'connected-react-router';

import * as globalActions from '/src/actions';
import * as actions from './actions';

// Sagas
export function* handleLoginRequest({ username, password }) {
  try {
    const result = yield call(api.mutate, { username, password }); // FIXME
    if (!result) {
      throw new Error('Credential not accepted');
    }
    yield put(globalActions.login(result));
    yield put(actions.loginSuccess(result));
    yield put(destroy('loginForm'));
    yield put(push('/chat'));
  } catch (err) {
    yield put(actions.loginFailure(err));
    yield put(stopSubmit('loginForm', { _error: err }));
  }
}

export function* handleRegisterRequest({ username, password }) {
  try {
    const result = yield call(api.mutate, { username, password }); // FIXME
    yield put(actions.registerSuccess(result));
    yield put(destroy('registerForm'));
    yield wait(10);
    yield put(actions.changeActiveId(0));
    yield put(reset('loginForm'));
    yield put(change('loginForm', 'username', username));
  } catch (err) {
    yield put(actions.registerFailure(err));
    yield put(stopSubmit('registerForm', { _error: err }));
  }
}

// Watcher
/* eslint-disable func-names */
export default function* watcher() {
  yield takeEvery(actions.LOGIN_REQUEST, handleLoginRequest);
  yield takeEvery(actions.REGISTER_REQUEST, handleRegisterRequest);
}
