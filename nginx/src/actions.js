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
