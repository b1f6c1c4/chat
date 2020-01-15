import { fromJS } from 'immutable';

import * as actions from './actions';

const initialState = fromJS({
  activeId: 0,
  isLoading: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    // Actions
    case actions.CHANGE_ACTIVE_ID_ACTION:
      return state.set('activeId', action.value);
    // Sagas
    case actions.LOGIN_REQUEST:
      return state.set('isLoading', true);
    case actions.LOGIN_SUCCESS:
      return state.set('isLoading', false);
    case actions.LOGIN_FAILURE:
      return state.set('isLoading', false);
    case actions.REGISTER_REQUEST:
      return state.set('isLoading', true);
    case actions.REGISTER_SUCCESS:
      return state.set('isLoading', false);
    case actions.REGISTER_FAILURE:
      return state.set('isLoading', false);
    // Default
    default:
      return state;
  }
}
