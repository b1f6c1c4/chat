import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
// import persistState from 'redux-localstorage';
import { createBrowserHistory } from 'history';
import { fromJS } from 'immutable';
import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { brown, teal } from '@material-ui/core/colors';
import { Switch, Route } from 'react-router';
import GlobalContainer from '/src/containers/GlobalContainer';
import LoginContainer from '/src/containers/LoginContainer';
import ChatContainer from '/src/containers/ChatContainer';
import NotFoundPage from '/src/components/NotFoundPage';
import createReducer from './reducers';
import './main.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      light: teal[600],
      main: teal[800],
      dark: teal[900],
      contrastText: '#fff',
    },
    secondary: {
      light: brown[600],
      main: brown[800],
      dark: brown[900],
      contrastText: '#fff',
    },
  },
});

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware,
  routerMiddleware(history),
];

const enhancers = [
  applyMiddleware(...middlewares),
  /* persistState(undefined, {
    key: 'chat',
    serialize: (state) => JSON.stringify({
      jwt: state.get(['global', 'jwt']),
    }),
    deserialize: (raw) => {
      const parsed = JSON.parse(raw);
      if (!parsed) {
        return undefined;
      }
      const { jwt } = parsed;
      return fromJS({
        global: { jwt },
      });
    },
    merge: (init, states) => init.mergeDeep(states),
  }), */
];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production'
  && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'chat', trace: true })
  : compose;
/* eslint-enable no-underscore-dangle */

const init = {};

const store = createStore(
  createReducer(history),
  fromJS(init),
  composeEnhancers(...enhancers),
);

store.runSaga = sagaMiddleware.run;
store.injectedSagas = {}; // Saga registry

render((
  <Provider store={store}>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <GlobalContainer>
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/chat" component={ChatContainer} />
            <Route component={NotFoundPage} />
          </Switch>
        </GlobalContainer>
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('app'));
