import { fromJS } from 'immutable';

import * as actions from './actions';

const initialState = fromJS({
  isLoading: false,
});

function changePasswordContainerReducer(state = initialState, action) {
  switch (action.type) {
    // Actions
    // Sagas
    case actions.PASSWORD_REQUEST:
      return state.set('isLoading', true);
    case actions.PASSWORD_SUCCESS:
      return state.set('isLoading', false);
    case actions.PASSWORD_FAILURE:
      return state.set('isLoading', false);
    // Default
    default:
      return state;
  }
}

export default changePasswordContainerReducer;
