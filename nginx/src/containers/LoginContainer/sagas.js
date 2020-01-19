import {
  call,
  delay,
  put,
  takeEvery,
} from 'redux-saga/effects';
import * as api from '/src/utils/api';
import {
  change,
  reset,
  destroy,
  stopSubmit,
} from 'redux-form';
import { push } from 'connected-react-router';

import * as globalActions from '/src/containers/GlobalContainer/actions';
import * as actions from './actions';

// Sagas
export function* handleLoginRequest({ username, password }) {
  try {
    const { token, id } = yield call(api.login, username, password);
    yield put(globalActions.login({ token, id, username }));
    yield put(actions.loginSuccess());
    yield put(destroy('loginForm'));
    yield put(push('/chat'));
  } catch (err) {
    yield put(actions.loginFailure(err));
    yield put(stopSubmit('loginForm', { _error: err }));
  }
}

export function* handleRegisterRequest({ username, password }) {
  try {
    yield call(api.register, username, password);
    yield put(actions.registerSuccess());
    yield delay(10000);
    yield put(actions.registerDone());
    yield put(destroy('registerForm'));
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
