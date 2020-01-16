// Actions
export const CHANGE_ACTIVE_ID_ACTION = 'CHANGE_ACTIVE_ID_ACTION';
export function changeActiveId(value) {
  return {
    type: CHANGE_ACTIVE_ID_ACTION,
    value,
  };
}

// Sagas
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function loginRequest({ username, password }) {
  return {
    type: LOGIN_REQUEST,
    username,
    password,
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export function registerRequest({ username, password }) {
  return {
    type: REGISTER_REQUEST,
    username,
    password,
  };
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export function registerSuccess() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export function registerFailure(error) {
  return {
    type: REGISTER_FAILURE,
    error,
  };
}

export const REGISTER_DONE = 'REGISTER_DONE';
export function registerDone() {
  return {
    type: REGISTER_DONE,
  };
}
