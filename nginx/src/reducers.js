import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import globalReducer from '/src/containers/GlobalContainer/reducer';
import loginReducer from '/src/containers/LoginContainer/reducer';
import * as actions from '/src/containers/GlobalContainer/actions';

export default function createReducer(history) {
  const appReducer = combineReducers({
    router: connectRouter(history),
    global: globalReducer,
    login: loginReducer,
    form: formReducer,
  });

  return (state, action) => {
    switch (action.type) {
      case actions.LOGOUT:
        return appReducer(undefined, action);
      default:
        return appReducer(state, action);
    }
  };
}
