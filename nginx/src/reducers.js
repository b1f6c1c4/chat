import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import * as actions from './actions';

function globalReducer(state, action) {
  switch (action.type) {
    case actions.LOGIN:
      return state.set('my', fromJS(action.info));
    default:
      return state;
  }
}

export default function createReducer(history) {
  const appReducer = combineReducers({
    router: connectRouter(history),
    global: globalReducer,
    form: formReducer,
  });

  return (state, action) => {
    switch (action.type) {
      case action.LOGOUT:
        return appReducer(undefined, action);
      default:
        return appReducer(state, action);
    }
  };
}
