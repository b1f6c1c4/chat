import { fromJS } from 'immutable';

import * as actions from './actions';

const initialState = fromJS({
  messages: [],
  isLoading: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    // Actions
    // Sagas
    case actions.RECEIVED:
      return state.set('messages', state.get('messages').push(action.data));
    // Default
    default:
      return state;
  }
}
