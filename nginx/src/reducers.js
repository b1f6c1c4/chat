import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import globalReducer from '/src/containers/GlobalContainer/reducer';
import loginReducer from '/src/containers/LoginContainer/reducer';
import chatReducer from '/src/containers/ChatContainer/reducer';
import * as actions from '/src/containers/GlobalContainer/actions';

const initialState = fromJS({
  username: null,
  credential: null,
});

function persistentReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return state
        .set('username', fromJS(action.username))
        .set('credential', fromJS(action.token));
    default:
      return state;
  }
}

export default function createReducer(history) {
  const appReducer = combineReducers({
    router: connectRouter(history),
    global: globalReducer,
    login: loginReducer,
    chat: chatReducer,
    form: formReducer,
    persistent: persistentReducer,
  });

  return (state, action) => {
    switch (action.type) {
      case actions.LOGOUT:
        setTimeout(() => { window.document.location.reload(true); }, 10);
        return appReducer(undefined, action);
      default:
        return appReducer(state, action);
    }
  };
}
