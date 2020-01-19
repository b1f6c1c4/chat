// Actions

// Sagas
export const PASSWORD_REQUEST = 'PASSWORD_REQUEST';
export function passwordRequest({ oldPassword, newPassword }) {
  return {
    type: PASSWORD_REQUEST,
    oldPassword,
    newPassword,
  };
}

export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export function passwordSuccess(result) {
  return {
    type: PASSWORD_SUCCESS,
    result,
  };
}

export const PASSWORD_FAILURE = 'PASSWORD_FAILURE';
export function passwordFailure(error) {
  return {
    type: PASSWORD_FAILURE,
    error,
  };
}
