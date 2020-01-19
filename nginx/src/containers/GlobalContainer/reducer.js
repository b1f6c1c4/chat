import { fromJS } from 'immutable';

import * as actions from './actions';

const initialState = fromJS({
  isDrawerOpen: false,
  isAccountOpen: false,
  my: {
    id: null,
  },
});

export default function (state = initialState, action) {
  switch (action.type) {
    // Actions
    case actions.OPEN_DRAWER:
      return state.set('isDrawerOpen', true);
    case actions.CLOSE_DRAWER:
      return state.set('isDrawerOpen', false);
    case actions.OPEN_ACCOUNT:
      return state.set('isAccountOpen', true);
    case actions.CLOSE_ACCOUNT:
      return state.set('isAccountOpen', false);
    case actions.LOGIN:
      return state.setIn(['my', 'id'], fromJS(action.id));
    // Default
    default:
      return state;
  }
}
