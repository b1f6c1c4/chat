// Actions
export const OPEN_DRAWER = 'OPEN_DRAWER_ACTION';
export function openDrawer() {
  return {
    type: OPEN_DRAWER,
  };
}

export const CLOSE_DRAWER = 'CLOSE_DRAWER_ACTION';
export function closeDrawer() {
  return {
    type: CLOSE_DRAWER,
  };
}

export const OPEN_ACCOUNT = 'OPEN_ACCOUNT_ACTION';
export function openAccount() {
  return {
    type: OPEN_ACCOUNT,
  };
}

export const CLOSE_ACCOUNT = 'CLOSE_ACCOUNT_ACTION';
export function closeAccount() {
  return {
    type: CLOSE_ACCOUNT,
  };
}

export const LOGIN = 'LOGIN';
export function login(info) {
  return {
    type: LOGIN,
    info,
  };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT,
  };
}

// Sagas
